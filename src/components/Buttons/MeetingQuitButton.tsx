import { useLayoutEffect } from 'react';
// 1. Import the specific icon you need from react-icons
import { IoExitOutline } from 'react-icons/io5';

import { CText } from '../../components/CText';
import { MCLinearGradient } from '../../components/MCLinearGradient';
import { Colors } from '../../constants/Colors';

// --- CSS Styles for the Component ---
const componentStyles = `
  .meeting-quit-container {
    /* Replicates container with gap */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .meeting-quit-button {
    /* Resets the default button appearance */
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  .meeting-quit-gradient {
    /* Replicates linearContainer */
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: 100px;
    /* Uses flexbox to center the icon inside */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .meeting-quit-icon {
    /* Replicates iconContainer */
    margin-left: 5px;
  }
`;

// A hook to inject styles into the document's <head> only once.
const useInjectStyles = (styleId: string, css: string) => {
  useLayoutEffect(() => {
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerText = css;
      document.head.appendChild(style);
    }
  }, [styleId, css]);
};

// --- Component Definition ---

interface MeetingQuitButtonProps {
  onPress: () => void;
}

export const MeetingQuitButton = ({ onPress }: MeetingQuitButtonProps) => {
  useInjectStyles('meeting-quit-button-styles', componentStyles);

  return (
    <div className="meeting-quit-container">
      {/* 2. Pressable is replaced by a <button> for web accessibility */}
      <button onClick={onPress} className="meeting-quit-button">
        <MCLinearGradient
          angle={70}
          colors={Colors.gradients.redExit}
          className="meeting-quit-gradient"
        >
          {/* 3. The react-native-easy-icon is replaced by the imported react-icons component */}
          <IoExitOutline
            className="meeting-quit-icon"
            size={28}
            color="white"
          />
        </MCLinearGradient>
      </button>

      {/* 4. CText works exactly the same */}
      <CText
        size="xs_medium"
        text="onboarding.mettingToolbar.quit"
        color="black"
      />
    </div>
  );
};