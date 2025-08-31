import { useCTheme } from './useCTheme'; // Assuming this custom hook works on web

type InterpolateableStyles = 'color' | 'backgroundColor';

/**
 * A React hook for the web that returns a theme-dependent color style object.
 * The actual animation between colors should be handled via CSS transitions on the component.
 *
 * @param lightColor The hex or rgb color for the light theme.
 * @param darkColor The hex or rgb color for the dark theme.
 * @param styleToInterpolate The CSS property to apply the color to ('color' or 'backgroundColor').
 * @returns A style object (e.g., { backgroundColor: '#ffffff' }) for the current theme.
 */
export const useThemeColor = (
  lightColor: string,
  darkColor: string,
  styleToInterpolate: InterpolateableStyles = 'backgroundColor',
) => {
  // 1. Get the current theme state from your custom theme hook.
  const { isLightTheme } = useCTheme();

  // 2. Determine the correct color for the current theme.
  const currentColor = isLightTheme ? lightColor : darkColor;

  // 3. Return a standard React style object.
  const style = {
    [styleToInterpolate]: currentColor,
  };

  return { style };
};