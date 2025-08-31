import { useCallback } from 'react';
// --- Web SDK Imports for Firebase Messaging ---
import { getMessaging, getToken, isSupported } from 'firebase/messaging';
import { getApp } from 'firebase/app';

// IMPORTANT: You must get this VAPID key from your Firebase project settings.
// Go to Project Settings > Cloud Messaging > Web configuration.
// It's best to store this in an environment variable.
const VAPID_KEY = process.env.REACT_APP_FIREBASE_VAPID_KEY || 'YOUR_FIREBASE_WEB_PUSH_CERTIFICATE_KEY_PAIR';

/**
 * A React hook for the web that handles requesting permission for push notifications
 * and retrieving the Firebase Cloud Messaging (FCM) token.
 */
export const usePermissions = () => {
  /**
   * Requests permission to show notifications.
   * If permission is granted, it then retrieves the FCM token.
   * @returns A promise that resolves with the FCM token (string) on success, or null on failure.
   */
  const requestNotification = useCallback(async (): Promise<string | null> => {
    // 1. Check if the browser and Firebase messaging are even supported.
    const supported = await isSupported();
    if (!supported) {
      console.warn('Firebase Messaging is not supported in this browser.');
      return null;
    }

    try {
      // 2. Request permission from the user using the browser's native API.
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        console.log('Notification permission granted.');
        
        // 3. If permission is granted, get the FCM token.
        const messaging = getMessaging(getApp());
        const currentToken = await getToken(messaging, {
          vapidKey: VAPID_KEY,
        });

        if (currentToken) {
          console.log('FCM Token:', currentToken);
          // This is the token you would send to your backend server.
          return currentToken;
        } else {
          console.warn('No registration token available. Request permission to generate one.');
          return null;
        }
      } else {
        console.log('Unable to get permission to notify.');
        return null;
      }
    } catch (err) {
      console.error('An error occurred while retrieving token. ', err);
      return null;
    }
  }, []);

  return { requestNotification };
};