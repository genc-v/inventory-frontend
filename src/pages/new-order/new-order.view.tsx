import { useNewOrderViewModel } from './new-order.viewmodel';
import { OrderConfirmed } from './components/order-confirmed';
import { OrderForm } from './components/order-form';

export function NewOrderView() {
  const vm = useNewOrderViewModel();

  if (vm.confirmation) {
    return (
      <OrderConfirmed
        order={vm.confirmation}
        onPlaceAnother={vm.startNewOrder}
      />
    );
  }

  return <OrderForm vm={vm} />;
}
