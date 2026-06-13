import { useState } from 'react';
import type { FormEvent } from 'react';
import type { CreateProductInput } from '../../../models/product';
import type { AddProductFormViewModel } from './add-product-form.model';

const EMPTY: CreateProductInput = {
  name: '',
  sku: '',
  price: 0,
  stockQuantity: 0,
  category: '',
};

export function useAddProductFormViewModel(
  onAdd: (input: CreateProductInput) => Promise<void>,
): AddProductFormViewModel {
  const [form, setForm] = useState<CreateProductInput>(EMPTY);

  function update<K extends keyof CreateProductInput>(
    key: K,
    value: CreateProductInput[K],
  ): void {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent): Promise<void> {
    event.preventDefault();
    try {
      await onAdd(form);
      setForm(EMPTY);
    } catch (e) {
      console.error(e);
    }
  }

  return { form, update, submit };
}
