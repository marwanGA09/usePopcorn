import { createContext, useMemo, useState } from 'react';

const ThemeContext = createContext();

function ContextProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const onToggleTheme = (prev) => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const themeValue = useMemo(() => ({ theme, onToggleTheme }), [theme]);
  console.log('context provider');

  return (
    <>
      <ThemeContext.Provider value={themeValue}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}

export { ContextProvider, ThemeContext };
