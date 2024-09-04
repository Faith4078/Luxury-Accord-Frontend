import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { UserProvider } from './context/user_context.jsx';
import { ProductsProvider } from './context/products_context.jsx';
import { FilterProvider } from './context/filter_context.jsx';
import { CartProvider } from './context/cart_context.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { NextUIProvider } from '@nextui-org/react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <NextUIProvider>
              <App />
            </NextUIProvider>
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </ClerkProvider>
);
