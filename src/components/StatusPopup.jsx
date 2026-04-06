import { CheckCircle2, AlertCircle } from 'lucide-react'

export default function StatusPopup({ isOpen, title, message, tone = 'success', onClose }) {
  if (!isOpen) return null

  const isSuccess = tone === 'success'

  return (
    <div className="fixed inset-0 bg-[rgba(53,32,102,0.35)] backdrop-blur-sm z-[10020] flex items-center justify-center px-4" onClick={onClose}>
      <div className="glass w-full max-w-md rounded-3xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          {isSuccess ? (
            <CheckCircle2 className="text-[var(--color-primary)]" size={22} />
          ) : (
            <AlertCircle className="text-red-400" size={22} />
          )}
          <h3 className="text-lg font-semibold text-[var(--color-text)]">{title}</h3>
        </div>
        <p className="text-sm text-[var(--color-muted)] mt-3 leading-relaxed">{message}</p>
        <div className="mt-5 flex justify-end">
          <button onClick={onClose} className="brand-gradient text-white px-5 py-2.5 rounded-2xl font-semibold">
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
