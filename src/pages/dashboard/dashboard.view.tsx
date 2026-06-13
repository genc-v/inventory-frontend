import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../../components/button';
import { FormError } from '../../components/form_error';
import { Pagination } from '../../components/pagination';
import { AddProductForm } from './components/add-product-form';
import { EditProductDialog } from './components/edit-product-dialog';
import { ProductTable } from './components/product-table';
import { useDashboardViewModel } from './dashboard.viewmodel';
import type { Product } from '../../models/product';

export function DashboardView() {
  const vm = useDashboardViewModel();
  const [editing, setEditing] = useState<Product | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 pb-6">
        <div>
          <h1 className="text-3xl font-normal tracking-tight text-on-surface">
            Products dashboard
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            {vm.total} product{vm.total === 1 ? '' : 's'} in the catalogue
          </p>
        </div>

        {vm.isAuthenticated ? (
          <div className="flex flex-wrap items-center gap-2 whitespace-nowrap">
            <Link to="/orders/new" className="btn-primary">
              New order
            </Link>
            <Link to="/orders" className="btn-link">
              Orders
            </Link>
            <span
              className="grid size-9 place-items-center rounded-full bg-primary-container text-sm font-medium text-on-primary-container uppercase"
              title={vm.email ?? undefined}
            >
              {vm.email?.charAt(0)}
            </span>
            <Button variant="link" onClick={vm.signOut}>
              Sign out
            </Button>
          </div>
        ) : (
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        )}
      </header>

      <main>
        {vm.isAdmin && (
          <div className="mb-8">
            <AddProductForm disabled={vm.isMutating} onAdd={vm.addProduct} />
          </div>
        )}

        <section className="card overflow-hidden p-2 sm:p-4">
          {vm.status === 'loading' && (
            <p className="p-4 text-sm text-on-surface-variant">
              Loading products…
            </p>
          )}

          {vm.status === 'error' && (
            <div className="flex items-center gap-3 p-4">
              <FormError>{vm.loadError}</FormError>
              <Button variant="link" onClick={() => vm.load()}>
                Retry
              </Button>
            </div>
          )}

          {vm.status === 'success' && (
            <>
              <ProductTable
                products={vm.products}
                busy={vm.isMutating}
                onEdit={vm.isAdmin ? setEditing : undefined}
                onDelete={vm.isAdmin ? vm.deleteProduct : undefined}
              />
              <Pagination
                page={vm.page}
                totalPages={vm.totalPages}
                onPrev={vm.prevPage}
                onNext={vm.nextPage}
                disabled={vm.isMutating}
              />
            </>
          )}
        </section>
      </main>

      {editing && (
        <EditProductDialog
          product={editing}
          busy={vm.isMutating}
          onSave={(input) => vm.updateProduct(editing.id, input)}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
