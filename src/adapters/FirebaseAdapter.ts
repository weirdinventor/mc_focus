/* eslint-disable @typescript-eslint/no-explicit-any */

// Import necessary functions from the Firebase Web SDK
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, // Renamed to avoid conflict with method name
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc 
} from 'firebase/firestore';

// Interface for Firebase configuration
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Firebase Web Configuration
const firebaseWebConfig: FirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'your-web-api-key',
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    'your-project.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || 'your-app-id',
};

class FirebaseAdapter {
  private static instance: FirebaseAdapter;
  private firebaseApp: any;
  private auth: any;
  private firestore: any;

  private constructor() {
    // Initialize Firebase directly in the constructor for web
    this.firebaseApp = initializeApp(firebaseWebConfig);
    this.auth = getAuth(this.firebaseApp);
    this.firestore = getFirestore(this.firebaseApp);
  }

  public static getInstance(): FirebaseAdapter {
    if (!FirebaseAdapter.instance) {
      FirebaseAdapter.instance = new FirebaseAdapter();
    }
    return FirebaseAdapter.instance;
  }

  // --- Authentication Methods ---
  public getAuth() {
    return this.auth;
  }

  public getFirestore() {
    return this.firestore;
  }

  // --- Utility Methods for Firebase ---
  public async signInWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public async signOut() {
    return firebaseSignOut(this.auth);
  }

  public async createUserWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // --- Firestore Methods ---
  public async getDocument(collection: string, docId: string) {
    const docRef = doc(this.firestore, collection, docId);
    return getDoc(docRef);
  }

  public async setDocument(
    collection: string,
    docId: string,
    data: Record<string, unknown>,
  ) {
    const docRef = doc(this.firestore, collection, docId);
    return setDoc(docRef, data);
  }
}

export default FirebaseAdapter;