/* eslint-disable @typescript-eslint/no-explicit-any */

// Import Firebase Auth functions for the web
import { Auth, signInWithCustomToken } from 'firebase/auth'; 

import { core } from '../config/Configuration';
import { KEYS } from '../storage/Keys';
import { compareAsc, fromUnixTime } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

// The web version of PersistenceStorage would likely wrap localStorage
// We'll use localStorage directly here for simplicity.
const PersistenceStorage = {
  getItem: (key: string) => localStorage.getItem(key),
  setItem: (key: string, value: string) => localStorage.setItem(key, value),
};

/**
 * Checks and validates the Firebase token from storage for a web environment.
 * @param auth - The initialized Firebase Auth instance from getAuth().
 */
export const checkFirebaseToken = async (auth: Auth) => {
  const firebaseToken = PersistenceStorage.getItem(KEYS.FIREBASE_TOKEN);

  if (firebaseToken) {
    try {
      const decodedToken = jwtDecode(firebaseToken);
      if (decodedToken.exp) {
        const decodedFromUnix = fromUnixTime(decodedToken.exp);
        const now = new Date();

        // Check if the token has expired
        const shouldRefetchFirebaseToken = compareAsc(now, decodedFromUnix) === 1;

        if (shouldRefetchFirebaseToken) {
          console.log('Firebase token expired, refreshing...');
          const newFirebaseToken = await core.firebaseRefreshToken.execute();

          if (newFirebaseToken.type === 'success') {
            PersistenceStorage.setItem(
              KEYS.FIREBASE_TOKEN,
              newFirebaseToken.value.token,
            );
            // Sign in with the new custom token
            await signInWithCustomToken(auth, newFirebaseToken.value.token);
            console.log('Successfully signed in with new token.');
            return;
          }
        }

        // If token is valid, sign in with the existing custom token
        await signInWithCustomToken(auth, firebaseToken);
        console.log('Successfully signed in with existing token.');
      }
    } catch (error) {
        console.error("Failed to decode or sign in with Firebase token:", error);
        // Optional: handle error, e.g., clear the invalid token
    }
  }
};