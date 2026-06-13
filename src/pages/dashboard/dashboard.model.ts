import type {
  CreateProductInput,
  Product,
  ProductsStatus,
} from '../../models/product';

export type FailureKind = 'load' | 'create' | 'update' | 'delete';

export interface DashboardViewModel {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  status: ProductsStatus;
  loadError: string | null;
  isMutating: boolean;
  isAuthenticated: boolean;
  email: string | null;
  load: () => Promise<void>;
  nextPage: () => void;
  prevPage: () => void;
  addProduct: (input: CreateProductInput) => Promise<void>;
  updateProduct: (id: string, input: CreateProductInput) => Promise<void>;
  deleteProduct: (product: Product) => Promise<void>;
  signOut: () => void;
}
