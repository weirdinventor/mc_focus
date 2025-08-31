import React, { CSSProperties } from 'react';
import { TOptions } from 'i18next';

// Assuming your Colors constants file is available at this path
import { Colors } from './../../constants/Colors';

// Import types and the previously converted TopHeaderBar component
import { I18nKeyPath } from './../../../src/i18n/types';
import { TopHeaderBar } from './TopHeaderBar';

interface TopHeaderProps {
  text?: I18nKeyPath;
  textOptions?: TOptions; // Changed from lang.TranslateOptions to TOptions
  withBackButton?: boolean;
  type: 'absolute' | 'static';
  withMessage?: boolean;
}

/**
 * Helper function to create a CSS linear-gradient string from colors and locations.
 * @param colors - An array of color strings (e.g., ['#ff0000', 'transparent']).
 * @param locations - An array of numbers (0 to 1) for color stops.
 * @returns A CSS background style string.
 */
const createGradientStyle = (colors: string[], locations: number[]): string => {
  const colorStops = colors
    .map((color, index) => `${color} ${locations[index] * 100}%`)
    .join(', ');
  // Assuming a top-to-bottom gradient, which is a common default
  return `linear-gradient(to bottom, ${colorStops})`;
};

export const TopHeader = ({
  text,
  textOptions,
  withBackButton,
  withMessage = true,
  type,
}: TopHeaderProps) => {
  // The `useSafeAreaInsets` hook is React Native specific and has been removed.
  // We use a fixed padding instead.

  if (type === 'absolute') {
    // We create the gradient style dynamically from the Colors constant
    const gradientStyle = {
      ...styles.gradientContainer,
      background: createGradientStyle(
        Colors.gradients.purpleTransparent,
        [0.5, 1],
      ),
    };

    return (
      <div style={styles.gradientWrapper}>
        <div style={gradientStyle}>
          <TopHeaderBar
            textOptions={textOptions}
            withBackButton={withBackButton}
            text={text}
            withMessage={withMessage}
          />
        </div>
      </div>
    );
  }

  if (type === 'static') {
    return (
      <div style={styles.container}>
        <TopHeaderBar
          textOptions={textOptions}
          withBackButton={withBackButton}
          text={text}
          withMessage={withMessage}
        />
      </div>
    );
  }

  return null;
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    zIndex: 10,
    backgroundColor: Colors.seance900,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    display: 'flex', // Added for justifyContent to work
    justifyContent: 'flex-end',
    paddingTop: 16, // Replaced `top + 16` with a fixed value
    paddingBottom: 32,
  },
  gradientWrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    top: 0, // Explicitly set top and left for absolute positioning
    left: 0,
  },
  gradientContainer: {
    position: 'relative',
    paddingTop: 16, // Replaced `top + 16` with a fixed value
    paddingBottom: 64,
  },
};