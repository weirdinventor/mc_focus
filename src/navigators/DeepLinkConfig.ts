
// import { RootStackParamList } from './stacks/RootNavigator';
// import { RootStackRoutes } from './routes';
// import { Linking } from 'react-native';
// import {NotificationDataType,notificationGateway,} from '../../src/lib/notificationGateway';
// import { CONSTANTS } from '../config/Configuration';
// import messaging from '@react-native-firebase/messaging';
// import { LinkingOptions } from '@react-navigation/native';
// export const deepLinkConfig: LinkingOptions<RootStackParamList> = {
//   prefixes: [CONSTANTS.DEEPLINK_PREFIX],
//   config: {
//     initialRouteName: RootStackRoutes.TAB_STACK,
//     screens: {
//       [RootStackRoutes.CHAT_SCREEN]: 'chat/:participant/:conversationId/:title',
//     },
//   },
//   async getInitialURL() {
//     const url = await Linking.getInitialURL();
//     if (typeof url === 'string') {
//       return url;
//     }

//     const message = await messaging().getInitialNotification();
//     const deeplinkURL = notificationGateway(
//       message?.data as NotificationDataType,
//     );
//     if (typeof deeplinkURL === 'string') {
//       return deeplinkURL;
//     }
//   },
//   subscribe(listener: (url: string) => void) {
//     const onReceiveURL = ({ url }: { url: string }) => listener(url);

//     const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

//     const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
//       const url = notificationGateway(
//         remoteMessage.data as NotificationDataType,
//       );
//       if (typeof url === 'string') {
//         listener(url);
//       }
//     });

//     return () => {
//       linkingSubscription.remove();
//       unsubscribe();
//     };
//   },
// };
