// ThemeContext.ts

import { createContext, useContext } from 'react';

// 1. Define the types and the context itself
export type AvailableThemes = 'light' | 'dark';

interface ThemeContextType {
  theme: AvailableThemes;
  toggleTheme: () => void;
}

// 2. Create and export the context with a default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => console.warn('toggleTheme function is not yet available'),
});

// 3. Create and export a custom hook for easy consumption
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};