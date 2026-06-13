import type { CreateProductInput, Product } from '../../../models/product';

export interface EditProductDialogProps {
  product: Product;
  busy?: boolean;
  onSave: (input: CreateProductInput) => Promise<void>;
  onClose: () => void;
}
