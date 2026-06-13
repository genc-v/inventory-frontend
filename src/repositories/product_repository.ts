import { request } from '../lib/http-client';
import type {
  CreateProductInput,
  ListProductsParams,
  Product,
  ProductPage,
} from '../models/product';

export const productRepository = {
  list(params: ListProductsParams = {}): Promise<ProductPage> {
    const query = new URLSearchParams();
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));
    if (params.category) query.set('category', params.category);
    const qs = query.toString();
    return request<ProductPage>(`/products${qs ? `?${qs}` : ''}`);
  },

  create(input: CreateProductInput): Promise<Product> {
    return request<Product>('/products', {
      method: 'POST',
      body: input,
      auth: true,
    });
  },

  update(id: string, input: CreateProductInput): Promise<Product> {
    return request<Product>(`/products/${id}`, {
      method: 'PUT',
      body: input,
      auth: true,
    });
  },

  remove(id: string): Promise<void> {
    return request<void>(`/products/${id}`, { method: 'DELETE', auth: true });
  },
};
