import type { CSSProperties } from 'react';
import { useCTheme } from './useCTheme'; // Assumes useCTheme is migrated/available

type InterpolateableStyles = 'color' | 'backgroundColor';

/**
 * A React hook for creating theme-aware animated styles using CSS transitions.
 * This hook maintains the same definition as its react-native-reanimated counterpart.
 *
 * @param {string} lightColor - The CSS color for the light theme.
 * @param {string} darkColor - The CSS color for the dark theme.
 * @param {InterpolateableStyles} [styleToInterpolate='backgroundColor'] - The CSS property to animate.
 * @returns An object containing `animatedStyle` to be applied to a component's style prop.
 */
export const useThemeInterpolation = (
  lightColor: string,
  darkColor: string,
  styleToInterpolate: InterpolateableStyles = 'backgroundColor',
) => {
  // 1. Get theme state internally, just like the original.
  const { isLightTheme } = useCTheme();

  // 2. Create the style object. It includes the target color and the transition property.
  // The browser will handle the animation automatically whenever the target color changes.
  const animatedStyle: CSSProperties = {
    // Set the target color based on the current theme state
    [styleToInterpolate]: isLightTheme ? lightColor : darkColor,

    // Define the CSS transition. The duration matches the original `withTiming` config.
    transition: `${styleToInterpolate} 250ms ease-in-out`,
  };

  // 3. Return the style object. When `isLightTheme` changes, the component re-renders,
  // this hook re-runs, a new style object is created, and React applies it.
  // The CSS transition handles the smooth animation between the old and new color.
  return { animatedStyle };
};