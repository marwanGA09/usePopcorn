import { useContext } from 'react';
import { ContextProvider, ThemeContext } from './ContextProvider';

function LoginComponent() {
  console.log('Login component');
  const { theme, onToggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <p> Theme : {theme}</p>
      <button onClick={onToggleTheme}>change Theme</button>
      <h1>Hello man</h1>
    </div>
  );
}
function ContextApp() {
  console.log('constext app');
  return (
    <>
      <h1>Context app</h1>
      <ContextProvider>
        <LoginComponent />
      </ContextProvider>
    </>
  );
}

export default ContextApp;
