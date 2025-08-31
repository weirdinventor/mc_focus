import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  StripeApiService,
  type CreateSubscriptionRequest,
  type CreatePaymentIntentRequest,
} from '../lib/stripe/StripeApiService';

// Clés de cache pour React Query
export const stripeQueryKeys = {
  subscriptions: ['stripe', 'subscriptions'] as const,
  subscription: (id: string) => ['stripe', 'subscription', id] as const,
  customer: (userId: string) => ['stripe', 'customer', userId] as const,
};

/**
 * Mutation pour créer une souscription Stripe
 */
export const useCreateStripeSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateSubscriptionRequest) =>
      StripeApiService.createSubscription(params),
    onSuccess: () => {
      // Invalider le cache des souscriptions après création
      queryClient.invalidateQueries({
        queryKey: stripeQueryKeys.subscriptions,
      });
    },
    onError: (error) => {
      console.error('Erreur lors de la création de la souscription:', error);
    },
  });
};

/**
 * Mutation pour créer un PaymentIntent
 */
export const useCreateStripePaymentIntent = () => {
  return useMutation({
    mutationFn: (params: CreatePaymentIntentRequest) =>
      StripeApiService.createPaymentIntent(params),
    onError: (error) => {
      console.error('Erreur lors de la création du PaymentIntent:', error);
    },
  });
};

/**
 * Mutation pour annuler une souscription
 */
export const useCancelStripeSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscriptionId: string) =>
      StripeApiService.cancelSubscription(subscriptionId),
    onSuccess: (_, subscriptionId) => {
      // Invalider le cache de la souscription spécifique et de toutes les souscriptions
      queryClient.invalidateQueries({
        queryKey: stripeQueryKeys.subscription(subscriptionId),
      });
      queryClient.invalidateQueries({
        queryKey: stripeQueryKeys.subscriptions,
      });
    },
    onError: (error) => {
      console.error("Erreur lors de l'annulation de la souscription:", error);
    },
  });
};

/**
 * Query pour récupérer le statut d'une souscription
 */
export const useStripeSubscriptionStatus = (
  subscriptionId: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: stripeQueryKeys.subscription(subscriptionId),
    queryFn: () => StripeApiService.getSubscriptionStatus(subscriptionId),
    enabled: enabled && !!subscriptionId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch toutes les 30 secondes si actif
  });
};

/**
 * Query pour récupérer les informations du customer Stripe
 */
export const useStripeCustomerInfo = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: stripeQueryKeys.customer(userId),
    queryFn: () => StripeApiService.getCustomerInfo(userId),
    enabled: enabled && !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Query pour récupérer le statut d'abonnement de l'utilisateur connecté
 */
export const useCurrentUserSubscriptionStatus = (enabled = true) => {
  return useQuery({
    queryKey: ['stripe', 'current-user-subscription'] as const,
    queryFn: () => StripeApiService.getUserSubscriptionStatus(),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch toutes les 30 secondes si actif
  });
};

/**
 * Hook combiné pour simplifier l'usage des mutations Stripe
 */
export const useStripeMutations = () => {
  const createSubscription = useCreateStripeSubscription();
  const createPaymentIntent = useCreateStripePaymentIntent();
  const cancelSubscription = useCancelStripeSubscription();

  return {
    createSubscription,
    createPaymentIntent,
    cancelSubscription,
    isLoading:
      createSubscription.isPending ||
      createPaymentIntent.isPending ||
      cancelSubscription.isPending,
    error:
      createSubscription.error ||
      createPaymentIntent.error ||
      cancelSubscription.error,
  };
};
