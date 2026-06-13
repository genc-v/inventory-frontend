import { Link } from 'react-router';
import { FormError } from '../../components/form_error';
import { useOrdersListViewModel } from './orders.viewmodel';

const money = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

const dateFmt = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export function OrdersListView() {
  const vm = useOrdersListViewModel();

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
      <header className="flex items-center justify-between gap-4 pb-6">
        <h1 className="text-3xl font-normal tracking-tight text-on-surface">
          Your orders
        </h1>
        <Link to="/orders/new" className="btn-primary">
          New order
        </Link>
      </header>

      {vm.status === 'loading' && (
        <p className="text-sm text-on-surface-variant">Loading orders…</p>
      )}

      {vm.status === 'error' && (
        <div className="flex items-center gap-3">
          <FormError>{vm.error}</FormError>
          <button type="button" className="btn-link" onClick={vm.load}>
            Retry
          </button>
        </div>
      )}

      {vm.status === 'success' && vm.orders.length === 0 && (
        <div className="panel">
          <p className="text-sm text-on-surface-variant">
            You haven't placed any orders yet.
          </p>
          <Link to="/orders/new" className="btn-primary w-full">
            Place your first order
          </Link>
        </div>
      )}

      {vm.status === 'success' && vm.orders.length > 0 && (
        <ul className="flex flex-col gap-4">
          {vm.orders.map((order) => (
            <li key={order.id} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-on-surface">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    {dateFmt.format(new Date(order.createdAt))}
                  </p>
                </div>
                <span className="rounded-full bg-primary-container px-3 py-1 text-xs font-medium text-on-primary-container">
                  {order.status}
                </span>
              </div>

              <ul className="mt-3 flex flex-col gap-1 border-t border-outline-variant pt-3">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between text-[15px] text-on-surface"
                  >
                    <span>
                      {item.product?.name ?? 'Product'}{' '}
                      <span className="text-on-surface-variant">
                        × {item.quantity} @ {money.format(item.unitPrice)}
                      </span>
                    </span>
                    <span className="tabular-nums">
                      {money.format(item.lineTotal)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center justify-between border-t border-outline-variant pt-3 font-medium text-on-surface">
                <span>Total</span>
                <span className="tabular-nums">
                  {money.format(order.total)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
