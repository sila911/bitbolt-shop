import { useState } from "react";
import { Minus, Add as Plus, Trash as Trash2, ArrowRight, Lock, Add as PlusIcon, CloseCircle as X } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function RightCartSidebar({
  cart: propCart,
  onUpdateQuantity: propOnUpdateQuantity,
  onRemove: propOnRemove,
  onAddToCart: propOnAddToCart,
  isOpen = false,
  onClose,
  isDrawer = false,
  isDesktopOpen = true,
  onCloseDesktop,
  allProducts = [],
}) {
  const navigate = useNavigate();
  const cartCtx = useCart();

  const cart = propCart ?? cartCtx?.cart ?? [];
  const onUpdateQuantity = propOnUpdateQuantity ?? cartCtx?.updateQuantity;
  const onRemove = propOnRemove ?? cartCtx?.removeFromCart;
  const onAddToCart = propOnAddToCart ?? cartCtx?.addToCart;

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(10);
  const [promoApplied, setPromoApplied] = useState(true);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = promoApplied ? Math.round(subtotal * (discountPercent / 100)) : 0;
  const total = Math.max(0, subtotal - discountAmount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
      setDiscountPercent(15);
    }
  };

  const recommendations = allProducts.length >= 2 ? allProducts.slice(0, 2) : [
    {
      id: 991,
      title: "Audio Studio Monitor",
      category: "Acoustics",
      price: 155.0,
      thumbnail: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 992,
      title: "Mechanical Switch Kit",
      category: "Peripherals",
      price: 49.99,
      thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=200",
    },
  ];



  const renderContent = (handleClose) => (
    <div className="flex flex-col h-full bg-zinc-950 border-l border-zinc-800 text-zinc-200 select-none">
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-zinc-850">
        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
          Current Order <span className="text-zinc-500 font-normal tabular-nums">({cartCount})</span>
        </h3>
        {handleClose && (
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {cart.length === 0 ? (
          <div className="text-center py-8 space-y-1">
            <p className="text-xs font-semibold text-zinc-400">Order queue is empty</p>
            <p className="text-[11px] text-zinc-600">Add hardware items to begin checkout.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900 border border-zinc-850 group"
              >
                <div
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center p-1 shrink-0 cursor-pointer overflow-hidden"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <h4
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="text-xs font-semibold text-zinc-100 truncate cursor-pointer hover:underline"
                  >
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider truncate">{item.brand || item.category || "Hardware"}</p>
                  <p className="text-xs font-bold text-white tabular-nums">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5 bg-zinc-950 rounded-lg p-0.5 border border-zinc-800 text-xs">
                    <button
                      onClick={() => onUpdateQuantity?.(item.id, -1)}
                      className="w-5 h-5 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      aria-label="Decrease"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="w-4 text-center font-semibold text-[11px] tabular-nums text-zinc-300">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity?.(item.id, 1)}
                      className="w-5 h-5 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      aria-label="Increase"
                    >
                      <Plus size={10} />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemove?.(item.id)}
                    className="p-1 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Promo code */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Discount code"
            className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-zinc-600 px-3 py-2 rounded-xl text-xs font-medium outline-none text-zinc-100 placeholder:text-zinc-500 transition-colors"
          />
          <button
            onClick={handleApplyPromo}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer"
          >
            Apply
          </button>
        </div>

        {/* Summary */}
        <div className="space-y-1.5 pt-2 border-t border-zinc-850 text-xs font-medium">
          <div className="flex justify-between text-zinc-400">
            <span>Subtotal</span>
            <span className="text-zinc-200 font-semibold tabular-nums">${subtotal.toFixed(2)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-rose-400">
              <span>Promo applied</span>
              <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-zinc-400">
            <span>Shipping</span>
            <span className="text-emerald-400 font-medium">Free</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-850">
            <span>Estimated Total</span>
            <span className="tabular-nums">${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          disabled={cart.length === 0}
          className="w-full bg-zinc-100 hover:bg-white text-zinc-950 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          <Lock size={12} />
          <span>Checkout ({cartCount})</span>
          <ArrowRight size={13} className="stroke-[2.5]" />
        </button>

        <div className="pt-3 border-t border-zinc-850 space-y-2.5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Recommended Hardware</h4>
          <div className="space-y-2">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="flex items-center justify-between p-2 rounded-xl bg-zinc-900 border border-zinc-850 transition-colors group"
              >
                <div onClick={() => navigate(`/product/${rec.id}`)} className="flex items-center gap-2.5 min-w-0 cursor-pointer">
                  <img
                    src={rec.thumbnail}
                    alt={rec.title}
                    className="w-10 h-10 rounded-lg object-contain bg-zinc-950 p-1 shrink-0 border border-zinc-800"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-zinc-200 truncate group-hover:text-white">
                      {rec.title}
                    </p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider truncate">{rec.category}</p>
                    <p className="text-xs font-bold text-white tabular-nums">${rec.price.toFixed(2)}</p>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart?.(rec)}
                  className="w-6 h-6 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center border border-zinc-700/60 shrink-0 active:scale-90 transition-transform cursor-pointer"
                  aria-label={`Add ${rec.title}`}
                >
                  <PlusIcon size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Member spec card */}
        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white">Direct Telegram Dispatch</span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">
            Orders are formatted directly and transmitted to our dispatch desk via bot integration.
          </p>
        </div>
      </div>
    </div>
  );

  if (isDrawer) {
    if (!isOpen) return null;
    return (
      <div className="xl:hidden fixed inset-0 z-50 flex justify-end">
        <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />
        <div className="relative w-84 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-right duration-200">
          {renderContent(onClose)}
        </div>
      </div>
    );
  }

  return (
    <>
      {isDesktopOpen && (
        <aside className="hidden xl:block w-80 2xl:w-[350px] shrink-0 sticky top-0 h-screen z-20">
          {renderContent(onCloseDesktop || onClose)}
        </aside>
      )}

      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />
          <div className="relative w-84 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-right duration-200">
            {renderContent(onClose)}
          </div>
        </div>
      )}
    </>
  );
}
