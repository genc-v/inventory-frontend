import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { ApiError } from '../../lib/http-client';
import { errors } from '../../lib/errors';
import { useAuth } from '../../auth/auth_context';
import type { LoginViewModel, Mode } from './login.model';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function resolveAuthError(error: unknown, mode: Mode): string {
  if (error instanceof ApiError) {
    if (error.status === 0) return errors.network;
    if (error.status === 401) return errors.auth.invalidCredentials;
    if (error.status === 409) return errors.auth.emailTaken;
  }
  return mode === 'login' ? errors.auth.invalidCredentials : errors.auth.failed;
}

export function useLoginViewModel(): LoginViewModel {
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  function validate(): boolean {
    if (!EMAIL_RE.test(email)) {
      setFieldError(errors.auth.email);
      return false;
    }
    if (password.length < 8) {
      setFieldError(errors.auth.password);
      return false;
    }
    setFieldError(null);
    return true;
  }

  async function submit(event: FormEvent): Promise<void> {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const credentials = { email, password };
      if (mode === 'login') await login(credentials);
      else await register(credentials);
      toast.success(mode === 'login' ? 'Signed in' : 'Account created');
      navigate('/', { replace: true });
    } catch (err) {
      const message = resolveAuthError(err, mode);
      setFieldError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  function toggleMode(): void {
    setMode(mode === 'login' ? 'register' : 'login');
    setFieldError(null);
  }

  return {
    mode,
    email,
    password,
    fieldError,
    submitting,
    isAuthenticated,
    setEmail,
    setPassword,
    toggleMode,
    submit,
  };
}
