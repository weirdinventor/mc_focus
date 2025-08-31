/**
 * Gets the screen dimensions in a web environment.
 * This is the web equivalent of React Native's `Dimensions.get('screen')`.
 *
 * It includes a check for `window` to ensure compatibility with
 * Server-Side Rendering (SSR), where `window` is not defined.
 *
 * @returns An object containing the screen width and height.
 */
export const getScreen = (): { width: number; height: number } => {
  // Check if the code is running in a browser environment
  if (typeof window !== 'undefined') {
    // window.screen provides the dimensions of the entire screen
    const { width, height } = window.screen;
    return { width, height };
  }

  // Return default values for SSR or non-browser environments
  return { width: 0, height: 0 };
};