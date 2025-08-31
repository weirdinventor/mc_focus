// StripeContextProvider.tsx

import React, { ReactNode } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { StripeContext, StripeContextValue } from './StripeContext'; // Import from your new file

interface StripeContextProviderProps {
  children: ReactNode;
}

/**
 * A React Context Provider for the web that provides the initialized Stripe instance.
 * It must be used as a child of the `<Elements>` provider from @stripe/react-stripe-js.
 */
export const StripeContextProvider: React.FC<StripeContextProviderProps> = ({
  children,
}) => {
  const stripe = useStripe();
  const isStripeInitialized = stripe !== null;

  const value: StripeContextValue = { stripe, isStripeInitialized };

  return (
    <StripeContext.Provider value={value}>
      {children}
    </StripeContext.Provider>
  );
};