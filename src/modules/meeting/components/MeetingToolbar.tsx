import React, { JSX } from 'react';

// --- Custom Component Imports ---
import { MeetingToolbarButton } from '../../../components/Buttons/MeetingToolbarButton';

// --- SDK Hook Import ---
import { useMeeting } from '@videosdk.live/react-sdk';

// --- Define the component's props interface ---
interface MeetingToolbarProps {
  /**
   * A callback function to be called when the user clicks the chat button.
   * The parent component is responsible for handling the sheet's visibility.
   */
  onOpenChat: () => void;
}

/**
 * A toolbar for the meeting UI. It's now a "dumb" component that receives
 * an `onOpenChat` function from its parent to trigger the chat sheet.
 */
export const MeetingToolbar = ({ onOpenChat }: MeetingToolbarProps): JSX.Element => {
  const { toggleMic, localMicOn } = useMeeting();

  return (
    // Converted to web-native <div> elements
    <div style={styles.container}>
      <MeetingToolbarButton
        onPress={() => toggleMic()}
        iconName={localMicOn ? 'mic-outline' : 'mic-off-outline'}
        iconType="ionicon"
        text="onboarding.mettingToolbar.micAuth"
      />
      <div style={styles.rightWrapper}>
        <MeetingToolbarButton
          // Calls the function received from its parent component
          onPress={onOpenChat}
          iconName="chatbubbles-outline"
          iconType="ionicon"
          text="onboarding.mettingToolbar.messages"
        />
      </div>
    </div>
  );
};

// --- Converted to standard CSS-in-JS styles ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
  },
  rightWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
  },
};