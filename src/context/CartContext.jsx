import { createContext, useContext, useEffect, useState } from "react";
import { ToastContext } from "./ToastContext";
import { getStorage, setStorage } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const toastCtx = useContext(ToastContext);
  const addToast = toastCtx?.addToast;

  const [cart, setCart] = useState(() => getStorage(STORAGE_KEYS.CART, []));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutInfoOpen, setIsCheckoutInfoOpen] = useState(false);

  useEffect(() => {
    setStorage(STORAGE_KEYS.CART, cart);
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        addToast?.(
          "Quantity Updated",
          `Increased quantity for ${product.title}.`,
          "success",
          `cart-update-${product.id}`
        );
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      addToast?.(
        "Added to Cart",
        `${product.title} has been added to your collection.`,
        "success",
        `cart-add-${product.id}`
      );
      return [...prevCart, { ...product, quantity: 1, cartId: Date.now() }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    addToast?.("Item Removed", "Product removed from your collection.", "info", `cart-remove-${productId}`);
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutInfoOpen,
        setIsCheckoutInfoOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
