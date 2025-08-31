import { useState, useCallback } from 'react';

/**
 * A React hook for the web that tracks the pressed state of a button.
 * It provides an `isPressed` boolean and the necessary event handlers
 * to be spread onto a button element.
 *
 * This hook is designed to be used with CSS for visual transitions.
 */
export const useButtonState = () => {
  const [isPressed, setIsPressed] = useState(false);

  // Use useCallback to ensure these functions have a stable identity
  const handlePressIn = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  return {
    isPressed,
    // Provide the DOM event handlers directly
    buttonProps: {
      onMouseDown: handlePressIn,
      onMouseUp: handlePressOut,
      onMouseLeave: handlePressOut, // Handle case where user drags mouse away
      onTouchStart: handlePressIn,
      onTouchEnd: handlePressOut,
    },
  };
};