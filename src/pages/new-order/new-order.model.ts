import type { Product, ProductsStatus } from '../../models/product';

export interface OrderLineView {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export interface OrderConfirmation {
  id: string;
  total: number;
  lines: {
    name: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
}

export interface NewOrderViewModel {
  products: Product[];
  page: number;
  totalPages: number;
  status: ProductsStatus;
  loadError: string | null;
  quantities: Record<string, number>;
  lines: OrderLineView[];
  total: number;
  itemCount: number;
  submitting: boolean;
  canSubmit: boolean;
  confirmation: OrderConfirmation | null;
  setQuantity: (product: Product, quantity: number) => void;
  increment: (product: Product) => void;
  decrement: (product: Product) => void;
  nextPage: () => void;
  prevPage: () => void;
  submit: () => Promise<void>;
  startNewOrder: () => void;
}
