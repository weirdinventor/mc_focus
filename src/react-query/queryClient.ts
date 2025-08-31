import { PersistenceStorage } from '../storage/index'; // This now points to your web-adapted storage
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import {
  PersistQueryClientOptions,
  removeOldestQuery,
} from '@tanstack/react-query-persist-client';
import { QueryCache } from '@tanstack/react-query';

// A constant for cache expiration time, works anywhere.
const THREE_HOURS = 1000 * 60 * 60 * 3;

// Standard QueryClient configuration, works anywhere.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.withError) {
        // Your logic here (e.g., show a toast) is also cross-platform.
        return;
      }
    },
  }),
});

// The persister uses your web-adapted PersistenceStorage, so this is now web-ready.
const clientPersister = createSyncStoragePersister({
  key: 'rq-airo',
  storage: PersistenceStorage,
  retry: removeOldestQuery,
  throttleTime: 2000,
});

// The final options object, which is just a configuration data structure.
export const persistOptions: PersistQueryClientOptions = {
  queryClient,
  persister: clientPersister,
  maxAge: THREE_HOURS,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => Boolean(query.gcTime !== 0),
  },
};