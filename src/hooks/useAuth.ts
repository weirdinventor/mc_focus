import { useEffect, useState } from 'react';
// Web SDK imports for Firebase Auth
import { getAuth, signInWithCustomToken, signOut, Auth } from 'firebase/auth';

import { useGetMeQuery } from '../react-query/queries/user/userQueries';
import { queryClient } from '../react-query/queryClient';
import { KEYS } from './../storage/Keys';
import { PersistenceStorage } from './../storage/index'; // The web version
import { AuthActions } from './../store/authSlice';
import { useAppDispatch } from './../store/index';
import { checkFirebaseToken } from './../utils/checkFirebaseToken'; // The web version
import { useNotifications } from './useNotifications';
import { useNavigate } from 'react-router-dom';

// It's cleaner to get the auth instance once from a central place.
// If you have a Firebase adapter/singleton, use it. Otherwise, initialize it here.
// For this example, let's assume a simple getAuth() call.
let auth: Auth; // Keep a reference to the auth instance

export const useAuth = (freshBoot?: boolean) => {
  const dispatch = useAppDispatch();
  const { setNotifications } = useNotifications();
  const navigate = useNavigate();

  // Initialize the auth instance if it hasn't been already
  if (!auth) {
    auth = getAuth(); // Or FirebaseAdapter.getInstance().getAuth()
  }

  const [authInit, setAuthInit] = useState(false);

  // These are read once, which is fine for both platforms.
  const token = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
  const fbToken = PersistenceStorage.getItem(KEYS.FIREBASE_TOKEN);

  const { refetch: fetchMe, isLoading: fetchingUser } = useGetMeQuery(false);

  const authInitialising = authInit || fetchingUser;

  const logout = async () => {
    // Google Sign-In on the web is handled differently.
    // Signing out of Firebase is usually sufficient to clear the session.
    // If you use a library like @react-oauth/google, you'd call its logout function here.
    
    PersistenceStorage.removeItem(KEYS.ACCESS_TOKEN);
    PersistenceStorage.removeItem(KEYS.FIREBASE_TOKEN);

    // Use the web SDK's signOut function
    await signOut(auth);

    queryClient.clear();
    dispatch(AuthActions.setLoggedIn(false));
  };

  const finalliseAuth = () => {
    // The concept of a splash screen doesn't directly map to the web.
    // This function now simply marks the auth process as complete.
    setAuthInit(true);
  };

  const signup = async (newToken: string, firebaseToken: string) => {
    PersistenceStorage.setItem(KEYS.ACCESS_TOKEN, newToken);
    PersistenceStorage.setItem(KEYS.FIREBASE_TOKEN, firebaseToken);
    // On signup, the user might already be signed into Firebase via the backend token.
    // You could call login() here to complete the process if needed.
  };

  const login = async (firebaseToken?: string, newToken?: string) => {
    if (newToken && firebaseToken) {
      // Use the web SDK's signInWithCustomToken function
      await signInWithCustomToken(auth, firebaseToken);
      newLogin(newToken, firebaseToken);
      navigate("/", { replace: true });
      return;
    } else if (token && fbToken) {
      await existingTokenCheck();
    }
    finalliseAuth();
  };

  const newLogin = (newToken: string, firebaseToken: string) => {
    PersistenceStorage.setItem(KEYS.ACCESS_TOKEN, newToken);
    PersistenceStorage.setItem(KEYS.FIREBASE_TOKEN, firebaseToken);
    dispatch(AuthActions.setLoggedIn(true));
    finalliseAuth();
    setNotifications();
  };

  const existingTokenCheck = async () => {
    try {
      const { data } = await fetchMe();
      if (data && fbToken) {
        // The web version of checkFirebaseToken requires the auth instance.
        await checkFirebaseToken(auth); 
        dispatch(AuthActions.setLoggedIn(true));
        setNotifications();
      } else {
        await logout(); // Ensure logout is awaited
      }
    } catch (error) {
      await logout(); // Ensure logout is awaited
    } finally {
      finalliseAuth();
    }
  };

  useEffect(() => {
    if (freshBoot && token && fbToken) {
      existingTokenCheck();
    } else {
      finalliseAuth();
    }
    // The original author intentionally left the dependency array this way.
    // We will respect that design choice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freshBoot, token, fbToken]);

  return { logout, login, authInitialising, signup };
};