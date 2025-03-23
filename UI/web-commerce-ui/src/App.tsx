import { Toaster } from '@/components/ui/toaster';
import { AuthContextProvider } from './context';
import { ThemeContextProvider } from './context/ThemeContext';
import { AppRoutes } from './routing';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthContextProvider>
      <ThemeContextProvider defaultTheme="dark" storageKey="propat-ui-theme">
        <CartProvider>
          <AppRoutes />
          <Toaster />
        </CartProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
