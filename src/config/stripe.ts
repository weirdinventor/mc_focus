import { CONSTANTS } from './Configuration';
import { IS_DEV } from './../utils/platform';

export const getStripePublishableKey = (): string => {
  return IS_DEV
    ? CONSTANTS.STRIPE_PUBLISHABLE_KEY_TEST
    : CONSTANTS.STRIPE_PUBLISHABLE_KEY_PROD;
};

export const stripeConfig = {
  publishableKey: getStripePublishableKey(),
  // Configuration additionnelle si nécessaire
  urlScheme: CONSTANTS.DEEPLINK_PREFIX.replace('://', ''), // moulaclub
  merchantIdentifier: 'merchant.com.moulaclub.focus', // Pour Apple Pay
};
