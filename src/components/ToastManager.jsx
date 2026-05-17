import Toast from './Toast'

export default function ToastManager({ toasts, removeToast }) {
  // Only show the last 2 toasts to keep the UI clean
  const visibleToasts = toasts.slice(-2);

  return (
    <div className="fixed top-24 right-4 z-[1000] flex flex-col gap-3 pointer-events-none">
      {visibleToasts.map((toast) => (
        <Toast 
          key={toast.id} 
          {...toast} 
          onClose={removeToast} 
        />
      ))}
    </div>
  )
}
