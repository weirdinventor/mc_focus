import { useEffect } from 'react';
import { onlineManager } from '@tanstack/react-query';

/**
 * A React hook that syncs TanStack Query's online status with the browser's connectivity state.
 * This is the web equivalent of using NetInfo in React Native.
 * It listens to the browser's 'online' and 'offline' events to automatically refetch queries
 * when the internet connection is restored.
 */
export const useOnlineManager = () => {
  useEffect(() => {
    // Define functions to update the online status
    const handleOnline = () => onlineManager.setOnline(true);
    const handleOffline = () => onlineManager.setOnline(false);

    // Add event listeners to the window object
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // The cleanup function is returned from useEffect.
    // It's called when the component unmounts to prevent memory leaks.
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount.
};