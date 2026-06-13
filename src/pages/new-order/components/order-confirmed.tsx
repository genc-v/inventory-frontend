import { Link } from 'react-router';
import { Button } from '../../../components/button';
import type { OrderConfirmation } from '../new-order.model';

const money = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

export function OrderConfirmed({
  order,
  onPlaceAnother,
}: {
  order: OrderConfirmation;
  onPlaceAnother: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-5 py-10">
      <div className="panel text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-primary-container text-2xl text-on-primary-container">
          ✓
        </div>
        <h1 className="text-2xl font-normal text-on-surface">
          Order confirmed
        </h1>
        <p className="-mt-2 text-sm text-on-surface-variant">
          Order #{order.id.slice(0, 8)}
        </p>

        <ul className="mt-2 flex flex-col gap-1 text-left">
          {order.lines.map((line) => (
            <li
              key={line.name}
              className="flex justify-between text-[15px] text-on-surface"
            >
              <span>
                {line.name}{' '}
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

        <div className="flex items-center justify-between border-t border-outline-variant pt-3 text-lg font-medium text-on-surface">
          <span>Total</span>
          <span className="tabular-nums">{money.format(order.total)}</span>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <Button onClick={onPlaceAnother}>Place another order</Button>
          <Link to="/" className="btn-link justify-center">
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
