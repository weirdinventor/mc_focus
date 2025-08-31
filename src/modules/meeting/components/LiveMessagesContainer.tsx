import React, { JSX } from 'react';
// --- Custom Component Imports ---
import { MessagesList, MessagesListProps } from '../../../components/Chat/MessagesList'; // Import the props type
import { MessagesToolbar } from '../../../components/Chat/MessagesToolbar';
// --- Hooks and State Management ---
import { useGetMeQuery } from '../../../react-query/queries/user/userQueries';
import { usePubSub } from '@videosdk.live/react-sdk';

// --- [FIX] Define the specific message type that your application uses ---
// This type should match the `allMessages` prop in MessagesListProps.
type ChatMessage = MessagesListProps['allMessages'][0];

export const LiveMessagesContainer = (): JSX.Element => {
  // The usePubSub hook returns messages with a generic payload.
  const { publish, messages: genericMessages } = usePubSub('CHAT', {});

  // The useGetMeQuery hook from react-query is platform-agnostic.
  const { data: me } = useGetMeQuery();

  const sendMessage = (message: string) => {
    if (me) {
      // The payload you are sending matches the expected shape.
      const payload = { profilePicture: me?.profilePicture, createdAt: me.createdAt };
      publish(message, { persist: true }, payload);
    }
  };

  // --- [FIX] Assert the type of the messages array here ---
  // We are telling TypeScript to treat the generic array as our specific ChatMessage array.
  const messages = genericMessages as ChatMessage[];

  return (
    // The component structure is already web-compatible.
    <div style={styles.container}>
      {/* Now, the 'messages' variable perfectly matches the expected 'allMessages' prop type. */}
      {messages.length > 0 ? <MessagesList allMessages={messages} /> : null}

      <MessagesToolbar onSendMessage={sendMessage} />
    </div>
  );
};

// --- Styling ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginTop: '16px',
  },
};