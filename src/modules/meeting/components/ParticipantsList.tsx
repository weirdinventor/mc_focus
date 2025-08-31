import React, { JSX, memo, useEffect, useState } from 'react';

// --- Custom Component Imports ---
// This is assumed to be a web-compatible React component.
import { MemoizedParticipantCard } from '../../../components/Cards/ParticipantCard';

// --- [REMOVED] All React Native and native-specific library imports ---
// import { StyleSheet, View } from 'react-native';
// import { KeyboardEvents } from 'react-native-keyboard-controller';

interface ParticipantsListProps {
  small: boolean;
  participantIds: string[];
}

/**
 * A component that displays a list of participants. When in 'small' mode,
 * it intelligently hides itself when the on-screen keyboard is visible on mobile web.
 */
const ParticipantsList = ({ small, participantIds }: ParticipantsListProps): JSX.Element => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // --- [CHANGED] Replaced KeyboardEvents with the web's visualViewport API ---
  useEffect(() => {
    // This effect should only run if the component is in 'small' mode.
    if (!small) {
      return;
    }

    // The VisualViewport API is the web standard for detecting the on-screen keyboard.
    const visualViewport = window.visualViewport;

    // If the API isn't available (e.g., on a desktop browser), we don't need to do anything.
    if (!visualViewport) {
      return;
    }

    // This handler is called whenever the viewport resizes (e.g., when the keyboard appears/disappears).
    const handleResize = () => {
      // If the viewport's height is significantly less than the window's total height,
      // we can assume the keyboard is visible. A threshold (e.g., 150px) prevents false positives.
      const isKeyboardVisible = window.innerHeight - visualViewport.height > 150;
      setKeyboardVisible(isKeyboardVisible);
    };

    visualViewport.addEventListener('resize', handleResize);

    // Call it once initially to set the correct state when the component mounts.
    handleResize();

    // The cleanup function is crucial to prevent memory leaks.
    return () => {
      visualViewport.removeEventListener('resize', handleResize);
    };
  }, [small]); // The effect re-runs if the 'small' prop changes.

  return (
    // --- [CHANGED] <View> is replaced with a <div> ---
    <div
      style={{
        ...styles.participantsContainer,
        // The conditional styling logic remains the same.
        ...(keyboardVisible && styles.displayNone),
      }}
    >
      {/* The mapping logic is pure JavaScript and needs no changes. */}
      {participantIds.map((id) => (
        <MemoizedParticipantCard key={id} participantId={id} small={true} />
      ))}
    </div>
  );
};

// --- [UNCHANGED] React.memo is a standard React API and is preserved. ---
export const MemoizedParticipantList = memo(ParticipantsList);

// --- [CHANGED] StyleSheet.create is replaced with a standard JS object for CSS styles ---
const styles: { [key: string]: React.CSSProperties } = {
  participantsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '8px',
  },
  displayNone: {
    display: 'none',
  },
};