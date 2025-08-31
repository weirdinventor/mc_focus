import  { ReactNode, useEffect, useState } from 'react';
import { KEYS } from './../storage/Keys';
import { PersistenceStorage } from './../storage/index';
import { ThemeContext, AvailableThemes } from './ThemeContext'; // Import from your new file

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<AvailableThemes>('light');

  // Load the saved theme from storage on initial render
  useEffect(() => {
    const getTheme = () => {
      const savedTheme = PersistenceStorage.getItem(KEYS.THEME);
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme as AvailableThemes);
      }
    };

    getTheme();
  }, []);

  // Function to toggle and save the new theme
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      PersistenceStorage.setItem(KEYS.THEME, newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};