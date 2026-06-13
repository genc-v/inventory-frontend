import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext, type AuthContextValue } from './auth_context';
import type { AuthSession, Credentials } from '../models/auth';
import { authRepository } from '../repositories/auth_repository';
import { setAuthToken } from '../lib/http-client';

const STORAGE_KEY = 'session';

function loadSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const restored = loadSession();
    setAuthToken(restored?.token ?? null);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(restored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  }, [session, hydrated]);

  async function login(credentials: Credentials): Promise<void> {
    const result = await authRepository.login(credentials);
    setAuthToken(result.accessToken);
    setSession({ token: result.accessToken, user: result.user });
  }

  async function register(credentials: Credentials): Promise<void> {
    const result = await authRepository.register(credentials);
    setAuthToken(result.accessToken);
    setSession({ token: result.accessToken, user: result.user });
  }

  function logout(): void {
    setAuthToken(null);
    setSession(null);
  }

  const value: AuthContextValue = {
    session,
    isAuthenticated: session !== null,
    hydrated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
