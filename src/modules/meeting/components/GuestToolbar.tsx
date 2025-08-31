import React, { JSX } from 'react';

// --- Child Component Import ---
// This component is already a web-compatible React component.
import { MeetingToolbarButton } from '../../../components/Buttons/MeetingToolbarButton';

// --- SDK Import ---
// The hook is now correctly imported from the web-specific '@videosdk.live/react-sdk'.
import { useMeeting } from '@videosdk.live/react-sdk'; 

// --- Component Definition ---

// interface GuestToolbarProps {}
// {}: GuestToolbarProps
export const GuestToolbar = (): JSX.Element => {
  // This hook provides the functions to control the meeting state.
  // The 'ts-expect-error' comment is kept from your original code.
  // eslint-disable-next-linetypescript-eslint/ban-ts-comment
  //ts-expect-error
  const { changeMode, localMicOn, toggleMic } = useMeeting();

  return (
    // A 'div' is used as the container, which is the standard web equivalent of a React Native 'View'.
    <div style={styles.container}>
      {/* --- Mic Toggle Button --- */}
      <MeetingToolbarButton
        onPress={() => toggleMic()}
        iconName={localMicOn ? 'mic-outline' : 'mic-off-outline'}
        iconType="ionicon"
        text="onboarding.mettingToolbar.micAuth"
        boxSize={38}
      />
      {/* --- Quit/Leave Button --- */}
      <MeetingToolbarButton
        // The 'changeMode' parameter is corrected from 'VIEWER' to 'RECV_ONLY',
        // which is the valid mode for a view-only participant in the web SDK.
        onPress={() => changeMode('RECV_ONLY')}
        iconName="exit-to-app"
        iconType="material-community"
        text="onboarding.mettingToolbar.quit"
        boxSize={38}
      />
    </div>
  );
};

// --- Styling ---
// 'StyleSheet.create' has been replaced with a standard JavaScript object.
// The keys are typed as strings and the values as React.CSSProperties for type safety.
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    // 'marginBlock' is the modern CSS equivalent of 'marginVertical'.
    marginBlock: '12px', 
  },
};