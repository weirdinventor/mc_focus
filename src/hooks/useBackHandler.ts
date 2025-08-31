import { useEffect } from 'react';

/**
 * A React hook for the web that listens for the 'Escape' key press.
 * This is the most common and user-friendly web equivalent for React Native's `useBackHandler`,
 * which is typically used to dismiss modals or pop-ups.
 *
 * @param handler A function that is called when the Escape key is pressed.
 *                It should return `true` if the event was handled, which will
 *                prevent any other default actions for the Escape key.
 */
export function useEscapeKeyHandler(handler: () => boolean) {
  useEffect(() => {
    // Define the event listener function.
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the key pressed was 'Escape'.
      if (event.key === 'Escape') {
        // Call the provided handler function.
        const wasHandled = handler();
        
        // If the handler returns true, it signifies that it has taken control
        // of the event, so we prevent any default browser behavior.
        if (wasHandled) {
          event.preventDefault();
        }
      }
    };

    // Add the event listener to the entire document.
    document.addEventListener('keydown', handleKeyDown);

    // Return a cleanup function to remove the event listener when the component
    // that uses this hook unmounts. This is crucial for preventing memory leaks.
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handler]); // The effect re-runs if the handler function instance changes.
} 