import React, { memo, CSSProperties } from 'react';

// Define the props for our web-based component.
interface Point {
  x: number;
  y: number;
}

// By extending React's HTMLAttributes, our component can now accept standard
// props like `className`, `id`, `onClick`, etc., which is essential.
interface MCLinearGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  colors: string[];
  start?: Point;
  end?: Point;
  locations?: number[];
  angle?: number; // <-- 1. ADDED THE 'angle' PROP HERE
  // The 'style' and 'children' props are already included in HTMLAttributes
}

/**
 * A utility function to convert start/end points to a CSS angle.
 */
const getAngleFromPoints = (start: Point, end: Point): string => {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const radians = Math.atan2(deltaX, -deltaY);
  const degrees = radians * (180 / Math.PI);
  return `${degrees}deg`;
};

/**
 * A utility function to combine colors and locations into a CSS color-stop list.
 */
const getColorStops = (colors: string[], locations?: number[]): string => {
  return colors
    .map((color, index) => {
      if (locations && locations[index] !== null) {
        return `${color} ${locations[index] * 100}%`;
      }
      return color;
    })
    .join(', ');
};

export const MCLinearGradient = memo(
  ({
    colors,
    start = { x: 0.5, y: 0 },
    end = { x: 0.5, y: 1 },
    locations,
    style,
    children,
    angle, // <-- 2. DESTRUCTURE THE 'angle' PROP
    ...restProps // Pass through className, id, onClick, etc.
  }: MCLinearGradientProps) => {

    // 3. ADDED LOGIC: Use the 'angle' prop if provided; otherwise, fall back to points.
    const direction = angle !== undefined ? `${angle}deg` : getAngleFromPoints(start, end);

    const colorStops = getColorStops(colors, locations);
    const gradientBackground = `linear-gradient(${direction}, ${colorStops})`;

    // 4. REVISED STYLING: Removed forced absolute positioning to make it reusable.
    const generatedStyles: CSSProperties = {
      ...style, // Use only the styles passed via props.
      background: gradientBackground,
    };

    return (
      <div style={generatedStyles} {...restProps}>
        {children}
      </div>
    );
  },
);