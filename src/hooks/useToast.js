import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import { goeyToast } from "goey-toast";

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export { goeyToast as toast };
