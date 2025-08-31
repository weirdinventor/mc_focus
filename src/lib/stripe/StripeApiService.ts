import { Configuration } from '../../config/Configuration';

export interface CreateSubscriptionRequest {
  priceId: string;
  metadata?: Record<string, string>;
}

export interface ConfirmSubscriptionRequest {
  subscriptionId: string;
  paymentMethodId?: string;
}

export interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface StripeApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface SubscriptionResponse {
  subscriptionId: string;
  clientSecret: string;
  status: string;
}

export interface SubscriptionStatusResponse {
  subscriptionId: string;
  status: string;
  priceId: string;
  currentPeriodStart: string | number | Date;
  currentPeriodEnd: string | number | Date;
  metadata?: Record<string, string>;
}

export interface PaymentIntentResponse {
  paymentIntentId: string;
  clientSecret: string;
  status: string;
}

function extractErrorMessage(err: unknown, fallback: string): string {
  if (typeof err === 'string') return err;
  if (err && typeof err === 'object') {
    const anyErr = err as Record<string, unknown>;
    const response = anyErr.response as Record<string, unknown> | undefined;
    const data = response?.data as Record<string, unknown> | undefined;
    const message = data?.message;
    if (typeof message === 'string') return message;
    const msg = (anyErr as { message?: unknown }).message;
    if (typeof msg === 'string') return msg;
  }
  return fallback;
}

export class StripeApiService {
  /**
   * Crée une souscription via l'API backend
   */
  static async createSubscription(
    params: CreateSubscriptionRequest,
  ): Promise<StripeApiResponse<SubscriptionResponse>> {
    try {
      console.log(
        '[StripeApiService] Creating subscription with params:',
        params,
      );
      const response: unknown = await Configuration.httpClient.post(
        '/api/stripe/create-subscription',
        params,
      );
      console.log('[StripeApiService] Backend response:', response);

      // L'intercepteur retourne response.data, donc 'response' est déjà les données
      if (response && typeof response === 'object') {
        const responseObj = response as Record<string, unknown>;
        if (responseObj.success === false) {
          console.log(
            '[StripeApiService] Backend returned error:',
            responseObj.error,
          );
          return {
            success: false,
            error:
              (responseObj.error as string) || 'Erreur inconnue du backend',
          };
        }
        return response as StripeApiResponse<SubscriptionResponse>;
      }

      // Fallback si la réponse n'a pas la structure attendue
      return {
        success: false,
        error: 'Réponse inattendue du serveur',
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('[StripeApiService] Network/HTTP error:', error);
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          'Erreur lors de la création de la souscription',
      };
    }
  }

  /**
   * Confirme une souscription après paiement réussi
   */
  static async confirmSubscription(
    params: ConfirmSubscriptionRequest,
  ): Promise<
    StripeApiResponse<{ isSubscribed: boolean; subscriptionStatus: string }>
  > {
    try {
      console.log(
        '[StripeApiService] Confirming subscription with params:',
        params,
      );
      const response: unknown = await Configuration.httpClient.post(
        '/api/stripe/confirm-subscription',
        params,
      );
      console.log(
        '[StripeApiService] Confirm subscription response:',
        response,
      );

      // L'intercepteur retourne response.data, donc 'response' est déjà les données
      if (response && typeof response === 'object') {
        const responseObj = response as Record<string, unknown>;
        if (responseObj.success === false) {
          console.log(
            '[StripeApiService] Backend returned error:',
            responseObj.error,
          );
          return {
            success: false,
            error:
              (responseObj.error as string) || 'Erreur inconnue du backend',
          };
        }
        return response as StripeApiResponse<{
          isSubscribed: boolean;
          subscriptionStatus: string;
        }>;
      }

      // Fallback si la réponse n'a pas la structure attendue
      return {
        success: false,
        error: 'Réponse inattendue du serveur',
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('[StripeApiService] Network/HTTP error:', error);
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          'Erreur lors de la confirmation de la souscription',
      };
    }
  }

  /**
   * Crée un PaymentIntent via l'API backend
   */
  static async createPaymentIntent(
    params: CreatePaymentIntentRequest,
  ): Promise<StripeApiResponse<PaymentIntentResponse>> {
    try {
      const response = await Configuration.httpClient.post(
        '/stripe/create-payment-intent',
        params,
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          'Erreur lors de la création du paiement',
      };
    }
  }

  /**
   * Annule une souscription (désormais exposé côté backend)
   */
  static async cancelSubscription(
    subscriptionId: string,
  ): Promise<StripeApiResponse> {
    try {
      const response = await Configuration.httpClient.delete(
        `/stripe/subscriptions/${subscriptionId}`,
      );
      return response.data;
    } catch (error: unknown) {
      return {
        success: false,
        error: extractErrorMessage(
          error,
          "Erreur lors de l'annulation de la souscription",
        ),
      };
    }
  }

  /**
   * Récupère le statut d'une souscription par id
   */
  static async getSubscriptionStatus(
    subscriptionId: string,
  ): Promise<StripeApiResponse<SubscriptionStatusResponse>> {
    try {
      const response = await Configuration.httpClient.get(
        `/stripe/subscriptions/${subscriptionId}`,
      );
      return response.data;
    } catch (error: unknown) {
      return {
        success: false,
        error: extractErrorMessage(
          error,
          'Erreur lors de la récupération du statut',
        ),
      };
    }
  }

  /**
   * Récupère les informations d'un customer Stripe (non exposé côté backend pour l'instant)
   */
  static async getCustomerInfo(userId: string): Promise<StripeApiResponse> {
    try {
      const response = await Configuration.httpClient.get(
        `/stripe/customers/${userId}`,
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          'Erreur lors de la récupération du client',
      };
    }
  }

  /**
   * Récupère le statut d'abonnement de l'utilisateur connecté
   */
  static async getUserSubscriptionStatus(): Promise<
    StripeApiResponse<{
      hasActiveSubscription: boolean;
      subscriptions: SubscriptionStatusResponse[];
    }>
  > {
    try {
      console.log('[StripeApiService] Getting user subscription status');
      const response: unknown = await Configuration.httpClient.get(
        '/api/stripe/subscription-status',
      );
      console.log('[StripeApiService] User subscription response:', response);

      if (response && typeof response === 'object') {
        const responseObj = response as Record<string, unknown>;
        if (responseObj.success === false) {
          console.log(
            '[StripeApiService] Backend returned error:',
            responseObj.error,
          );
          return {
            success: false,
            error:
              (responseObj.error as string) || 'Erreur inconnue du backend',
          };
        }
        return response as StripeApiResponse<{
          hasActiveSubscription: boolean;
          subscriptions: SubscriptionStatusResponse[];
        }>;
      }

      return {
        success: false,
        error: 'Réponse inattendue du serveur',
      };
    } catch (error: unknown) {
      console.log('[StripeApiService] Network/HTTP error:', error);
      return {
        success: false,
        error: extractErrorMessage(
          error,
          "Erreur lors de la récupération du statut d'abonnement",
        ),
      };
    }
  }
}
