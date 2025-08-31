import React, { useMemo } from 'react';

// --- Mock Constants (replace with your actual color values) ---
const Colors = {
  primaryBlack: '#333333',
};

// --- Interface for React JS props ---
// We add standard web props like className and an updated style type.
interface SeperatorProps {
  size?: number | `${number}%` | string; // Widened string type for units like 'em', 'rem'
  color?: string;
  depth?: number;
  direction?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties; // Allow overriding styles
}

/**
 * A simple separator component for React JS, using a div and dynamic styles.
 */
export const Separator = ({
  color = Colors.primaryBlack,
  direction = 'horizontal',
  depth = 1,
  size = '100%',
  className,
  style,
}: SeperatorProps) => {
  // The useMemo hook is preserved, as it's standard React.
  const separatorStyle = useMemo(() => {
    // Helper function to add 'px' to numeric values for CSS compatibility.
    const formatValue = (value: number | string) =>
      typeof value === 'number' ? `${value}px` : value;

    // The core styling logic remains the same.
    const dynamicStyles: React.CSSProperties = {
      backgroundColor: color,
      flexShrink: 0, // Prevent the separator from shrinking in a flex container
      ...(direction === 'vertical'
        ? { height: formatValue(size), width: formatValue(depth) }
        : { width: formatValue(size), height: formatValue(depth) }),
    };
    
    // Combine calculated styles with any passed-in styles
    return { ...dynamicStyles, ...style };
  }, [color, direction, depth, size, style]);

  return (
    <div
      data-testid="separator" // testID becomes data-testid for the web
      className={className}
      style={separatorStyle}
    />
  );
};