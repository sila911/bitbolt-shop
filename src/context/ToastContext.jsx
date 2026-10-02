import { createContext, useCallback, useState } from "react";

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((title, message, tone = "success", dedupeKey = null) => {
    const id = Date.now();

    setToasts((prev) => {
      const isDuplicate = prev.some((t) => {
        if (dedupeKey && t.dedupeKey === dedupeKey) return true;
        if (!dedupeKey && t.title === title && typeof t.message === "string" && t.message === message) return true;
        return false;
      });

      if (isDuplicate) return prev;
      return [...prev, { id, title, message, tone, dedupeKey }];
    });
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}
