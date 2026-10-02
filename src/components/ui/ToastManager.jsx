import Toast from "./Toast";
import { useToast } from "../../hooks/useToast";

export default function ToastManager({ toasts: propToasts, removeToast: propRemoveToast }) {
  const toastCtx = useToast();
  const toasts = propToasts ?? toastCtx?.toasts ?? [];
  const removeToast = propRemoveToast ?? toastCtx?.removeToast;

  const visibleToasts = toasts.slice(-2);

  return (
    <div className="fixed top-24 right-4 z-[1000] flex flex-col gap-3 pointer-events-none">
      {visibleToasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
}
