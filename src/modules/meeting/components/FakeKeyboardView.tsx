import React, { useState, useEffect, JSX } from 'react';

// The props interface is identical to the original component.
interface FakeKeyboardViewProps {
  heightManipulation?: number;
}

/**
 * A web-compatible component that creates a spacer element that adjusts its 
 * height to match the on-screen keyboard on mobile web browsers, pushing content up.
 * This component has no visual effect on desktop browsers.
 *
 * It replaces `useReanimatedKeyboardAnimation` with the web's VisualViewport API.
 * It replaces `<Animated.View>` with a `<div>` styled with a CSS transition.
 */
export const FakeKeyboardView = ({
  heightManipulation = -24,
}: FakeKeyboardViewProps): JSX.Element => {
  // State to hold the calculated height of the on-screen keyboard.
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    // The VisualViewport API is the web's standard way to get information 
    // about the visible area, which is affected by on-screen keyboards.
    const visualViewport = window.visualViewport;

    // If the API isn't available (e.g., on older browsers or some desktop browsers), do nothing.
    if (!visualViewport) {
      return;
    }

    // This handler is called when the viewport resizes.
    const handleResize = () => {
      // The keyboard's height is the difference between the overall window height
      // and the visible part of it.
      const newHeight = window.innerHeight - visualViewport.height;

      // Only set a positive height. This ensures we're reacting to the keyboard
      // and not other resize events that might make the viewport larger.
      setKeyboardHeight(newHeight > 0 ? newHeight : 0);
    };

    // Listen for the 'resize' event on the visual viewport.
    visualViewport.addEventListener('resize', handleResize);

    // Call it once initially in case the keyboard is already open when the component loads.
    handleResize();

    // Cleanup function: It's crucial to remove the event listener when the 
    // component unmounts to prevent memory leaks.
    return () => {
      visualViewport.removeEventListener('resize', handleResize);
    };
  }, []); // The empty dependency array [] ensures this effect runs only on mount and unmount.

  // Calculate the final height for our spacer element, including the offset.
  // If the keyboard is not visible, the spacer's height will be 0.
  const finalHeight = keyboardHeight > 0 ? keyboardHeight + heightManipulation : 0;

  // This style object replaces `useAnimatedStyle`.
  // A CSS 'transition' is added to smoothly animate the height change,
  // mimicking the behavior of react-native-reanimated.
  const fakeViewStyle: React.CSSProperties = {
    height: `${finalHeight}px`,
    transition: 'height 0.25s ease-out',
  };

  // Render a simple div with the calculated style. This replaces `<Animated.View />`.
  return <div style={fakeViewStyle} />;
};