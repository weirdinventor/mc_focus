import { useEffect, useState, useRef } from 'react';

// Define the possible states for page visibility.
type PageVisibilityState = 'visible' | 'hidden' | 'prerender' | 'unloaded';

// Define the interface for the hook's settings, mirroring the original.
interface PageVisibilitySettings {
  onChange?: (status: PageVisibilityState) => void;
  onForeground?: () => void; // This will trigger when the page becomes 'visible'
  onBackground?: () => void; // This will trigger when the page becomes 'hidden'
}

/**
 * A React hook that tracks the browser tab's visibility state.
 * This is the web equivalent of React Native's `useAppState` hook.
 *
 * @param {PageVisibilitySettings} settings - Callbacks for state changes.
 * @returns An object containing the current `visibilityState`.
 */
export const usePageVisibility = ({
  onChange,
  onForeground,
  onBackground,
}: PageVisibilitySettings) => {
  // Get the initial state, ensuring it's safe for Server-Side Rendering (SSR).
  const getInitialState = (): PageVisibilityState => {
    return typeof document !== 'undefined' ? document.visibilityState : 'visible';
  };
  
  const [visibilityState, setVisibilityState] = useState<PageVisibilityState>(getInitialState);
  
  // Use a ref to store the previous state to compare against.
  const previousStateRef = useRef<PageVisibilityState>(visibilityState);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const nextState = document.visibilityState;
      
      // Compare the previous state with the next state to trigger callbacks.
      if (previousStateRef.current !== 'visible' && nextState === 'visible') {
        onForeground?.();
      } else if (previousStateRef.current === 'visible' && nextState !== 'visible') {
        onBackground?.();
      }
      
      // Call the generic onChange callback.
      onChange?.(nextState);

      // Update the state and the ref for the next change.
      setVisibilityState(nextState);
      previousStateRef.current = nextState;
    };

    // Add the event listener to the document.
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // The cleanup function removes the listener when the component unmounts.
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onChange, onForeground, onBackground]); // Re-run effect if callbacks change.

  return { visibilityState };
};