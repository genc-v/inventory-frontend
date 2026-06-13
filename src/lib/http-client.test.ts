import { afterEach, describe, expect, it, vi } from 'vitest';
import { request, setAuthToken } from './http-client';

afterEach(() => {
  setAuthToken(null);
  vi.restoreAllMocks();
});

describe('request', () => {
  it('throws 401 when an authed call has no token', async () => {
    setAuthToken(null);

    await expect(request('/orders', { auth: true })).rejects.toMatchObject({
      status: 401,
    });
  });

  it('sends the bearer token on authed calls', async () => {
    setAuthToken('jwt-123');
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('[]', { status: 200 }));

    await request('/orders', { auth: true });

    const headers = fetchMock.mock.calls[0][1]?.headers as Record<
      string,
      string
    >;
    expect(headers.Authorization).toBe('Bearer jwt-123');
  });

  it('does not send an auth header on public calls', async () => {
    setAuthToken('jwt-123');
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 200 }));

    await request('/products');

    const headers = fetchMock.mock.calls[0][1]?.headers as Record<
      string,
      string
    >;
    expect(headers.Authorization).toBeUndefined();
  });
});
