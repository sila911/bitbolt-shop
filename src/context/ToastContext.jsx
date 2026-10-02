import { createContext, useCallback } from "react";
import { goeyToast } from "goey-toast";

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const addToast = useCallback((title, message, tone = "success", dedupeKey = null) => {
    const options = {
      description: message,
      id: dedupeKey || undefined,
    };

    switch (tone) {
      case "error":
        return goeyToast.error(title, options);
      case "warning":
        return goeyToast.warning(title, options);
      case "info":
        return goeyToast.info(title, options);
      case "success":
      default:
        return goeyToast.success(title, options);
    }
  }, []);

  const removeToast = useCallback((id) => {
    goeyToast.dismiss(id);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toast: goeyToast }}>
      {children}
    </ToastContext.Provider>
  );
}
