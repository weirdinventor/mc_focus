import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { IS_DEV } from '../utils/platform';
import { createBrowserHistory } from 'history';
// --- REMOVED REACT NATIVE & UNUSED IMPORTS ---
/*
- All imports from '@react-navigation/native' are removed.
- PersistenceStorage, useIsMounted, useState are no longer needed for persistence.
- Configuration, RootStackParamList, etc., are all related to the old system.
*/
export const history = createBrowserHistory();
/**
 * REPLACES: getRouteName() / getActiveRouteName()
 * In a web app, the current route is simply the URL's pathname.
 * @returns The current path, e.g., "/onboarding/login".
 */
export const getCurrentPath = (): string => {
  return history.location.pathname;
};

/**
 * REPLACES: goBack()
 * Triggers the browser's back action.
 */
export const goBack = (): void => {
  history.back();
};

/**
 * A new utility for standard programmatic navigation.
 * @param path The destination path (e.g., '/app/profile').
 */
export const navigate = (path: string): void => {
    history.push(path);
}

/**
 * REPLACES: resetRoot()
 * The closest web equivalent is navigating and replacing the current entry in
 * the browser's history stack. This is useful for post-login flows where you
 * don't want the user to be able to go "back" to the login screen.
 * @param path The destination path (e.g., '/app').
 */
export const navigateAndReplace = (path: string): void => {
  history.replace(path);
};


// --- REPLACEMENT for `useNavigationPersistance` ---
/**
 * In a web environment, the browser's URL and history stack provide navigation
 * persistence automatically. There is no need for a hook to save/restore state.
 *
 * This hook, `useRouteTracking`, is a simplified replacement that fulfills the
 * secondary purpose of the original hook: logging route changes for debugging.
 */
export const useRouteTracking = (): void => {
  const location = useLocation();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;

    // If the path has changed since the last render, log it.
    if (previousPathRef.current !== currentPath) {
      if (IS_DEV) {
        console.log('[ROUTE CHANGED]:', currentPath);
      }
    }

    // Store the current path for the next comparison.
    previousPathRef.current = currentPath;

  }, [location.pathname]); // This effect runs every time the URL pathname changes.
};