import { Link } from 'react-router';
import { Button } from '../../../components/button';
import { FormError } from '../../../components/form_error';
import { Pagination } from '../../../components/pagination';
import { QuantityStepper } from '../../../components/quantity_stepper';
import type { NewOrderViewModel } from '../new-order.model';

const money = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

export function OrderForm({ vm }: { vm: NewOrderViewModel }) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <header className="flex items-center justify-between gap-4 pb-6">
        <div>
          <h1 className="text-3xl font-normal tracking-tight text-on-surface">
            New order
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Choose products and quantities, then place the order.
          </p>
        </div>
        <Link to="/" className="btn-link">
          Cancel
        </Link>
      </header>

      <main className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
        <section className="card overflow-hidden p-2 sm:p-2">
          {vm.status === 'loading' && (
            <p className="p-4 text-sm text-on-surface-variant">
              Loading products…
            </p>
          )}

          {vm.status === 'error' && (
            <div className="p-4">
              <FormError>{vm.loadError}</FormError>
            </div>
          )}

          {vm.status === 'success' && vm.products.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-on-surface-variant">
              No products to order yet.
            </p>
          )}

          {vm.status === 'success' && (
            <ul>
              {vm.products.map((product) => {
                const outOfStock = product.stockQuantity === 0;
                return (
                  <li
                    key={product.id}
                    className="flex items-center justify-between gap-4 border-t border-outline-variant px-4 py-3 first:border-t-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-on-surface">
                        {product.name}
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        {money.format(product.price)} ·{' '}
                        {outOfStock
                          ? 'Out of stock'
                          : `${product.stockQuantity} in stock`}
                      </p>
                    </div>
                    <QuantityStepper
                      label={product.name}
                      value={vm.quantities[product.id] ?? 0}
                      max={product.stockQuantity}
                      onIncrement={() => vm.increment(product)}
                      onDecrement={() => vm.decrement(product)}
                      onChange={(value) => vm.setQuantity(product, value)}
                    />
                  </li>
                );
              })}
            </ul>
          )}

          {vm.status === 'success' && (
            <Pagination
              page={vm.page}
              totalPages={vm.totalPages}
              onPrev={vm.prevPage}
              onNext={vm.nextPage}
            />
          )}
        </section>

        <aside className="lg:sticky lg:top-8">
          <div className="panel">
            <h2 className="text-xl font-normal text-on-surface">
              Order summary
            </h2>

            {vm.lines.length === 0 ? (
              <p className="text-sm text-on-surface-variant">
                No items selected yet.
              </p>
            ) : (
              <ul className="flex flex-col gap-1">
                {vm.lines.map((line) => (
                  <li
                    key={line.product.id}
                    className="flex justify-between text-[15px] text-on-surface"
                  >
                    <span className="truncate">
                      {line.product.name}{' '}
                      <span className="text-on-surface-variant">
                        × {line.quantity}
                      </span>
                    </span>
                    <span className="tabular-nums">
                      {money.format(line.lineTotal)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center justify-between border-t border-outline-variant pt-3 text-lg font-medium text-on-surface">
              <span>Total</span>
              <span className="tabular-nums">{money.format(vm.total)}</span>
            </div>

            <Button onClick={vm.submit} disabled={!vm.canSubmit}>
              {vm.submitting
                ? 'Placing…'
                : `Place order${vm.itemCount ? ` · ${vm.itemCount} item${vm.itemCount === 1 ? '' : 's'}` : ''}`}
            </Button>
          </div>
        </aside>
      </main>
    </div>
  );
}
