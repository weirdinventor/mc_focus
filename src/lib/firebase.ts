// src/lib/firebase.ts

// Import the functions you need from the SDKs
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getMessaging, Messaging } from 'firebase/messaging';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// Find this in your Firebase project console:
// Project Settings > General > Your apps > Web app > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyDELwATErjBufZr9JppFgVXZj1oRxjdfBo",
  authDomain: "focus-9b734.firebaseapp.com",
  databaseURL: "https://focus-9b734-default-rtdb.firebaseio.com",
  projectId: "focus-9b734",
  storageBucket: "moulaclub-app.appspot.com",
  messagingSenderId: "636860347845",
  appId: "1:636860347845:web:f256610ca20500f50d07ac",
  measurementId: "G-0YK1YE3THK"
};

// Initialize Firebase App
// This should only be done ONCE in your entire application
const app: FirebaseApp = initializeApp(firebaseConfig);

// Export the instances of the services you will use
// This allows you to import them directly in other files (e.g., your hooks)
export const messaging: Messaging = getMessaging(app);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

// You can export the 'app' instance itself if needed elsewhere
export default app;