import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { useOrdersListViewModel } from './orders.viewmodel';
import { orderRepository } from '../../repositories/order_repository';
import type { Order } from '../../models/order';

vi.mock('../../repositories/order_repository', () => ({
  orderRepository: { list: vi.fn() },
}));

const listMock = vi.mocked(orderRepository.list);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('useOrdersListViewModel', () => {
  it('loads orders on mount', async () => {
    const orders: Order[] = [
      {
        id: 'o1',
        total: 10,
        status: 'PLACED',
        items: [],
        createdAt: '2026-01-01',
      },
    ];
    listMock.mockResolvedValue(orders);

    const { result } = renderHook(() => useOrdersListViewModel());

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.orders).toEqual(orders);
  });

  it('reports an error when loading fails', async () => {
    listMock.mockRejectedValue(new Error('boom'));

    const { result } = renderHook(() => useOrdersListViewModel());

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.error).toBeTruthy();
  });
});
