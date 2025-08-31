import React from 'react';
// Assuming CText is the React JS version we previously defined.
import { CText } from './CText';

// --- The styles that replace StyleSheet and Reanimated ---
// We use CSS pseudo-classes (:hover, :active) to handle press states.
const componentStyles = `
  .suggestion-chip {
    /* Reset button styles */
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left; /* Ensure text alignment is consistent */

    /* Container styles from StyleSheet */
    background-color: #FFFFFF; /* Colors.white */
    align-self: center;
    padding: 8px 16px; /* Replaces paddingVertical and paddingHorizontal */
    border-radius: 24px;

    /* Transition for smooth opacity change, replaces useButtonState */
    transition: opacity 0.2s ease-in-out;
  }

  /* State when the mouse is over the chip */
  .suggestion-chip:hover {
    opacity: 0.8;
  }

  /* State when the chip is being actively clicked */
  .suggestion-chip:active {
    opacity: 0.6;
  }
`;

// --- Interface for the component props ---
interface ChipProps {
  text: string;
  onClick: () => void; // Replaces onPress
  className?: string; // Optional prop for custom styling
}

/**
 * A clickable suggestion chip component for React JS.
 */
export const SuggestionChip = ({ text, onClick, className }: ChipProps) => {
  return (
    <>
      {/* Inject the component's styles into the DOM */}
      <style>{componentStyles}</style>

      {/* 
        A <button> is the semantically correct element for a clickable chip.
        It replaces AnimatedPressable.
      */}
      <button
        onClick={onClick}
        className={`suggestion-chip ${className || ''}`}
      >
        {/* Use the React JS version of CText */}
        <CText color="black" size="sm_medium">{`@${text}`}</CText>
      </button>
    </>
  );
};