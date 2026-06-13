export const errors = {
  auth: {
    email: 'Enter a valid email address.',
    password: 'Password must be at least 8 characters.',
    invalidCredentials: 'Invalid email or password.',
    emailTaken: 'That email is already registered.',
    required: 'Please sign in to continue.',
    failed: 'Could not complete sign in. Please try again.',
  },
  products: {
    load: 'Could not load the products.',
    create: 'Could not add the product.',
    update: 'Could not update the product.',
    delete: 'Could not delete the product.',
    duplicateSku: 'A product with that SKU already exists.',
    validation: 'Please check the product details and try again.',
  },
  orders: {
    load: 'Could not load your orders.',
    empty: 'Add at least one product to your order.',
    outOfStock:
      'Some items are no longer in stock. Adjust the quantities and try again.',
    failed: 'Could not place the order. Please try again.',
  },
  network: 'Network error',
  unknown: 'Something went wrong. Please try again.',
} as const;
