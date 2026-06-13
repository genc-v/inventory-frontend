import { request } from '../lib/http-client';
import type { AuthResult, Credentials } from '../models/auth';

export const authRepository = {
  login(credentials: Credentials): Promise<AuthResult> {
    return request<AuthResult>('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  },

  register(credentials: Credentials): Promise<AuthResult> {
    return request<AuthResult>('/auth/register', {
      method: 'POST',
      body: credentials,
    });
  },
};
