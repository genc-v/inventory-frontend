import type { FormEvent } from 'react';
import type { CreateProductInput, Product } from '../../../models/product';

export interface EditProductDialogProps {
  product: Product;
  busy: boolean;
  onSave: (input: CreateProductInput) => Promise<void>;
  onClose: () => void;
}

export interface EditProductDialogViewModel {
  form: CreateProductInput;
  update: <K extends keyof CreateProductInput>(
    key: K,
    value: CreateProductInput[K],
  ) => void;
  submit: (event: FormEvent) => Promise<void>;
}
