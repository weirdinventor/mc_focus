// src/config/firebase.config.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getAuth, Auth, signInWithCustomToken } from 'firebase/auth';
import { CONSTANTS } from './Configuration';
import { PersistenceStorage } from '../storage/index';
import { KEYS } from '../storage/Keys';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "moulaclub-app.firebaseapp.com",
  databaseURL: CONSTANTS.FB_REALTIME_URL,
  projectId: "moulaclub-app",
  storageBucket: "moulaclub-app.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase only once
let app: FirebaseApp;
let database: Database;
let auth: Auth;

const initializeFirebase = (): { app: FirebaseApp; database: Database; auth: Auth } => {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  
  if (!database) {
    database = getDatabase(app, CONSTANTS.FB_REALTIME_URL);
  }
  
  if (!auth) {
    auth = getAuth(app);
  }
  
  return { app, database, auth };
};

// Initialize immediately
const { app: firebaseApp, database: firebaseDatabase, auth: firebaseAuth } = initializeFirebase();

/**
 * Authenticate user with Firebase using custom token from your backend
 * This should be called after successful login to your API
 */
export const authenticateWithFirebase = async (): Promise<boolean> => {
  try {
    const accessToken = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
    if (!accessToken) {
      console.warn('No access token found for Firebase authentication');
      return false;
    }

    // TODO: You need to implement an endpoint in your backend that generates
    // a Firebase custom token using the Firebase Admin SDK
    // For now, this is a placeholder - you'll need to create this endpoint
    
    // Example API call to get Firebase custom token:
    // const response = await fetch(`${your_api_url}/auth/firebase-token`, {
    //   headers: { Authorization: `Bearer ${accessToken}` }
    // });
    // const { customToken } = await response.json();
    
    // For now, we'll just return false and log that this needs implementation
    console.warn('Firebase custom token authentication not implemented yet');
    console.log('You need to:');
    console.log('1. Create an endpoint in your backend that generates Firebase custom tokens');
    console.log('2. Use Firebase Admin SDK to create custom tokens for authenticated users');
    console.log('3. Call that endpoint here and use signInWithCustomToken');
    
    return false;
    
    // Once implemented, uncomment this:
    // await signInWithCustomToken(firebaseAuth, customToken);
    // console.log('Successfully authenticated with Firebase');
    // return true;
    
  } catch (error) {
    console.error('Firebase authentication error:', error);
    return false;
  }
};

/**
 * Sign out from Firebase
 */
export const signOutFromFirebase = async (): Promise<void> => {
  try {
    await firebaseAuth.signOut();
    console.log('Successfully signed out from Firebase');
  } catch (error) {
    console.error('Firebase sign out error:', error);
  }
};

// Export the initialized instances
export { firebaseApp as app, firebaseDatabase as database, firebaseAuth as auth };

// Export initialization function if needed elsewhere
export { initializeFirebase };