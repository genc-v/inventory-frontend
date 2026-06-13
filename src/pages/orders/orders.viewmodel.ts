import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { errors } from '../../lib/errors';
import type { Order } from '../../models/order';
import { orderRepository } from '../../repositories/order_repository';
import type { LoadStatus, OrdersListViewModel } from './orders.model';

export function useOrdersListViewModel(): OrdersListViewModel {
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<LoadStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  async function load(): Promise<void> {
    setStatus('loading');
    setError(null);
    try {
      setOrders(await orderRepository.list());
      setStatus('success');
    } catch {
      setError(errors.orders.load);
      setStatus('error');
      toast.error(errors.orders.load);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  return { orders, status, error, load };
}
