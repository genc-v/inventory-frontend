import { Button } from '../../../components/button';
import { TextField } from '../../../components/text_field';
import type { EditProductDialogProps } from './edit-product-dialog.model';
import { useEditProductDialogViewModel } from './edit-product-dialog.viewmodel';

export function EditProductDialog({
  product,
  busy,
  onSave,
  onClose,
}: EditProductDialogProps) {
  const vm = useEditProductDialogViewModel(product, onSave, onClose);

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <form className="panel" onSubmit={vm.submit}>
          <h2 className="text-xl font-normal text-on-surface">Edit product</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextField
              label="Name"
              className="col-span-2"
              value={vm.form.name}
              onChange={(e) => vm.update('name', e.target.value)}
              required
            />
            <TextField
              label="SKU"
              value={vm.form.sku}
              onChange={(e) => vm.update('sku', e.target.value)}
              required
            />
            <TextField
              label="Category"
              value={vm.form.category}
              onChange={(e) => vm.update('category', e.target.value)}
              required
            />
            <TextField
              label="Price"
              type="number"
              min="0"
              step="0.01"
              value={vm.form.price}
              onChange={(e) => vm.update('price', Number(e.target.value))}
              required
            />
            <TextField
              label="Stock"
              type="number"
              min="0"
              step="1"
              value={vm.form.stockQuantity}
              onChange={(e) =>
                vm.update('stockQuantity', Number(e.target.value))
              }
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={busy}>
              {busy ? 'Saving…' : 'Save changes'}
            </Button>
            <Button variant="link" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
