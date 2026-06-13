import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { Toaster } from 'sonner';
import { AuthProvider } from './auth/auth_provider';
import { RequireAuth } from './auth/require_auth';
import { DashboardView } from './pages/dashboard/dashboard.view';
import { LoginView } from './pages/login/login.view';
import { OrdersListView } from './pages/orders/orders.view';
import { NewOrderView } from './pages/new-order/new-order.view';

const router = createBrowserRouter([
  { path: '/', element: <DashboardView /> },
  { path: '/login', element: <LoginView /> },
  {
    path: '/orders',
    element: (
      <RequireAuth>
        <OrdersListView />
      </RequireAuth>
    ),
  },
  {
    path: '/orders/new',
    element: (
      <RequireAuth>
        <NewOrderView />
      </RequireAuth>
    ),
  },
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
