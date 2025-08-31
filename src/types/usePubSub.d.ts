import '@videosdk.live/react-native-sdk';

declare module '@videosdk.live/react-native-sdk' {
  export function usePubSub(
    topic: string,
    {
      onMessageReceived,
      onOldMessagesReceived,
    }?: {
      onMessageReceived?: (message: {
        id: string;
        message: string;
        senderId: string;
        senderName: string;
        timestamp: string;
        topic: string;
        payload: { profilePicture?: string | null; createdAt: string };
      }) => void;
      onOldMessagesReceived?: (
        messages: Array<{
          id: string;
          message: string;
          senderId: string;
          senderName: string;
          timestamp: string;
          topic: string;
          payload: { profilePicture?: string | null; createdAt: string };
        }>,
      ) => void;
    },
  ): {
    publish: (
      message: string,
      {
        persist,
        sendOnly,
      }: {
        persist: boolean;
        sendOnly: Array<string>;
      },
      payload: { profilePicture?: string | null; createdAt: string },
    ) => void;
    messages: Array<{
      id: string;
      message: string;
      senderId: string;
      senderName: string;
      timestamp: string;
      topic: string;
      payload: { profilePicture?: string | null; createdAt: string };
    }>;
  };
}
