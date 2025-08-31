import { useState, useRef, useLayoutEffect } from 'react';

/**
 * A React hook for the web that automatically sets the CSS 'overflowY' property.
 * It disables scrolling ('hidden') if the content is shorter than the container,
 * and enables it ('auto') if the content is taller.
 * This is the web equivalent of a hook that would toggle 'scrollEnabled' in React Native.
 *
 * @returns An object containing:
 *  - `containerRef`: A ref to be attached to your scrollable container element (e.g., a <div>).
 *  - `style`: A style object with the calculated `overflowY` property to be applied to the container.
 */
export const useAutoOverflow = <T extends HTMLElement>() => {
  // The state now holds the CSS style object directly.
  const [style, setStyle] = useState<{ overflowY: 'auto' | 'hidden' }>({
    overflowY: 'auto', // Default to scrollable
  });

  const containerRef = useRef<T>(null);

  // useLayoutEffect is preferred here because it runs synchronously after all DOM mutations,
  // preventing any visual flicker that might occur if we used useEffect.
  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // A ResizeObserver is the most performant way to watch for size changes
    // on an element, including when its content causes its scrollHeight to change.
    const observer = new ResizeObserver(() => {
      // Compare the total height of the content (scrollHeight) with the visible height (clientHeight).
      const hasOverflow = element.scrollHeight > element.clientHeight;
      
      const newOverflowValue = hasOverflow ? 'auto' : 'hidden';

      // Only update the state if the overflow value has actually changed
      // to prevent unnecessary re-renders.
      setStyle(currentStyle => {
        if (currentStyle.overflowY !== newOverflowValue) {
          return { overflowY: newOverflowValue };
        }
        return currentStyle;
      });
    });

    // Start observing the container element.
    observer.observe(element);

    // The cleanup function is crucial to prevent memory leaks.
    return () => observer.disconnect();
  }, []); // The empty dependency array ensures this effect runs only once.

  return {
    containerRef,
    style,
  };
};