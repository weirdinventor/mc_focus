import { Colors } from './../../constants/Colors';
import React from 'react';
import { MessageInput } from './MessageInput';

// Define the props interface with web-specific types (React.CSSProperties)
interface MessagesToolbarProps {
  onSendMessage: (message: string) => void;
  style?: React.CSSProperties;
}

export const MessagesToolbar = ({
  onSendMessage,
  style,
}: MessagesToolbarProps) => {
  // The onSend handler trims the message before passing it up, which is good practice.
  const handleSend = (message: string) => {
    // Ensure the message is not just empty spaces before sending
    if (message.trim()) {
      onSendMessage(message.trim());
    }
  };

  // We use a <div> instead of a <View>.
  // The style prop merges the default styles from the styles object with any passed-in style prop.
  return (
    <div style={{ ...styles.container, ...style }}>
      <MessageInput onSendMessage={handleSend} />
    </div>
  );
};

// Styles are now a plain JavaScript object.
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex', // Added display: 'flex' to replicate <View> behavior
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: Colors.white,
    padding: '16px',
    // On the web, a top border is common for toolbars for visual separation
    borderTop: '1px solid #f0f0f0',
  },
};