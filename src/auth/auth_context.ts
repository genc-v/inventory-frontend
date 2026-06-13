import { createContext, useContext } from 'react';
import type { AuthSession, Credentials } from '../models/auth';

export interface AuthContextValue {
  session: AuthSession | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within <AuthProvider>');
  }
  return context;
}
