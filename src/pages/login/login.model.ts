import type { FormEvent } from 'react';

export type Mode = 'login' | 'register';

export interface LoginViewModel {
  mode: Mode;
  email: string;
  password: string;
  fieldError: string | null;
  submitting: boolean;
  isAuthenticated: boolean;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  toggleMode: () => void;
  submit: (event: FormEvent) => Promise<void>;
}
