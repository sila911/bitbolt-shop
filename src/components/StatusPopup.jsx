import { CheckCircle2, AlertCircle } from 'lucide-react'

export default function StatusPopup({ isOpen, title, message, tone = 'success', onClose }) {
  if (!isOpen) return null

  const isSuccess = tone === 'success'

  return (
    <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md z-[10020] flex items-center justify-center px-4 transition-all duration-300 animate-in fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl shadow-neutral-950/20 transform animate-in zoom-in-95 duration-300" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-6 ${
            isSuccess ? 'bg-green-50 dark:bg-green-500/10 text-green-500' : 'bg-red-50 dark:bg-red-500/10 text-red-500'
          }`}>
            {isSuccess ? (
              <CheckCircle2 size={32} />
            ) : (
              <AlertCircle size={32} />
            )}
          </div>
          
          <h3 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-2">{title}</h3>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-8">{message}</p>
          
          <button 
            onClick={onClose} 
            className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Great, Thanks
          </button>
        </div>
      </div>
    </div>
  )
}
