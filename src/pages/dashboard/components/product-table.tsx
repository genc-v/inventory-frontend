import { Button } from '../../../components/button';
import type { Product } from '../../../models/product';
import type { ProductTableProps } from './product-table.model';

const money = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

export function ProductTable({
  products,
  onEdit,
  onDelete,
  busy,
}: ProductTableProps) {
  const hasActions = Boolean(onEdit || onDelete);

  if (products.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-sm text-on-surface-variant">
        No products yet.
      </p>
    );
  }

  function actions(product: Product) {
    if (!hasActions) return null;
    return (
      <div className="flex justify-end gap-1">
        {onEdit && (
          <Button
            variant="link"
            disabled={busy}
            onClick={() => onEdit(product)}
          >
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            variant="danger"
            disabled={busy}
            onClick={() => onDelete(product)}
          >
            Delete
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <ul className="sm:hidden">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex flex-col gap-2 border-t border-outline-variant px-4 py-4 first:border-t-0"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-on-surface">
                  {product.name}
                </p>
                <p className="mt-0.5 text-sm text-on-surface-variant">
                  <code className="rounded-md bg-surface-container-high px-1.5 py-0.5 text-[13px]">
                    {product.sku}
                  </code>{' '}
                  · {product.category}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-medium tabular-nums text-on-surface">
                  {money.format(product.price)}
                </p>
                <p className="text-sm text-on-surface-variant">
                  {product.stockQuantity} in stock
                </p>
              </div>
            </div>
            {actions(product)}
          </li>
        ))}
      </ul>

      <table className="hidden w-full border-collapse text-[15px] sm:table">
        <thead>
          <tr className="text-left">
            <th className="table-th">Name</th>
            <th className="table-th">SKU</th>
            <th className="table-th">Category</th>
            <th className="table-th text-right">Price</th>
            <th className="table-th text-right">Stock</th>
            {hasActions && <th className="table-th" aria-label="Actions" />}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="transition-colors hover:bg-on-surface/5"
            >
              <td className="table-td font-medium">{product.name}</td>
              <td className="table-td">
                <code className="rounded-md bg-surface-container-high px-1.5 py-0.5 text-[13px] text-on-surface-variant">
                  {product.sku}
                </code>
              </td>
              <td className="table-td">{product.category}</td>
              <td className="table-td text-right tabular-nums">
                {money.format(product.price)}
              </td>
              <td className="table-td text-right tabular-nums">
                {product.stockQuantity}
              </td>
              {hasActions && <td className="table-td">{actions(product)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
