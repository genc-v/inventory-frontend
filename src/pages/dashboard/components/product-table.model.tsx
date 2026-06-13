import type { Product } from '../../../models/product';

export interface ProductTableProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  busy?: boolean;
}
