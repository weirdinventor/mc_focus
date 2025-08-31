import { useState, useRef, useLayoutEffect, useCallback } from 'react';

// Define a type for the layout data, similar to React Native's LayoutRectangle.
// DOMRectReadOnly has more properties, but we'll stick to these for compatibility.
export interface ElementLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

// The initial state for the layout before the element has been measured.
const initialLayout: ElementLayout = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

/**
 * A React hook for the web that measures an element's size and position.
 * It returns a ref to attach to the element and its layout data.
 * This is the web equivalent of React Native's `useLayout` hook.
 *
 * @returns An object containing the element's layout and a ref to attach to it.
 */
export function useLayout<T extends HTMLElement>() {
  const [layout, setLayout] = useState<ElementLayout>(initialLayout);
  
  // We use a ref to hold a reference to the DOM node.
  const elementRef = useRef<T | null>(null);

  // useLayoutEffect runs synchronously after DOM mutations, which is perfect for measurements
  // to avoid a visual "flicker" where the element renders before its size is known.
  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // ResizeObserver is the modern API to efficiently watch for size changes on an element.
    const observer = new ResizeObserver(() => {
      // When the element resizes, we get its new bounding box.
      const rect = element.getBoundingClientRect();
      // Update our state with the new layout information.
      setLayout({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });
    });

    // Start observing the element.
    observer.observe(element);

    // Return a cleanup function to stop observing when the component unmounts.
    // This is crucial for preventing memory leaks.
    return () => observer.disconnect();
  }, []); // The empty dependency array ensures this effect runs only once.

  return {
    ref: elementRef,
    ...layout,
  };
}