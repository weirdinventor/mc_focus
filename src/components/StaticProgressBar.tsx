import React from 'react';

// --- Mock Constants (replace with your actual color values) ---
const Colors = {
  grey1: '#f0f0f0',
  gradients: {
    main: ['#6DD5FA', '#2980B9'], // Example gradient colors
  },
};

// --- Styles to be injected, replacing StyleSheet ---
const componentStyles = `
  .progress-bar-container {
    height: 8px;
    width: 100%;
    overflow: hidden;
    background-color: ${Colors.grey1};
    border-radius: 12px;
  }

  .progress-bar-value {
    height: 100%;
    /* The border-radius on the inner bar ensures it looks smooth even without overflow:hidden */
    border-radius: 12px;
    /* We add a transition for a smooth animation when the value changes */
    transition: width 0.3s ease-in-out;
  }
`;

// --- Interface for React JS props ---
interface ProgressBarProps {
  value: number;
  maxValue: number;
  singleColor?: string;
  style?: React.CSSProperties; // Replaces StyleProp<ViewStyle>
  className?: string; // For custom CSS classes
}

/**
 * A static progress bar for React JS, using CSS for the gradient effect.
 */
export const StaticProgressBar = ({
  value,
  maxValue,
  singleColor,
  style,
  className,
}: ProgressBarProps) => {
  // Ensure value doesn't go below 0 or above maxValue
  const clampedValue = Math.max(0, Math.min(value, maxValue));
  const progressPercentage = (clampedValue / maxValue) * 100;

  // Determine the background style for the progress bar's inner element.
  // This replaces the MCLinearGradient component.
  const progressBarBackground = singleColor
    ? singleColor
    : `linear-gradient(90deg, ${Colors.gradients.main.join(', ')})`;

  // Dynamic styles for the inner progress element
  const progressBarStyle: React.CSSProperties = {
    width: `${progressPercentage}%`,
    background: progressBarBackground,
  };

  return (
    <>
      {/* Inject the styles into the document's head */}
      <style>{componentStyles}</style>

      {/* 
        The outer View becomes a div.
        We add ARIA attributes for better accessibility.
      */}
      <div
        className={`progress-bar-container ${className || ''}`}
        style={style}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={maxValue}
      >
        {/* The MCLinearGradient also becomes a div with a dynamic style */}
        <div className="progress-bar-value" style={progressBarStyle} />
      </div>
    </>
  );
};