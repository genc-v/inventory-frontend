import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../../auth/auth_context';
import { errors } from '../../lib/errors';
import { ApiError } from '../../lib/http-client';
import type {
  CreateProductInput,
  Product,
  ProductsStatus,
} from '../../models/product';
import { productRepository } from '../../repositories/product_repository';
import type { DashboardViewModel, FailureKind } from './dashboard.model';

const PAGE_SIZE = 8;

function resolveProductError(error: unknown, kind: FailureKind): string {
  if (error instanceof ApiError) {
    if (error.status === 0) return errors.network;
    if (error.status === 409) return errors.products.duplicateSku;
    if (error.status === 400) return errors.products.validation;
  }
  return errors.products[kind];
}

export function useDashboardViewModel(): DashboardViewModel {
  const { isAuthenticated, session, logout } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<ProductsStatus>('idle');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  async function load(targetPage = 1): Promise<void> {
    setLoadError(null);
    if (products.length === 0) setStatus('loading');
    try {
      const result = await productRepository.list({
        page: targetPage,
        limit: PAGE_SIZE,
      });
      if (result.data.length === 0 && result.page > 1) {
        await load(result.page - 1);
        return;
      }
      setProducts(result.data);
      setTotal(result.total);
      setPage(result.page);
      setStatus('success');
    } catch (err) {
      const message = resolveProductError(err, 'load');
      setLoadError(message);
      setStatus('error');
      toast.error(message);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function nextPage(): void {
    if (page < totalPages) void load(page + 1);
  }

  function prevPage(): void {
    if (page > 1) void load(page - 1);
  }

  async function addProduct(input: CreateProductInput): Promise<void> {
    setIsMutating(true);
    try {
      await productRepository.create(input);
      toast.success('Product added');
      await load(page);
    } catch (err) {
      toast.error(resolveProductError(err, 'create'));
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function updateProduct(
    id: string,
    input: CreateProductInput,
  ): Promise<void> {
    setIsMutating(true);
    try {
      const updated = await productRepository.update(id, input);
      setProducts((current) => current.map((p) => (p.id === id ? updated : p)));
      toast.success('Product updated');
    } catch (err) {
      toast.error(resolveProductError(err, 'update'));
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function deleteProduct(product: Product): Promise<void> {
    if (!confirm(`Delete "${product.name}"?`)) return;
    setIsMutating(true);
    try {
      await productRepository.remove(product.id);
      toast.success('Product deleted');
      await load(page);
    } catch (err) {
      toast.error(resolveProductError(err, 'delete'));
    } finally {
      setIsMutating(false);
    }
  }

  function signOut(): void {
    logout();
    toast('Signed out');
  }

  return {
    products,
    total,
    page,
    totalPages,
    status,
    loadError,
    isMutating,
    isAuthenticated,
    email: session?.user.email ?? null,
    load,
    nextPage,
    prevPage,
    addProduct,
    updateProduct,
    deleteProduct,
    signOut,
  };
}
