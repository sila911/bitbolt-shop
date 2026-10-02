import { X, Trash2, CreditCard, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CartDrawer({ isOpen, cart, onClose, onUpdateQuantity, onRemove, subtotal, onCheckout, isCheckingOut }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md z-[200] flex justify-end transition-all duration-300" onClick={onClose}>
      <div 
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-neutral-950 w-full max-w-full sm:max-w-md h-full flex flex-col shadow-2xl relative"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 flex justify-between items-center border-b border-neutral-100 dark:border-neutral-900">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight uppercase">Your Bag</h2>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{cart.length} Items</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 bg-neutral-100 dark:bg-neutral-900 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="Close bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center text-neutral-400 mb-4">
                <ShoppingBag size={24} />
              </div>
              <p className="text-base font-bold text-neutral-900 dark:text-white">Your bag is empty</p>
              <p className="text-xs text-neutral-400 mt-1 mb-6">Explore the collection and add items to your bag.</p>
              <button 
                onClick={() => {
                  onClose();
                  navigate("/shop");
                }}
                className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-4 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 group hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors border border-neutral-200/60 dark:border-neutral-800"
              >
                <div 
                  onClick={() => {
                    onClose();
                    navigate(`/product/${item.id}`);
                  }}
                  className="w-18 h-18 sm:w-20 sm:h-20 flex-shrink-0 bg-white dark:bg-neutral-800 rounded-xl overflow-hidden p-1.5 cursor-pointer"
                >
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform" />
                </div>
                
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <div 
                      onClick={() => {
                        onClose();
                        navigate(`/product/${item.id}`);
                      }}
                      className="min-w-0 cursor-pointer"
                    >
                      <h3 className="font-bold text-xs uppercase tracking-tight text-neutral-900 dark:text-white truncate hover:underline">{item.title}</h3>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider truncate">{item.brand || item.category?.replace('-', ' ')}</p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-neutral-300 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-end pt-1">
                    <div className="flex items-center bg-white dark:bg-neutral-800 rounded-lg p-0.5 border border-neutral-200/60 dark:border-neutral-700">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <p className="text-sm font-black text-neutral-900 dark:text-white">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-neutral-100 dark:border-neutral-900 space-y-4 bg-white dark:bg-neutral-950">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">
                <span>Subtotal</span>
                <span className="text-neutral-900 dark:text-white">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">
                <span>Shipping</span>
                <span className="text-green-600 dark:text-green-400 font-bold">Free</span>
              </div>
              <div className="flex justify-between text-base font-black text-neutral-900 dark:text-white pt-2 border-t border-neutral-100 dark:border-neutral-900">
                <span>Total</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              disabled={isCheckingOut}
              className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md disabled:opacity-50"
            >
              {isCheckingOut ? (
                <>Processing...</>
              ) : (
                <>
                  Checkout
                  <ArrowRight size={14} />
                </>
              )}
            </button>
            
            <p className="text-center text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <CreditCard size={12} />
              Secure Checkout • Telegram Dispatch
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
