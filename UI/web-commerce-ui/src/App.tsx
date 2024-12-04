import { AuthContextProvider } from './context';
import { ThemeContextProvider } from './context/ThemeContext';
import { AppRoutes } from './routing';

function App() {
  return (
    <AuthContextProvider>
      <ThemeContextProvider defaultTheme="dark" storageKey="propat-ui-theme">
        <AppRoutes />
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
