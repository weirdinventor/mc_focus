import  {  useLayoutEffect } from 'react';
import { CText } from '../../components/CText';
import { MCLinearGradient } from '../../components/MCLinearGradient';
import { Colors } from '../../constants/Colors';
import { useButtonState } from '../../hooks/useButtonState';
import { I18nKeyPath } from '../../i18n/types';

// --- CSS Styles for the Component ---
const componentStyles = `
  .chip-button-base {
    /* Reset button defaults */
    border: none;
    padding: 0;
    background-color: transparent;
    
    /* Layout */
    align-self: center;
    display: inline-flex; /* Important for self-sizing */

    /* Interactivity */
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  /* The gradient container needs the border-radius and padding */
  .chip-linear-container {
    display: flex; /* Use flex to center the text child */
    justify-content: center;
    align-items: center;
    width: auto;
    border-radius: 50px;
    padding: 7px 16px;
  }

  .chip-base-text {
    flex-grow: 0;
    text-align: center;
  }
`;

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

const GRADIENT_COLOR: Record<ChipTypes, string[]> = {
  colored: Colors.gradients.main,
  premium: Colors.gradients.premium,
};

type ChipTypes = 'colored' | 'premium';

interface ChipButtonProps {
  type: ChipTypes;
  text?: I18nKeyPath;
  onChipPress: () => void;
}

export const ChipButton = ({ text, type, onChipPress }: ChipButtonProps) => {
  useInjectStyles('chip-button-styles', componentStyles);

  // Correctly use the web version of useButtonState
  const { buttonProps } = useButtonState();

  return (
    <button
      onClick={onChipPress}
      {...buttonProps} // Spread the onMouseDown/Up handlers
      className="chip-button-base"
    >
      <MCLinearGradient
        angle= {type === 'colored' ? 90 : 60}
        className="chip-linear-container"
        colors={GRADIENT_COLOR[type]}
      >
        <CText
          size="sm_bold"
          text={text}
          className="chip-base-text"
          color="white"
        />
      </MCLinearGradient>
    </button>
  );
};