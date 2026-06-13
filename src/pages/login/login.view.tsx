import { Link } from 'react-router';
import { Button } from '../../components/button';
import { FormError } from '../../components/form_error';
import { TextField } from '../../components/text_field';
import { useLoginViewModel } from './login.viewmodel';

export function LoginView() {
  const vm = useLoginViewModel();

  if (vm.isAuthenticated) return null;

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 px-5 py-10">
      <form className="panel" onSubmit={vm.submit}>
        <h1 className="text-2xl font-normal text-on-surface">
          {vm.mode === 'login' ? 'Sign in' : 'Create'}
        </h1>
        <p className="-mt-3 text-sm text-on-surface-variant">
          {vm.mode === 'login'
            ? 'Sign in to manage the catalogue.'
            : 'Create the first account.'}
        </p>

        <TextField
          label="Email"
          type="email"
          value={vm.email}
          onChange={(e) => vm.setEmail(e.target.value)}
          autoComplete="username"
          required
        />

        <TextField
          label="Password"
          type="password"
          value={vm.password}
          onChange={(e) => vm.setPassword(e.target.value)}
          autoComplete={
            vm.mode === 'login' ? 'current-password' : 'new-password'
          }
          required
        />

        <FormError>{vm.fieldError}</FormError>

        <Button type="submit" disabled={vm.submitting}>
          {vm.submitting
            ? 'Please wait…'
            : vm.mode === 'login'
              ? 'Sign in'
              : 'Register'}
        </Button>

        <Button variant="link" onClick={vm.toggleMode}>
          {vm.mode === 'login'
            ? 'No account yet? Register '
            : 'Already have an account? Sign in'}
        </Button>
      </form>

      <Link to="/" className="btn-link self-center">
        Back to catalogue
      </Link>
    </div>
  );
}
