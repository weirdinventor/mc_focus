// StripeContext.ts

import { createContext, useContext } from 'react';
import { Stripe } from '@stripe/stripe-js';

// 1. Define the shape of the context value
export interface StripeContextValue {
  stripe: Stripe | null;
  isStripeInitialized: boolean;
}

// 2. Create and export the Context object
export const StripeContext = createContext<StripeContextValue | undefined>(undefined);

// 3. Create and export the custom hook
export const useStripeContext = (): StripeContextValue => {
  const context = useContext(StripeContext);
  if (context === undefined) {
    throw new Error(
      'useStripeContext must be used within a StripeContextProvider',
    );
  }
  return context;
};