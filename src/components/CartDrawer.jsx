import { CloseCircle as X, Trash as Trash2, Card as CreditCard, ShoppingBag, ArrowRight, Minus, Add as Plus } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useCart } from '../hooks/useCart';

export default function CartDrawer({
  isOpen,
  cart: propCart,
  onClose,
  onUpdateQuantity,
  onRemove,
  subtotal: propSubtotal,
  onCheckout,
  isCheckingOut,
}) {
  const navigate = useNavigate();
  const cartCtx = useCart();

  const cart = propCart ?? cartCtx?.cart ?? [];
  const subtotal = propSubtotal ?? cartCtx?.cartTotal ?? 0;
  const handleUpdate = onUpdateQuantity ?? cartCtx?.updateQuantity;
  const handleRemove = onRemove ?? cartCtx?.removeFromCart;
  const isDrawerOpen = isOpen !== undefined ? isOpen : cartCtx?.isCartOpen;
  const handleClose = onClose ?? (() => cartCtx?.setIsCartOpen?.(false));
  const handleCheckout = onCheckout ?? (() => {
    handleClose();
    navigate('/checkout');
  });

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          key="cart-drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 z-50 flex justify-end"
          onClick={handleClose}
        >
          <motion.div 
            key="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            className="bg-zinc-950 border-l border-zinc-800 text-zinc-100 w-full max-w-full sm:max-w-md h-full flex flex-col shadow-2xl relative"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 flex justify-between items-center border-b border-zinc-800">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Shopping Bag</h2>
                <p className="text-xs text-zinc-400 tabular-nums">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
              </div>
              <button 
                onClick={handleClose} 
                className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close bag"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 mb-3">
                    <ShoppingBag size={22} />
                  </div>
                  <p className="text-sm font-semibold text-white">Your bag is empty</p>
                  <p className="text-xs text-zinc-400 mt-1 mb-5">Explore our products and add items to your cart.</p>
                  <button 
                    onClick={() => {
                      handleClose();
                      navigate("/shop");
                    }}
                    className="bg-zinc-100 hover:bg-white text-zinc-950 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-sm"
                  >
                    Browse Catalog
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-3.5 p-3 rounded-xl bg-zinc-900 border border-zinc-850 hover:border-zinc-700 transition-colors"
                  >
                    <div 
                      onClick={() => {
                        handleClose();
                        navigate(`/product/${item.id}`);
                      }}
                      className="w-16 h-16 shrink-0 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden p-1 cursor-pointer flex items-center justify-center"
                    >
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div 
                          onClick={() => {
                            handleClose();
                            navigate(`/product/${item.id}`);
                          }}
                          className="min-w-0 cursor-pointer"
                        >
                          <h3 className="font-semibold text-xs text-white truncate hover:underline">{item.title}</h3>
                          <p className="text-[10px] text-zinc-400 uppercase tracking-wider truncate">{item.brand || item.category?.replace('-', ' ')}</p>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-zinc-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center bg-zinc-950 rounded-lg p-0.5 border border-zinc-800">
                          <button 
                            onClick={() => handleUpdate(item.id, -1)}
                            className="w-5 h-5 rounded flex items-center justify-center hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold tabular-nums text-zinc-200">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdate(item.id, 1)}
                            className="w-5 h-5 rounded flex items-center justify-center hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-white tabular-nums">
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
              <div className="p-5 sm:p-6 border-t border-zinc-800 space-y-4 bg-zinc-950">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="text-zinc-100 font-semibold tabular-nums">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Shipping</span>
                    <span className="text-emerald-400 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-850">
                    <span>Total</span>
                    <span className="tabular-nums">${subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-zinc-100 hover:bg-white text-zinc-950 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Proceed to Checkout
                      <ArrowRight size={14} className="stroke-[2.5]" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-[10px] text-zinc-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <CreditCard size={12} />
                  Secure Checkout • Telegram Dispatch
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
