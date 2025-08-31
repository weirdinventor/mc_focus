import React, { JSX, useMemo } from 'react';
import { t } from '../i18n/i18n';
import { I18nKeyPath } from '../i18n/types';
import i18next from 'i18next';
import lang from 'i18n-js';

// Define types for props
export type WeightKeys = 'black' | 'extraBold' | 'bold' | 'medium' | 'light' | 'extraLight' | 'thin';
export type StylesKeys = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'huge' | 'massive';
export type TextSizes = StylesKeys | `${StylesKeys}_${WeightKeys}`;
 
export type TextColors = 'deepRed' | 'black' | 'white'| 'white80'  | 'gray' | 'primary' | 'grey5' | 'grey'|'pink700'|'pink'| 'grey9' | 'grey8'; // Customize as needed
 

export interface CustomTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  size?: TextSizes;
  color?: TextColors;
  textOptions?: lang.TranslateOptions;
  isCentered?: boolean;
  isActive?: boolean;
  mb?: number;
  mt?: number;
  flexed?: boolean;
  toUppercase?: boolean;
  // --- CHANGE 1: Add numberOfLines to the props interface ---
  numberOfLines?: number;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

/**
 * Custom Text Component (`CText`) for React JS
 */
export const CText = ({
  size = 'sm_medium',
  text,
  textOptions,
  isCentered,
  isActive,
  color = 'black',
  mb,
  mt,
  flexed,
  toUppercase,
  // --- CHANGE 2: Destructure the new numberOfLines prop ---
  numberOfLines,
  as: Component = 'span',
  ...textProps
}: CustomTextProps): JSX.Element => {
  const tText = useMemo(() => {
    if (text && i18next.exists(text)) {
      return t(text as I18nKeyPath, textOptions);
    }
    return null;
  }, [text, textOptions]);
  const content = tText || textProps.children;

  const weights = 'black|extraBold|bold|medium|light|extraLight|thin';
  const weightRegex = new RegExp(`_(${weights})$`);
  const weightMatch = size.match(weightRegex)?.[1] as WeightKeys | undefined;
  const fontSizeKey = (weightMatch ? size.replace(`_${weightMatch}`, '') : size) as StylesKeys;

  const classNames = useMemo(() => {
    const classes = ['ctext-base'];
    classes.push(`ctext-size-${fontSizeKey}`);
    if (weightMatch) classes.push(`ctext-weight-${weightMatch}`);
    if (color) classes.push(`ctext-color-${color}`);
    if (isCentered) classes.push('ctext-centered');
    if (flexed) classes.push('ctext-flexed');
    if (toUppercase) classes.push('ctext-uppercased');
    if (isActive) classes.push('ctext-active');
    if (textProps.className) classes.push(textProps.className);
    return classes.join(' ');
  }, [fontSizeKey, weightMatch, color, isCentered, flexed, toUppercase, isActive, textProps.className]);

  // --- CHANGE 3: Update inline styles to handle numberOfLines ---
  const inlineStyles: React.CSSProperties = useMemo(() => {
    const styles: React.CSSProperties = {};
    if (mb !== undefined) styles.marginBottom = `${mb}px`;
    if (mt !== undefined) styles.marginTop = `${mt}px`;

    // This block adds the CSS properties required for multi-line text truncation.
    if (numberOfLines && numberOfLines > 0) {
      styles.display = '-webkit-box';
      styles.WebkitLineClamp = numberOfLines; // React handles camelCase to `-webkit-line-clamp`
      styles.WebkitBoxOrient = 'vertical';
      styles.overflow = 'hidden';
      styles.textOverflow = 'ellipsis';
    }

    return { ...styles, ...textProps.style };
    // --- CHANGE 4: Add numberOfLines to the dependency array ---
  }, [mb, mt, numberOfLines, textProps.style]);

  return (
    <Component {...textProps} className={classNames} style={inlineStyles}>
      {content}
    </Component>
  );
};

//
/* Base Styles */
// .ctext-base {
//     font-family: 'CabinetGrotesk-Regular', sans-serif; /* Ensure the font is imported in your project */
//     margin: 0;
//     padding: 0;
//     display: inline-block; /* Default display */
//   }
  
//   /* Font Sizes */
//   .ctext-size-xxs { font-size: 10px; }
//   .ctext-size-xs { font-size: 12px; }
//   .ctext-size-sm { font-size: 14px; }
//   .ctext-size-md { font-size: 16px; }
//   .ctext-size-lg { font-size: 18px; }
//   .ctext-size-xl { font-size: 20px; }
//   .ctext-size-xxl { font-size: 24px; }
//   .ctext-size-xxxl { font-size: 32px; }
//   .ctext-size-huge { font-size: 48px; }
//   .ctext-size-massive { font-size: 54px; line-height: 1; }
  
//   /* Font Weights */
//   .ctext-weight-black { font-family: 'CabinetGrotesk-Black', sans-serif; }
//   .ctext-weight-extraBold { font-family: 'CabinetGrotesk-Extrabold', sans-serif; }
//   .ctext-weight-bold { font-family: 'CabinetGrotesk-Bold', sans-serif; }
//   .ctext-weight-medium { font-family: 'CabinetGrotesk-Medium', sans-serif; }
//   .ctext-weight-light { font-family: 'CabinetGrotesk-Light', sans-serif; }
//   .ctext-weight-extraLight { font-family: 'CabinetGrotesk-Extralight', sans-serif; }
//   .ctext-weight-thin { font-family: 'CabinetGrotesk-Thin', sans-serif; }
  
//   /* Colors */
//   /* It's recommended to use CSS variables for theming */
//   :root {
//     --color-text-black: #000000;
//     --color-text-white: #FFFFFF;
//     --color-text-gray: #808080;
//     --color-text-primary: #007bff;
//   }
  
//   .ctext-color-black { color: var(--color-text-black); }
//   .ctext-color-white { color: var(--color-text-white); }
//   .ctext-color-gray { color: var(--color-text-gray); }
//   .ctext-color-primary { color: var(--color-text-primary); }
  
  
//   /* Positional & Transformational Styles */
//   .ctext-centered {
//     text-align: center;
//   }
  
//   .ctext-flexed {
//     flex: 1;
//   }
  
//   .ctext-uppercased {
//     text-transform: uppercase;
//   }
  
//   /* Active State */
//   .ctext-active {
//     color: var(--color-text-black); /* Example active color */
//   }