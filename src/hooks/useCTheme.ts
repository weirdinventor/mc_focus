import { useContext } from 'react';
import { ThemeContext } from './../context/ThemeContext';

export const useCTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLightTheme = theme === 'light';

  return { isLightTheme, toggleTheme };
};
