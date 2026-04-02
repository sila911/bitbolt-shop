import { X, Trash2, CreditCard } from 'lucide-react'

export default function CartDrawer({ isOpen, cart, onClose, onRemove, subtotal, onCheckout }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[rgba(53,32,102,0.38)] backdrop-blur-sm z-[9999] flex justify-end" onClick={onClose}>
      <div 
        onClick={e => e.stopImmediatePropagation()}
        className="glass w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[rgba(123,97,255,0.16)]"
      >
        <div className="p-8 flex justify-between items-center border-b border-[rgba(123,97,255,0.16)]">
          <h2 className="text-3xl font-semibold text-[var(--color-text)]">Your Cart</h2>
          <button onClick={onClose} className="text-[var(--color-primary)]"><X size={32} /></button>
        </div>

        <div className="flex-1 p-8 overflow-y-auto space-y-8">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-6xl mb-6">🛒</p>
              <p className="text-2xl text-[var(--color-muted)]">Cart is empty</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-5 glass p-4 rounded-3xl">
                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-2xl" />
                <div className="flex-1">
                  <p className="font-semibold text-[var(--color-text)]">{item.name}</p>
                  <p className="text-2xl font-bold">${item.price}</p>
                  <button
                    onClick={() => onRemove(i)}
                    className="mt-4 flex items-center gap-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} /> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-[rgba(123,97,255,0.16)]">
          <div className="flex justify-between text-3xl font-semibold mb-8">
            <span className="text-[var(--color-text)]">Subtotal</span>
            <span className="text-[var(--color-text)]">${subtotal}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full brand-gradient text-white py-6 rounded-3xl font-semibold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
          >
            <CreditCard size={24} />
            CHECKOUT — SEND TO TELEGRAM
          </button>
          <p className="text-center text-[var(--color-muted)] text-sm mt-6 cursor-pointer" onClick={onClose}>
            Continue shopping
          </p>
        </div>
      </div>
    </div>
  )
}