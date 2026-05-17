import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

export default function Toast({ id, title, message, tone = 'success', onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => onClose(id), 300) // Wait for exit animation
  }, [id, onClose])

  useEffect(() => {
    // Animation entry delay
    const timer = setTimeout(() => setIsVisible(true), 10)
    
    // Auto-dismiss after 5 seconds
    const dismissTimer = setTimeout(() => {
      handleClose()
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(dismissTimer)
    }
  }, [handleClose])

  const icons = {
    success: <CheckCircle2 size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    info: <Info size={20} className="text-blue-500" />
  }

  const borders = {
    success: 'border-green-500/20',
    error: 'border-red-500/20',
    info: 'border-blue-500/20'
  }

  return (
    <div 
      className={`group pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border bg-white dark:bg-neutral-900/95 backdrop-blur-md shadow-2xl transition-all duration-500 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${borders[tone]} ${tone === 'success' ? 'border-green-500/20' : tone === 'error' ? 'border-red-500/20' : 'border-blue-500/20'}`}
    >
      <div className="p-4 flex items-start gap-4 relative">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          tone === 'success' ? 'bg-green-500/10' : tone === 'error' ? 'bg-red-500/10' : 'bg-blue-500/10'
        }`}>
          {icons[tone]}
        </div>

        <div className="flex-1 min-w-0 pr-6">
          <h4 className="text-[10px] font-black text-neutral-900 dark:text-white uppercase tracking-widest truncate mb-1">
            {title}
          </h4>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed line-clamp-2">
            {message}
          </div>
        </div>

        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 rounded-md text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      </div>
      
      {/* Progress Bar Animation */}
      <div className="absolute bottom-0 left-0 h-[3px] bg-neutral-100 dark:bg-white/5 w-full overflow-hidden">
        <div 
          className={`h-full ${
            tone === 'success' ? 'bg-green-500' : tone === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
          style={{
            animation: 'toast-progress 5s linear forwards'
          }}
        />
      </div>
    </div>
  )
}
