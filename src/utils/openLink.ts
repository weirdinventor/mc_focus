/**
 * Opens a URL in a new browser tab.
 * This is the web equivalent of React Native's `Linking.openURL`.
 *
 * @param url The URL to open.
 */
export const openLink = (url: string): void => {
  try {
    // Check if running in a browser environment to avoid SSR errors
    if (typeof window !== 'undefined') {
      // window.open(url, '_blank') opens the URL in a new tab.
      // 'noopener' and 'noreferrer' are added for security best practices.
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  } catch (err) {
    // Log any errors that might occur, e.g., if called in a weird context.
    console.error('Failed to open link:', err);
  }
};