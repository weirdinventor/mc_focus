import {
  BaseConfigurationProps,
  ConfigurationProps,
  Core,
  CoreConfiguration,
  PersistNavigationEnum,
} from './../core/build';
import { PersistenceStorage } from './../storage/index';
import { KEYS } from './../storage/Keys';
import { IS_DEV } from './../utils/platform';
import { devConfig } from './config.dev';
import { prodConfig } from './config.prod';

// Import Firebase to ensure it's initialized when Configuration is imported
//import './firebase.config';

export enum CONSTANTS {
  GOOGLE_AUTH_CLIENT_ID = '171932480576-kbhritasb5jtoskkh2g8gbrhp5ete5ot.apps.googleusercontent.com',
  APPLE_GOOGLE_AUTH_CLIENT_ID = '636860347845-8aeuomg27mgjvu3sicpokap7ulroeere.apps.googleusercontent.com',
  FB_REALTIME_URL = 'https://discord-94445-default-rtdb.firebaseio.com',
  DEEPLINK_PREFIX = 'moulaclub://',
  EXTERNAL_API_KEY = 'jTNV5kjx5ZOhHzfOaJYtnvqs1lnrOcd1TsDRYplEZHVyWQDu6xkOuoJzTk7Tyb214WBfDfJNUmnFMUe69ygxmQ1zqvobPR6FzcVctbZbjy0IqGlm0KeT7Dp8FP8vcBWr',
  EXTERNAL_API_URL = 'https://moulaclub.com/app/mobile/subscription/status',
  // Stripe Configuration
  STRIPE_PUBLISHABLE_KEY_TEST = 'pk_test_51Rki8g04Urg8zeEv8BslO3ccMF2FPqtWqZq3bPrWrBpHUJBv9H34JQFS36zZXWGfKnaeyLngmRYfuAiP3FNf1P7z009ZFuwZMC',
  STRIPE_PUBLISHABLE_KEY_PROD = 'pk_live_51Rki8VP0XFOMw1y3QFCdwM2z3SRAhKbpJAkAmtLCn8YQY49oDjZNTX7deXcCa9g8sSTg8X3Oq5XhaU5EaygY72au00KuFKOtGF',
}

const baseConfiguration: BaseConfigurationProps = {
  persistNav: PersistNavigationEnum.DEV,
  realDependencies: true,
};

const configuration: ConfigurationProps = IS_DEV ? devConfig : prodConfig;

export const Configuration: CoreConfiguration = {
  ...baseConfiguration,
  ...configuration,
};

Configuration.httpClient.interceptors.request.use((config) => {
  const token = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Configuration.httpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //const message = error.response?.data?.message || error.message;
    //DO SOMETHING

    return Promise.reject(error);
  },
);

export const core = Core(Configuration);