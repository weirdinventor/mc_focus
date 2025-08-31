import React, { CSSProperties } from 'react';

// --- Assuming these imports are correctly pathed for your ReactJS project ---
import { Colors } from './../../constants/Colors';
import { I18nKeyPath } from './../../../src/i18n/types';
import { t } from './../../../src/i18n'; // Using your i18next helper

interface BigStaticHeaderProps {
  title: string;
  description: I18nKeyPath;
  paddingT?: number;
  paddingB?: number;
}

export const BigStaticHeader = ({
  title,
  description,
  paddingT = 16,
  paddingB = 16,
}: BigStaticHeaderProps) => {
  // `useSafeAreaInsets` is removed as it's a React Native hook.

  // 1. Create the dynamic gradient style for the main container
  const gradientContainerStyle: CSSProperties = {
    ...styles.gradientContainer,
    paddingTop: paddingT, // We use the prop value directly
    paddingBottom: paddingB,
    // The gradient props are converted to a CSS background property
    background: `linear-gradient(170deg, ${Colors.gradients.mainDarker.join(', ')})`,
  };

  // 2. Styles for the text elements, derived from CText props
  const titleStyle: CSSProperties = {
    color: 'white',
    fontSize: '2.25rem', // xxxl
    fontWeight: 900,      // black
    margin: 0,
    padding: 0,
  };

  const descriptionStyle: CSSProperties = {
    color: 'white',
    fontSize: '0.875rem', // sm
    fontWeight: 500,       // medium
    margin: '8px 0 0 0', // Add a little space between title and description
    padding: 0,
  };

  return (
    <div style={gradientContainerStyle}>
      <div style={styles.textsContainer}>
        <h1 style={titleStyle}>{title}</h1>
        <p style={descriptionStyle}>{t(description)}</p>
      </div>
    </div>
  );
};

// 3. Styles converted to a CSS-in-JS object
const styles: { [key: string]: CSSProperties } = {
  gradientContainer: {
    position: 'relative',
    minHeight: 150,
    display: 'flex', // Added to allow flex properties on children
    flexDirection: 'column',
  },
  textsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexGrow: 1,
    padding: 24,
  },
};