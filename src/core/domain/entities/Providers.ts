export type Providers = 'google' | 'apple' | 'email';

export type SocialProviders = Exclude<Providers, 'email'>;
