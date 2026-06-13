# Inventory & Order Management Frontend

Thin UI for the Product Inventory & Order Management service: sign in, browse
products with live stock levels, place orders against that stock, and review past
orders with their totals.

Built with **React 19 + React Router v7 (SSR) + TypeScript**, styled with
Tailwind. It is a pure client of the backend API and ships independently.

- **Live app:** https://inventory.gencvh.com
- **Backend API:** separate repository; this app talks to it over REST.

> Scope: frontend only. The API, database, and the concurrency-safe stock logic
> live in the backend repo.

## Features

- **Auth** register / login; the JWT is kept in `localStorage` and attached to
  API calls. Protected pages redirect to login when signed out.
- **Products** list with stock levels, plus add and remove (the backend
  authorises writes; non-admins get a clear error).
- **New order** pick products and quantities and submit.
- **Orders** list past orders with line items and computed totals; the created
  order's total is shown on confirmation.

## Setup / run

Needs the backend running (see its repo, or use the live API).

```bash
npm install
npm run dev        # http://localhost:5173, proxies /api -> http://localhost:3000
```

Point the app at a specific backend with `VITE_API_BASE_URL` (baked in at build
time; defaults to `http://localhost:3000/api`).

```bash
npm run build && npm run start   # production SSR build
# or
docker build --build-arg VITE_API_BASE_URL=https://inventory.gencvh.com/api -t frontend .
```

## Architecture & key decisions

**MVVM, one responsibility per file.** Each page splits into a view and a view
model, and all network access goes through a repository:

```
src/
├── pages/<page>/<page>.view.tsx       # presentation (markup) only
├── pages/<page>/<page>.viewmodel.ts   # state + actions (hooks)
├── repositories/                      # API access, grouped by resource
├── lib/http-client.ts                 # fetch wrapper + typed ApiError
├── models/                            # shared TypeScript types
├── auth/                              # auth context, provider, route guard
└── routes/                            # React Router route modules
```

- **Views stay dumb**: they render what the view model gives them, so UI and
  logic can change independently and the logic is easy to reason about.
- **Repositories** isolate every HTTP call behind a typed method, so views never
  build URLs or handle fetch details, and the API surface lives in one place.
- **`http-client`** centralises base URL, auth header, and error handling
  non-2xx responses become a typed `ApiError` carrying status + message.
- **SSR via React Router v7** is served by `react-router-serve` (a real Node
  server), so no separate static host is needed; auth state is restored on the
  client after mount to keep server and client markup in sync.

**Trade-off:** the view/viewmodel split adds a file per page versus a single
component, but it keeps presentation and logic testable in isolation worth it
for the pages that carry real state (orders, new order).

## Concurrency

Overselling is prevented in the **backend** (atomic, row-locked stock decrement).
The frontend's job is to surface the outcome: when the API rejects an order with
`409 Conflict` (e.g. someone else took the last unit), the `ApiError` is caught
and shown to the user as an error toast rather than a silent failure.

## What I'd do with more time

1. **Tests** the testing stack (Vitest + Testing Library) is installed but no
   tests are written yet; the create-order flow and the view models are the first
   things I'd cover.
2. **Server-side data loading** move product/order fetching into route loaders
   instead of client effects, for faster first paint and simpler state.
3. **Optimistic stock UI** reflect stock changes immediately and reconcile on
   the server response, with clearer messaging when an item sells out mid-flow.
4. **Accessibility & polish** focus management, form-level validation messages,
   and loading skeletons.
