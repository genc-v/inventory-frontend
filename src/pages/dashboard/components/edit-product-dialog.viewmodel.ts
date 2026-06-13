import { useState } from 'react';
import type { FormEvent } from 'react';
import type { CreateProductInput, Product } from '../../../models/product';
import type { EditProductDialogViewModel } from './edit-product-dialog.model';

function toForm(product: Product): CreateProductInput {
  return {
    name: product.name,
    sku: product.sku,
    price: product.price,
    stockQuantity: product.stockQuantity,
    category: product.category,
  };
}

export function useEditProductDialogViewModel(
  product: Product,
  onSave: (input: CreateProductInput) => Promise<void>,
  onClose: () => void,
): EditProductDialogViewModel {
  const [form, setForm] = useState<CreateProductInput>(toForm(product));

  function update<K extends keyof CreateProductInput>(
    key: K,
    value: CreateProductInput[K],
  ): void {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent): Promise<void> {
    event.preventDefault();
    try {
      await onSave(form);
      onClose();
    } catch (e) {
      console.error(e);
    }
  }

  return { form, update, submit };
}
