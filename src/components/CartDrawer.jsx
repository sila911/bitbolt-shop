import { X, Trash2, CreditCard, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartDrawer({ isOpen, cart, onClose, onRemove, subtotal, onCheckout, isCheckingOut }) {
  if (!isOpen) return null

  // Group by cartId to allow multiple of same item with unique removal, 
  // or group by ID if we wanted to increment quantity.
  // Using ID grouping for cleaner display in redesign
  const groupedCart = Object.values(
    cart.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = { ...item, quantity: 0, totalPrice: 0 }
      }
      acc[item.id].quantity += 1
      acc[item.id].totalPrice += item.price
      return acc
    }, {})
  )

  const totalSavings = cart.reduce((acc, item) => {
    const original = Math.round(item.price / (1 - item.discountPercentage / 100))
    return acc + (original - item.price)
  }, 0)

  return (
    <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md z-[200] flex justify-end" onClick={onClose}>
      <div 
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-neutral-950 w-full max-w-lg h-full flex flex-col shadow-2xl"
      >
        <div className="p-8 flex justify-between items-center border-b border-neutral-100 dark:border-neutral-900">
          <div>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">Your Bag</h2>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{cart.length} Items</p>
          </div>
          <button onClick={onClose} className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center text-4xl">
                🛍️
              </div>
              <div>
                <p className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">Your bag is empty</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Looks like you haven't added anything yet.</p>
              </div>
              <button 
                onClick={onClose}
                className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            groupedCart.map((item) => (
              <div key={item.id} className="flex gap-6 p-4 rounded-[2rem] bg-neutral-50 dark:bg-neutral-900/50 group hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                <div className="w-24 h-24 flex-shrink-0 bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden p-2">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-sm uppercase tracking-tight text-neutral-900 dark:text-white line-clamp-1">{item.title}</h3>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{item.brand}</p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-neutral-300 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-end">
                    <div className="flex items-center gap-3">
                       <span className="text-xs font-black text-neutral-900 dark:text-white">QTY: {item.quantity}</span>
                       {item.discountPercentage > 0 && (
                         <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">-{Math.round(item.discountPercentage)}%</span>
                       )}
                    </div>
                    <p className="text-xl font-black text-neutral-900 dark:text-white">${item.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-neutral-50 dark:bg-neutral-900/50 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-neutral-500">
                <span>Total Savings</span>
                <span className="text-red-500">-${totalSavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-2xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white">
                <span>Total</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              disabled={isCheckingOut}
              className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl disabled:opacity-50"
            >
              {isCheckingOut ? (
                <>PROCESSING...</>
              ) : (
                <>
                  Secure Checkout
                  <ArrowRight size={18} />
                </>
              )}
            </button>
            
            <p className="text-center text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <CreditCard size={12} />
              Telegram order dispatch enabled
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
