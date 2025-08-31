import { useLayoutEffect } from 'react';
// 1. Import the specific icon from the Font Awesome collection in react-icons
import { FaPlay } from 'react-icons/fa';
import { Colors } from '../../constants/Colors';

// --- CSS Styles for the Component ---
const componentStyles = `
  .play-button-container {
    /* Sizing and Shape */
    width: 48px;
    height: 48px;
    border-radius: 24px; /* Creates a perfect circle */
    overflow: hidden;

    /* Layout for children (overlay and icon) */
    position: relative; /* Crucial for containing the absolute overlay */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .play-button-overlay {
    /* Replicates StyleSheet.absoluteFillObject */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    
    /* Appearance */
    background-color: ${Colors.black};
    opacity: 0.6;
  }

  .play-button-icon {
    /* Replicates iconWrapper */
    padding-left: 4px;

    /* Ensure the icon is visually on top of the overlay */
    z-index: 1;
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

export const PlayButton = () => {
  useInjectStyles('play-button-styles', componentStyles);

  return (
    // 2. The root View becomes a div.
    <div className="play-button-container">
      {/* 3. The blackOverlay View also becomes a div. */}
      <div className="play-button-overlay" />

      {/* 4. The Icon is replaced with the imported FaPlay component. */}
      <FaPlay
        className="play-button-icon"
        size={16}
        color={Colors.white}
      />
    </div>
  );
};