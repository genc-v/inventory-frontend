import { request } from '../lib/http-client';
import type { CreateOrderInput, Order } from '../models/order';

export const orderRepository = {
  create(input: CreateOrderInput): Promise<Order> {
    return request<Order>('/orders', {
      method: 'POST',
      body: input,
      auth: true,
    });
  },

  list(): Promise<Order[]> {
    return request<Order[]>('/orders', { auth: true });
  },
};
