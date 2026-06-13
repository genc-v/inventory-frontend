import type { Order } from '../../models/order';

export type LoadStatus = 'idle' | 'loading' | 'success' | 'error';

export interface OrdersListViewModel {
  orders: Order[];
  status: LoadStatus;
  error: string | null;
  load: () => Promise<void>;
}
