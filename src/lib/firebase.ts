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
  apiKey: "AIzaSyCUND2uqLRyuaMp1XxsnT2FjN0W07CVUg0",
  authDomain: "discord-94445.firebaseapp.com",
  databaseURL: "https://discord-94445-default-rtdb.firebaseio.com",
  projectId: "discord-94445",
  storageBucket: "discord-94445.firebasestorage.app",
  messagingSenderId: "171932480576",
  appId: "1:171932480576:web:ce39184e0efc03cc485ba5",
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