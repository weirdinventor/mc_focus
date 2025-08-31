import React, { JSX } from 'react';

// --- [CHANGED] Icon library is replaced with a web standard (Feather Icons) ---
import { FiAirplay, FiUser } from 'react-icons/fi';

// --- Custom Component Imports (Assumed to be web-compatible) ---
import { InfoChip } from '../../../components/InfoChip';
import { LiveDot } from '../../../components/LiveDot';
import { MicrophoneBox } from '../../../components/MicrophoneBox';

// --- Constants Import ---
import { Colors } from '../../../constants/Colors';

// --- [REMOVED] React Native specific imports ---
// import { StyleSheet, View } from 'react-native';

interface VideoViewInfoProps {
  micOn: boolean;
  displayName: string;
  viewerCount: number;
}

/**
 * An overlay component for the VideoView that displays the speaker's name,
 * microphone status, and the number of viewers.
 */
export const VideoViewInfo = ({
  micOn,
  displayName,
  viewerCount,
}: VideoViewInfoProps): JSX.Element => {
  return (
    // --- [CHANGED] <View> is now a <div> ---
    <div style={styles.infoContainer}>
      {/* MicrophoneBox is a custom component, its usage remains the same */}
      <MicrophoneBox
        iconColor={Colors.white}
        backgroundColor={Colors.black40}
        size={26}
        iconSize={14}
        isMuted={!micOn}
      />
      
      {/* --- [CHANGED] <View> is now a <div> --- */}
      <div style={styles.chipsWrapper}>
        <InfoChip
          LeftAccessory={() => (
            // --- [CHANGED] 'Icon' is replaced with 'FiAirplay' from react-icons ---
            <FiAirplay size={14} color={Colors.white} />
          )}
          RightAccessory={() => <LiveDot dotColor={Colors.deepRed} />}
          text="common.customString"
          textOptions={{ value: displayName }}
        />
        <InfoChip
          LeftAccessory={() => (
            // --- [CHANGED] 'Icon' is replaced with 'FiUser' from react-icons ---
            <FiUser size={14} color={Colors.white} />
          )}
          text="live.viewing"
          textOptions={{ amount: viewerCount }}
        />
      </div>
    </div>
  );
};

// --- [CHANGED] StyleSheet is now a standard JS object for CSS-in-JS ---
const styles: { [key: string]: React.CSSProperties } = {
  infoContainer: {
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1, // Web equivalent of 'flex: 1' in a column layout
    // This container is designed to be an overlay, so we ensure it doesn't block clicks on the video itself
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none', // Allows clicks to pass through to the video behind it
  },
  chipsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '6px',
    // We re-enable pointer events only for the chips so they can be interactive if needed
    pointerEvents: 'auto', 
  },
};