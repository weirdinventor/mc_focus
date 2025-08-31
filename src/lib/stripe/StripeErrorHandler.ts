export interface StripeErrorInfo {
  code: string;
  message: string;
  localizedMessage?: string;
  declineCode?: string;
  type?: string;
}

export class StripeErrorHandler {
  /**
   * Convertit une erreur Stripe en objet d'information structuré
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static parseStripeError(error: any): StripeErrorInfo {
    return {
      code: error.code || 'unknown_error',
      message: error.message || 'Une erreur inconnue est survenue',
      localizedMessage: error.localizedMessage,
      declineCode: error.declineCode,
      type: error.type,
    };
  }

  /**
   * Retourne un message utilisateur friendly basé sur l'erreur Stripe
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getUserFriendlyMessage(error: any): string {
    const errorInfo = this.parseStripeError(error);

    switch (errorInfo.code) {
      case 'card_declined':
        switch (errorInfo.declineCode) {
          case 'insufficient_funds':
            return 'Fonds insuffisants sur votre carte. Veuillez utiliser une autre carte.';
          case 'lost_card':
          case 'stolen_card':
            return 'Votre carte a été signalée comme perdue ou volée. Veuillez contacter votre banque.';
          case 'expired_card':
            return 'Votre carte a expiré. Veuillez utiliser une carte valide.';
          case 'incorrect_cvc':
            return 'Le code de sécurité de votre carte est incorrect.';
          case 'processing_error':
            return 'Erreur de traitement. Veuillez réessayer dans quelques instants.';
          default:
            return 'Votre carte a été refusée. Veuillez vérifier vos informations ou utiliser une autre carte.';
        }
      case 'expired_card':
        return 'Votre carte a expiré. Veuillez utiliser une carte valide.';
      case 'incorrect_cvc':
        return 'Le code de sécurité de votre carte est incorrect.';
      case 'incorrect_number':
        return 'Le numéro de carte est incorrect.';
      case 'invalid_expiry_month':
      case 'invalid_expiry_year':
        return "La date d'expiration de votre carte est invalide.";
      case 'invalid_cvc':
        return 'Le code de sécurité de votre carte est invalide.';
      case 'processing_error':
        return 'Erreur de traitement du paiement. Veuillez réessayer.';
      case 'authentication_required':
        return 'Authentification requise. Veuillez suivre les instructions de votre banque.';
      case 'payment_intent_authentication_failure':
        return "L'authentification du paiement a échoué. Veuillez réessayer.";
      case 'setup_intent_authentication_failure':
        return "L'authentification de la configuration a échoué. Veuillez réessayer.";
      case 'canceled':
        return 'Le paiement a été annulé.';
      default:
        return (
          errorInfo.localizedMessage ||
          errorInfo.message ||
          'Une erreur est survenue lors du paiement.'
        );
    }
  }

  /**
   * Détermine si l'erreur est récupérable (l'utilisateur peut réessayer)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isRecoverableError(error: any): boolean {
    const errorInfo = this.parseStripeError(error);
    const nonRecoverableCodes = [
      'lost_card',
      'stolen_card',
      'pickup_card',
      'restricted_card',
      'security_violation',
      'service_not_allowed',
      'transaction_not_allowed',
    ];

    return (
      !nonRecoverableCodes.includes(errorInfo.code) &&
      !nonRecoverableCodes.includes(errorInfo.declineCode || '')
    );
  }

  /**
   * Log l'erreur pour debug/monitoring
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static logError(error: any, context?: string): void {
    const errorInfo = this.parseStripeError(error);
    console.error('Stripe Error:', {
      context,
      code: errorInfo.code,
      message: errorInfo.message,
      type: errorInfo.type,
      declineCode: errorInfo.declineCode,
      timestamp: new Date().toISOString(),
    });
  }
}
