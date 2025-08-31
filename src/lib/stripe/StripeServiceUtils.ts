import { defaultStripeConfig } from '../../config/stripeEnvironment';
import { StripeErrorHandler } from './StripeErrorHandler';

export interface StripePaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    expiryMonth: number;
    expiryYear: number;
  };
}

export interface StripePaymentResult {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paymentIntent?: any;
  error?: string;
  paymentMethod?: StripePaymentMethod;
}

export interface StripeSubscriptionResult {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscription?: any;
  clientSecret?: string;
  error?: string;
}

export class StripeServiceUtils {
  /**
   * Valide les paramètres de configuration Stripe
   */
  static validateConfiguration(): boolean {
    const config = defaultStripeConfig;

    if (!config.publishableKey || config.publishableKey.includes('...')) {
      console.error('Stripe publishable key is not configured properly');
      return false;
    }

    if (!config.merchantIdentifier) {
      console.error('Merchant identifier is not configured');
      return false;
    }

    return true;
  }

  /**
   * Formate un montant pour l'affichage (en euros)
   */
  static formatAmount(amount: number, currency = 'EUR'): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency,
    }).format(amount);
  }

  /**
   * Convertit un montant en centimes pour Stripe
   */
  static convertToCents(amount: number): number {
    return Math.round(amount * 100);
  }

  /**
   * Convertit un montant de centimes vers euros
   */
  static convertFromCents(amountInCents: number): number {
    return amountInCents / 100;
  }

  /**
   * Génère les métadonnées par défaut pour les paiements
   */
  static generatePaymentMetadata(
    userId?: string,
    additionalData?: Record<string, string>,
  ): Record<string, string> {
    return {
      ...(userId ? { userId } : {}),
      platform: 'mobile',
      timestamp: new Date().toISOString(),
      ...additionalData,
    };
  }

  /**
   * Valide les données d'une carte
   */
  static validateCardData(
    cardNumber: string,
    expiryMonth: number,
    expiryYear: number,
    cvc: string,
  ): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Validation du numéro de carte (basique)
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
      errors.push('Numéro de carte invalide');
    }

    // Validation de la date d'expiration
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (expiryMonth < 1 || expiryMonth > 12) {
      errors.push("Mois d'expiration invalide");
    }

    if (
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      errors.push("Date d'expiration invalide");
    }

    // Validation du CVC
    if (!cvc || cvc.length < 3 || cvc.length > 4) {
      errors.push('Code de sécurité invalide');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Nettoie et formate un numéro de carte
   */
  static formatCardNumber(cardNumber: string): string {
    return cardNumber
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  /**
   * Détermine le type de carte basé sur le numéro
   */
  static getCardType(cardNumber: string): string {
    const cleanNumber = cardNumber.replace(/\s/g, '');

    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) {
      return 'mastercard';
    }
    if (cleanNumber.startsWith('34') || cleanNumber.startsWith('37')) {
      return 'amex';
    }
    if (cleanNumber.startsWith('6')) return 'discover';

    return 'unknown';
  }

  /**
   * Gère les erreurs Stripe de manière centralisée
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static handleStripeError(error: any, context?: string): string {
    StripeErrorHandler.logError(error, context);
    return StripeErrorHandler.getUserFriendlyMessage(error);
  }
}
