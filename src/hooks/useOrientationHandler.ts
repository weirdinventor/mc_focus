import { useState, useLayoutEffect, useCallback } from 'react';

/**
 * Safely gets the initial screen orientation type.
 * @returns The orientation type or `undefined` if the API is not available (e.g., SSR).
 */
const getInitialOrientation = (): OrientationType | undefined => {
  return typeof window !== 'undefined' ? window.screen?.orientation?.type : undefined;
};

/**
 * A simplified React hook for the web that READS the screen orientation.
 * The locking functions are provided as empty stubs for API compatibility,
 * as locking orientation is highly restricted in web browsers and less
 * important than a responsive design.
 */
export const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationType | undefined>(
    getInitialOrientation(),
  );

  // This effect reliably READS the orientation and updates the state when it changes.
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !window.screen?.orientation) {
      return;
    }

    const handleOrientationChange = () => {
      setOrientation(window.screen.orientation.type);
    };

    window.screen.orientation.addEventListener('change', handleOrientationChange);

    return () => {
      window.screen.orientation.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  // --- STUBBED LOCKING FUNCTIONS ---
  // These are "no-op" (no-operation) functions. They exist so that any component
  // calling them won't crash. They also provide a helpful warning.

  const lockToPortrait = useCallback(() => {
    console.warn(
      'Screen orientation locking is not supported or is highly restricted on web browsers. Please ensure your design is responsive.',
    );
  }, []);

  const lockToLandscape = useCallback(() => {
    console.warn(
      'Screen orientation locking is not supported or is highly restricted on web browsers. Please ensure your design is responsive.',
    );
  }, []);

  // Return the same API shape as the original hook for perfect compatibility.
  return {
    lockToPortrait,
    lockToLandscape,
    interfaceOrientation: orientation,
  };
};