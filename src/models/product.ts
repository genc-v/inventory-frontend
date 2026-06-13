export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  category: string;
}

export interface ProductPage {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface ListProductsParams {
  page?: number;
  limit?: number;
  category?: string;
}

export type ProductsStatus = 'idle' | 'loading' | 'success' | 'error';
