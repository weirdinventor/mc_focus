import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStreaming } from './../../hooks/useStreaming';
import { useGetMeQuery } from './../../react-query/queries/user/userQueries';
import { RootStackRoutes } from './../../navigators/routes';
import { MessageBubble } from './MessageBubble';

// The props interface remains the same, as it's just defining the data shape.
export interface MessagesListProps {
  allMessages: {
    id: string;
    message: string;
    senderId: string;
    senderName: string;
    timestamp: string;
    topic: string;
    payload: { profilePicture?: string | null; createdAt: string };
  }[];
}

export const MessagesList = ({ allMessages }: MessagesListProps) => {
  // Replace useNavigation with useNavigate from react-router-dom
  const navigate = useNavigate();

  const { adminParticipantIds } = useStreaming();
  const { data: me } = useGetMeQuery();

  const onIconPressHandler = (
    participant: MessagesListProps['allMessages'][0],
  ) => {
    const { senderId, senderName, payload } = participant;

    // Logic to prevent navigation remains the same
    if (senderId === me?.id || adminParticipantIds.includes(senderId)) {
      return;
    }

    // Navigate to a web-friendly URL, passing data via state
    // Note: RootStackRoutes.OTHER_USER_SCREEN should now resolve to a string path like '/user/:id'
    const userProfileUrl = `/user/${senderId}`; // Example URL
    navigate(userProfileUrl, {
      state: {
        username: senderName,
        profilePicture: payload.profilePicture,
        createdAt: payload.createdAt,
      },
    });
  };

  return (
    // Use a <div> instead of FlatList. The styles replicate the "inverted" list behavior.
    <div style={styles.container}>
      {allMessages.map((item) => (
        <MessageBubble
          // Use the message's unique 'id' for the key
          key={item.id}
          onIconPress={() => onIconPressHandler(item)}
          profilePicture={item.payload?.profilePicture}
          username={item.senderName}
          text={item.message}
        />
      ))}
    </div>
  );
};

// Styles are now a plain JavaScript object for CSS-in-JS styling
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    flex: 1, // Makes the div take up available space in a flex container
    display: 'flex',
    flexDirection: 'column-reverse', // This is key to mimicking the 'inverted' FlatList
    gap: '24px',
    padding: '24px',
    overflowY: 'auto', // Allows scrolling through messages
  },
};