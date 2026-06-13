import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { Toaster } from 'sonner';
import { AuthProvider } from './auth/auth_provider';
import { LoginView } from './pages/login/login.view';

const router = createBrowserRouter([
  { path: '/login', element: <LoginView /> },
  { path: '*', element: <Navigate to="/login" replace /> },
]);

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster richColors position="bottom-center" />
    </AuthProvider>
  );
}
