import Toast from './Toast'

export default function ToastManager({ toasts, removeToast }) {
  return (
    <div className="fixed top-24 right-4 z-[1000] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <Toast 
          key={toast.id} 
          {...toast} 
          onClose={removeToast} 
        />
      ))}
    </div>
  )
}
