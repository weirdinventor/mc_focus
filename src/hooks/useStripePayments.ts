// src/hooks/useStripePayments.ts

import { useState, useCallback } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import {
  StripeServiceUtils,
  StripeErrorHandler,
  StripeApiService,
} from '../lib/stripe'; // Vos helpers Stripe existants
import {
  useCreateStripeSubscription,
  useCreateStripePaymentIntent,
} from '../react-query/stripeQueries'; // Vos mutations React Query

export interface CreateSubscriptionParams {
  priceId: string;
  userId?: string;
  metadata?: Record<string, string>;
  }
  export interface CreatePaymentIntentParams {
  amount: number;
  currency?: string;
  userId?: string;
  description?: string;
  metadata?: Record<string, string>;
  }
  export interface PaymentResult {
  success: boolean;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  }
  export interface UseStripePaymentsReturn {
    // États
    isLoading: boolean;
    error: string | null;
    // Méthodes de paiement
    createSubscription: (
    params: CreateSubscriptionParams,
    ) => Promise<PaymentResult>;
    createPaymentIntent: (
    params: CreatePaymentIntentParams,
    ) => Promise<PaymentResult>;
    handlePaymentSheet: (clientSecret: string) => Promise<PaymentResult>;
    // Utilitaires
    resetError: () => void;
    formatAmount: (amount: number, currency?: string) => string;
    }
    
export const useStripePayments = (): UseStripePaymentsReturn => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubscriptionMutation = useCreateStripeSubscription();
  const createPaymentIntentMutation = useCreateStripePaymentIntent();

  const validateStripeInitialization = useCallback((): boolean => {
    if (!stripe || !elements) {
      const errorMessage = "Stripe n'est pas encore initialisé.";
      console.error(errorMessage);
      setError(errorMessage);
      return false;
    }
    return true;
  }, [stripe, elements]);

  const resetError = useCallback(() => setError(null), []);

  const confirmPaymentOnWeb = async (clientSecret: string): Promise<PaymentResult> => {
    if (!stripe || !elements) {
      return { success: false, error: 'Stripe non initialisé.' };
    }
    
    // ACTION REQUISE : C'est l'URL où Stripe redirigera l'utilisateur
    // Elle doit correspondre à une route dans votre application (voir App.tsx)
    const returnUrl = `${window.location.origin}/payment-confirmation`;
    
    const { error: confirmationError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
    });

    if (confirmationError) {
      // Cette erreur se produit s'il y a un problème immédiat (ex: carte invalide)
      // Les erreurs d'annulation ou autres sont gérées après la redirection.
      throw confirmationError;
    }

    // Le navigateur est maintenant redirigé par Stripe... le code ici ne s'exécutera pas immédiatement.
    return { success: true };
  };

  const createSubscription = useCallback(
    async (params: CreateSubscriptionParams): Promise<PaymentResult> => {
      if (!validateStripeInitialization()) {
        return { success: false, error: 'Stripe non initialisé' };
      }
      setIsLoading(true);
      setError(null);

      try {
        const response = await createSubscriptionMutation.mutateAsync({
          priceId: params.priceId,
          metadata: StripeServiceUtils.generatePaymentMetadata(params.userId, params.metadata),
        });

        if (!response.success || !response.data?.clientSecret) {
          throw new Error(response.error || 'Erreur lors de la création de la souscription');
        }

        return await confirmPaymentOnWeb(response.data.clientSecret);
      } catch (err: any) {
        const errorMessage = StripeErrorHandler.getUserFriendlyMessage(err);
        setError(errorMessage);
        StripeErrorHandler.logError(err, 'createSubscription');
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [validateStripeInitialization, createSubscriptionMutation, stripe, elements],
  );

  const createPaymentIntent = useCallback(
    async (params: CreatePaymentIntentParams): Promise<PaymentResult> => {
      if (!validateStripeInitialization()) {
        return { success: false, error: 'Stripe non initialisé' };
      }
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await createPaymentIntentMutation.mutateAsync({
          amount: StripeServiceUtils.convertToCents(params.amount),
          currency: params.currency || 'eur',
          metadata: StripeServiceUtils.generatePaymentMetadata(params.userId, params.metadata),
        });

        if (!response.success || !response.data?.clientSecret) {
          throw new Error(response.error || 'Erreur lors de la création du paiement');
        }
        
        return await confirmPaymentOnWeb(response.data.clientSecret);
      } catch (err: any) {
        const errorMessage = StripeErrorHandler.getUserFriendlyMessage(err);
        setError(errorMessage);
        StripeErrorHandler.logError(err, 'createPaymentIntent');
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [validateStripeInitialization, createPaymentIntentMutation, stripe, elements],
  );
  
  const handlePaymentSheet = useCallback(
      // Cette fonction est essentiellement un alias pour `confirmPaymentOnWeb`
      async (clientSecret: string): Promise<PaymentResult> => {
        if (!validateStripeInitialization()) return { success: false, error: 'Stripe non initialisé' };
        setIsLoading(true);
        setError(null);
        try {
            return await confirmPaymentOnWeb(clientSecret);
        } catch(err: any) {
            const errorMessage = StripeErrorHandler.getUserFriendlyMessage(err);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
      },
      [validateStripeInitialization, stripe, elements]
  )

  const formatAmount = useCallback(
    (amount: number, currency = 'EUR'): string => StripeServiceUtils.formatAmount(amount, currency),
    [],
  );

  return {
    isLoading: isLoading || createSubscriptionMutation.isPending || createPaymentIntentMutation.isPending,
    error: error || createSubscriptionMutation.error?.message || createPaymentIntentMutation.error?.message || null,
    createSubscription,
    createPaymentIntent,
    handlePaymentSheet,
    resetError,
    formatAmount,
  };
};