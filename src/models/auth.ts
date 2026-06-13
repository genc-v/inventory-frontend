export interface Credentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthResult {
  accessToken: string;
  user: AuthUser;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export type AuthStatus = 'idle' | 'loading' | 'success' | 'error';
