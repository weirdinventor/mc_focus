// --- Imports conservés ---
import { OS } from './../core/domain/entities/OS'; // Assurez-vous que le type OS inclut 'web'
import { useEnrollDeviceMutation } from './../react-query/queries/auth/authMutations';
import { PersistenceStorage } from './../storage/index'; // Supposé être un wrapper pour localStorage sur le web
import { KEYS } from './../storage/Keys';
import { useCallback, useEffect } from 'react';
import {
  NotificationDataType,
  notificationGateway,
} from './../lib/notificationGateway';

// --- Imports MODIFIÉS pour le SDK Web Firebase ---
import { getToken, onMessage } from 'firebase/messaging';
// On importe l'instance initialisée de messaging depuis votre fichier de configuration
import { messaging } from './../lib/firebase'; // Adaptez ce chemin si nécessaire

// Cette variable globale est conservée, son utilité reste la même.
let hasRegisteredNotifications = false;

export const useNotifications = () => {
  // --- Cet import n'est plus nécessaire, on utilisera l'API native du navigateur ---
  // import { usePermissions } from './usePermissions';
  // const { requestNotification } = usePermissions();

  const { mutate } = useEnrollDeviceMutation();

  const _saveDeviceToken = useCallback(
    async (registrationToken: string) => {
      // CHANGEMENT : La plateforme est maintenant 'web'
      const os: OS = 'web';
      mutate({ os, registrationToken });
    },
    [mutate],
  );

  // Gérer les messages lorsque l'application est au premier plan (active tab)
  useEffect(() => {
    // La méthode onMessage du SDK web retourne une fonction de désinscription
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message reçu au premier plan: ', payload);
      // On suppose que le format des données custom est le même
      notificationGateway(payload.data as NotificationDataType);
    });

    return unsubscribe; // On retourne la fonction pour le cleanup de l'effet
  }, []);

  // NOTE IMPORTANTE : La méthode onTokenRefresh n'a pas d'équivalent direct sur le web.
  // La stratégie recommandée est de simplement appeler getToken() à chaque chargement
  // de l'application. Firebase gère le rafraîchissement en interne.
  // Ce useEffect est donc supprimé.

  const setNotifications = async () => {
    if (hasRegisteredNotifications) return;

    // Étape 1 : On utilise l'API native du navigateur pour demander la permission
    const permission = await Notification.requestPermission();
    const token = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);

    // On vérifie si la permission est 'granted'
    if (permission === 'granted' && token) {
      try {
        // Étape 2 : On obtient le token FCM avec la clé VAPID
        const registrationToken = await getToken(messaging, {
          // **ACTION REQUISE** : Vous devez fournir votre clé VAPID ici.
          // Elle se trouve dans la Console Firebase > Paramètres du projet > Cloud Messaging > Configuration Web.
          vapidKey: 'VOTRE_CLE_PUBLIQUE_VAPID_ICI',
        });

        if (registrationToken) {
          _saveDeviceToken(registrationToken);
          hasRegisteredNotifications = true;
        } else {
          console.log('[FIREBASE] Pas de token disponible. La permission a-t-elle été demandée ?');
        }
      } catch (error) {
        console.error('[FIREBASE] Une erreur est survenue lors de la récupération du token:', error);
      }
    } else {
      console.log('[NOTIFICATIONS] Permission non accordée ou utilisateur non connecté.');
    }
  };

  return { setNotifications };
};