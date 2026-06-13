import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { Toaster } from 'sonner';
import { AuthProvider } from './auth/auth_provider';
import { DashboardView } from './pages/dashboard/dashboard.view';
import { LoginView } from './pages/login/login.view';

const router = createBrowserRouter([
  { path: '/', element: <DashboardView /> },
  { path: '/login', element: <LoginView /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster richColors position="bottom-center" />
    </AuthProvider>
  );
}
