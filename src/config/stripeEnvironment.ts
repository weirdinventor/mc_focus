import { CONSTANTS } from './Configuration';

/**
 * Defines the Stripe configuration needed for a web environment.
 * The publishableKey is the only mandatory client-side value.
 */
export interface StripeEnvironmentConfig {
  publishableKey: string;
  // Note: merchantIdentifier and urlScheme are not used for Stripe on the web.
  // Apple Pay is configured by verifying your domain in the Stripe Dashboard.
  // 3D Secure return URLs are provided when creating the PaymentIntent.
}

/**
 * Gets the appropriate Stripe configuration based on the current environment.
 * It uses the standard `process.env.NODE_ENV` for web projects.
 *
 * @param isDev Defaults to true if NODE_ENV is 'development'.
 * @returns The Stripe configuration object for the current environment.
 */
export const getStripeEnvironmentConfig = (
  isDev: boolean = process.env.NODE_ENV === 'development',
): StripeEnvironmentConfig => {
  const publishableKey = isDev
    ? CONSTANTS.STRIPE_PUBLISHABLE_KEY_TEST
    : CONSTANTS.STRIPE_PUBLISHABLE_KEY_PROD;

  return {
    publishableKey,
    // The mobile-specific properties have been removed.
  };
};

// Default configuration for the current environment, ready to be imported elsewhere.
export const defaultStripeConfig = getStripeEnvironmentConfig();