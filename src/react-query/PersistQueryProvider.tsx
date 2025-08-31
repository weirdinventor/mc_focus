import {
  focusManager,
  IsRestoringProvider,
  QueryClientProvider,
  QueryClientProviderProps,
} from '@tanstack/react-query';
import {
  PersistQueryClientOptions,
  persistQueryClient,
} from '@tanstack/react-query-persist-client';
import React, { JSX, useEffect, useRef, useState } from 'react';
import { useOnlineManager } from './useOnlineManager'; // The web version you created earlier
import { persistOptions } from './queryClient';
 
export const usePageFocus = (): void => {
  useEffect(() => {
    // This handler is called whenever the tab's visibility changes.
    const onVisibilityChange = () => {
      // document.visibilityState can be 'visible', 'hidden', etc.
      // We set the focus state to true only when the tab is visible.
      focusManager.setFocused(document.visibilityState === 'visible');
    };

    // Add the event listener to the document.
    document.addEventListener('visibilitychange', onVisibilityChange, false);

    // The cleanup function is returned from useEffect to remove the listener
    // when the component unmounts, preventing memory leaks.
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []); // The empty dependency array ensures this effect runs only once.
};
// This type definition remains the same.
export type PersistQueryClientProviderProps = QueryClientProviderProps & {
  persistOptions: Omit<PersistQueryClientOptions, 'queryClient'>;
  onSuccess?: () => void;
};

export const PersistQueryClientProvider = ({
  children,
  onSuccess,
  client,
  ...props
}: PersistQueryClientProviderProps): JSX.Element => {
  const [isRestoring, setIsRestoring] = useState(true);
  
  // The 'persistOptions' and 'onSuccess' are passed directly from props now.
  // Using a ref is still a good practice to avoid re-running effects unnecessarily.
  const refs = useRef({ persistOptions, onSuccess });
  useEffect(() => {
    refs.current = { persistOptions, onSuccess };
  });

  // --- PLATFORM-SPECIFIC HOOKS ---
  // 1. Use the web-based online manager.
  useOnlineManager();

  // 2. Use the new web-based page focus manager.
  usePageFocus();
  // --- END PLATFORM-SPECIFIC HOOKS ---


  // This persistence logic is platform-agnostic and remains unchanged.
  useEffect(() => {
    let isStale = false;
    setIsRestoring(true);
    
    const [unsubscribe, promise] = persistQueryClient({
      ...refs.current.persistOptions,
      queryClient: client,
    });

    promise.then(() => {
      if (!isStale) {
        refs.current.onSuccess?.();
        setIsRestoring(false);
      }
    });

    return () => {
      isStale = true;
      unsubscribe();
    };
  }, [client, persistOptions]); // Added persistOptions to dependencies for correctness

  return (
    <QueryClientProvider client={client} {...props}>
      <IsRestoringProvider value={isRestoring}>{children}</IsRestoringProvider>
    </QueryClientProvider>
  );
};