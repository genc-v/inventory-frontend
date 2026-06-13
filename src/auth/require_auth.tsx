import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './auth_context';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, hydrated } = useAuth();
  if (!hydrated) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
