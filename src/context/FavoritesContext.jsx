import { createContext, useContext, useEffect, useState } from "react";
import { ToastContext } from "./ToastContext";
import { getStorage, setStorage } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";

export const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const toastCtx = useContext(ToastContext);
  const addToast = toastCtx?.addToast;

  const [favorites, setFavorites] = useState(() => getStorage(STORAGE_KEYS.FAVORITES, []));
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  useEffect(() => {
    setStorage(STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  const toggleFavorite = (productOrId) => {
    const id = typeof productOrId === "object" ? productOrId.id : productOrId;

    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === id);
      if (exists) {
        addToast?.("Wishlist Updated", "Item removed from your wishlist.", "info");
        return prev.filter((item) => item.id !== id);
      } else {
        const found = typeof productOrId === "object" ? productOrId : { id, title: `Product #${id}`, price: 0 };
        addToast?.("Saved to Wishlist", "Item added to your wishlist.", "success");
        return [...prev, found];
      }
    });
  };

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        toggleFavorite,
        isFavorite,
        isFavoritesOpen,
        setIsFavoritesOpen,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
