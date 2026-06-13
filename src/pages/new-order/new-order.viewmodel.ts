import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { errors } from '../../lib/errors';
import { ApiError } from '../../lib/http-client';
import type { Product, ProductsStatus } from '../../models/product';
import { productRepository } from '../../repositories/product_repository';
import { orderRepository } from '../../repositories/order_repository';
import type {
  NewOrderViewModel,
  OrderConfirmation,
  OrderLineView,
} from './new-order.model';

const PAGE_SIZE = 8;

const clamp = (value: number, max: number) =>
  Math.max(0, Math.min(Number.isFinite(value) ? Math.floor(value) : 0, max));

function resolveOrderError(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 0) return errors.network;
    if (error.status === 409) return error.message || errors.orders.outOfStock;
  }
  return errors.orders.failed;
}

export function useNewOrderViewModel(): NewOrderViewModel {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<ProductsStatus>('idle');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<Record<string, Product>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(
    null,
  );

  async function loadProducts(targetPage = 1): Promise<void> {
    setLoadError(null);
    if (products.length === 0) setStatus('loading');
    try {
      const result = await productRepository.list({
        page: targetPage,
        limit: PAGE_SIZE,
      });
      setProducts(result.data);
      setTotalProducts(result.total);
      setPage(result.page);
      setStatus('success');
    } catch {
      setLoadError(errors.products.load);
      setStatus('error');
      toast.error(errors.products.load);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadProducts();
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));

  function nextPage(): void {
    if (page < totalPages) void loadProducts(page + 1);
  }

  function prevPage(): void {
    if (page > 1) void loadProducts(page - 1);
  }

  function setQuantity(product: Product, quantity: number): void {
    const next = clamp(quantity, product.stockQuantity);
    setQuantities((current) => ({ ...current, [product.id]: next }));
    setSelected((current) => ({ ...current, [product.id]: product }));
  }

  const increment = (product: Product) =>
    setQuantity(product, (quantities[product.id] ?? 0) + 1);
  const decrement = (product: Product) =>
    setQuantity(product, (quantities[product.id] ?? 0) - 1);

  const lines = useMemo<OrderLineView[]>(() => {
    return Object.values(selected)
      .map((product) => {
        const quantity = quantities[product.id] ?? 0;
        return {
          product,
          quantity,
          lineTotal: Number((product.price * quantity).toFixed(2)),
        };
      })
      .filter((line) => line.quantity > 0);
  }, [selected, quantities]);

  const total = Number(
    lines.reduce((sum, line) => sum + line.lineTotal, 0).toFixed(2),
  );
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const canSubmit = lines.length > 0 && !submitting;

  async function submit(): Promise<void> {
    if (lines.length === 0) {
      toast.error(errors.orders.empty);
      return;
    }

    setSubmitting(true);
    try {
      const order = await orderRepository.create({
        items: lines.map((l) => ({
          productId: l.product.id,
          quantity: l.quantity,
        })),
      });
      setConfirmation({
        id: order.id,
        total: order.total,
        lines: lines.map((l) => ({
          name: l.product.name,
          quantity: l.quantity,
          unitPrice: l.product.price,
          lineTotal: l.lineTotal,
        })),
      });
      setQuantities({});
      setSelected({});
      toast.success('Order placed');
    } catch (err) {
      toast.error(resolveOrderError(err));
      if (err instanceof ApiError && err.status === 409)
        void loadProducts(page);
    } finally {
      setSubmitting(false);
    }
  }

  function startNewOrder(): void {
    setConfirmation(null);
    setQuantities({});
    setSelected({});
    void loadProducts(1);
  }

  return {
    products,
    page,
    totalPages,
    status,
    loadError,
    quantities,
    lines,
    total,
    itemCount,
    submitting,
    canSubmit,
    confirmation,
    setQuantity,
    increment,
    decrement,
    nextPage,
    prevPage,
    submit,
    startNewOrder,
  };
}
