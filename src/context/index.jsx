import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";
import { CartProvider } from "./CartContext";
import { FavoritesProvider } from "./FavoritesContext";

export * from "./ThemeContext";
export * from "./ToastContext";
export * from "./CartContext";
export * from "./FavoritesContext";

/**
 * Unified provider for the whole application
 */
export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
