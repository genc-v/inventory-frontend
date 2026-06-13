import type { Product } from './product';

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  product?: Product;
}

export interface Order {
  id: string;
  total: number;
  status: string;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderLineInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  items: OrderLineInput[];
}
