import type { FormEvent } from 'react';
import type { CreateProductInput } from '../../../models/product';

export interface AddProductFormProps {
  onAdd: (input: CreateProductInput) => Promise<void>;
  disabled?: boolean;
}

export interface AddProductFormViewModel {
  form: CreateProductInput;
  update: <K extends keyof CreateProductInput>(
    key: K,
    value: CreateProductInput[K],
  ) => void;
  submit: (event: FormEvent) => Promise<void>;
}
