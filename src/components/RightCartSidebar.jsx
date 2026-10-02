import { useState } from "react";
import { Minus, Plus, Trash2, ArrowRight, Lock, Plus as PlusIcon, X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RightCartSidebar({
  cart = [],
  onUpdateQuantity,
  onRemove,
  onAddToCart,
  isOpen = false,
  onClose,
  isDrawer = false,
  allProducts = []
}) {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(10); // default 10% discount for demo or 0
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

  // Recommendations: products from allProducts or fallback curated items
  const recommendations = allProducts.length >= 2 ? allProducts.slice(0, 2) : [
    {
      id: 991,
      title: "Ray-Ban Wayfarer",
      category: "Classic Black",
      price: 155.00,
      thumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 992,
      title: "Nike Air Force 1 '07",
      category: "White",
      price: 109.99,
      thumbnail: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=200"
    }
  ];

  // Recently viewed items (thumbnails)
  const recentlyViewed = [
    { id: 1, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=150" },
    { id: 2, img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=150" },
    { id: 3, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=150" },
    { id: 4, img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=150" }
  ];

  const content = (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 border-l border-neutral-200/80 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 select-none">
      {/* Header */}
      <div className="p-5 pb-4 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80">
        <h3 className="text-base font-black text-neutral-900 dark:text-white">
          My Cart <span className="text-neutral-400 font-bold">({cartCount})</span>
        </h3>
        {isDrawer && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Main Scrollable Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
        {/* Cart Item List */}
        {cart.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <p className="text-sm font-bold text-neutral-500">Your bag is empty</p>
            <p className="text-xs text-neutral-400">Add some curated items to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 group"
              >
                <div 
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="w-14 h-14 rounded-xl bg-white dark:bg-neutral-800 flex items-center justify-center p-1 flex-shrink-0 cursor-pointer overflow-hidden"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <h5 
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="text-xs font-bold text-neutral-900 dark:text-white truncate cursor-pointer hover:underline"
                  >
                    {item.title}
                  </h5>
                  <p className="text-[10px] text-neutral-400 truncate">
                    {item.brand || item.category || "Item"}
                  </p>
                  <p className="text-xs font-black text-neutral-900 dark:text-white">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-white dark:bg-neutral-800 rounded-lg p-0.5 border border-neutral-200/70 dark:border-neutral-700 text-xs">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-5 h-5 rounded flex items-center justify-center text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      aria-label="Decrease"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="w-4 text-center font-bold text-[11px]">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-5 h-5 rounded flex items-center justify-center text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      aria-label="Increase"
                    >
                      <Plus size={11} />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-1 text-neutral-300 hover:text-rose-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Promo Code Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Promo Code"
            className="flex-1 bg-neutral-100 dark:bg-neutral-800/80 border border-transparent focus:border-[#6c5ce7] px-3 py-2 rounded-xl text-xs font-medium outline-none placeholder:text-neutral-400"
          />
          <button
            onClick={handleApplyPromo}
            className="bg-[#6c5ce7] hover:bg-[#5b4cc4] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm"
          >
            Apply
          </button>
        </div>

        {/* Totals Breakdown */}
        <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-xs font-semibold">
          <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
            <span>Subtotal</span>
            <span className="text-neutral-900 dark:text-white">${subtotal.toFixed(2)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-rose-500">
              <span>Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
            <span>Shipping</span>
            <span className="text-emerald-500 font-bold">Free</span>
          </div>
          <div className="flex justify-between text-sm font-black text-neutral-900 dark:text-white pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={() => navigate("/checkout")}
          disabled={cart.length === 0}
          className="w-full bg-[#6c5ce7] hover:bg-[#5b4cc4] text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 active:scale-98 transition-all disabled:opacity-50"
        >
          <Lock size={13} />
          <span>Checkout ({cartCount})</span>
          <ArrowRight size={13} />
        </button>

        {/* Payment logos row */}
        <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-neutral-400 font-medium">
          <span>We accept:</span>
          <span className="font-bold text-neutral-600 dark:text-neutral-300">VISA</span>
          <span className="font-bold text-neutral-600 dark:text-neutral-300">MC</span>
          <span className="font-bold text-neutral-600 dark:text-neutral-300">Apple Pay</span>
          <span className="font-bold text-neutral-600 dark:text-neutral-300">G Pay</span>
        </div>

        {/* "You might also like" Section */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 space-y-3">
          <h4 className="text-xs font-black text-neutral-900 dark:text-white">You might also like</h4>
          <div className="space-y-2.5">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="flex items-center justify-between p-2 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group"
              >
                <div 
                  onClick={() => navigate(`/product/${rec.id}`)}
                  className="flex items-center gap-3 min-w-0 cursor-pointer"
                >
                  <img
                    src={rec.thumbnail}
                    alt={rec.title}
                    className="w-11 h-11 rounded-xl object-contain bg-neutral-100 dark:bg-neutral-800 p-1 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate group-hover:text-[#6c5ce7]">
                      {rec.title}
                    </p>
                    <p className="text-[10px] text-neutral-400 capitalize truncate">
                      {rec.category}
                    </p>
                    <p className="text-xs font-black text-neutral-900 dark:text-white">
                      ${rec.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart?.(rec)}
                  className="w-7 h-7 rounded-full bg-[#6c5ce7] hover:bg-[#5b4cc4] text-white flex items-center justify-center shadow-xs flex-shrink-0 active:scale-90 transition-transform"
                  aria-label={`Add ${rec.title}`}
                >
                  <PlusIcon size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* "Recently Viewed" Thumbnails */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 space-y-2.5">
          <h4 className="text-xs font-black text-neutral-900 dark:text-white">Recently Viewed</h4>
          <div className="grid grid-cols-4 gap-2">
            {recentlyViewed.map((item, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-xl bg-neutral-100 dark:bg-neutral-800 overflow-hidden p-1 cursor-pointer hover:ring-2 hover:ring-[#6c5ce7] transition-all"
              >
                <img
                  src={item.img}
                  alt={`Recently viewed ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* "Join NovaShop Club" VIP Card */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[#6c5ce7] to-[#8c7bf7] text-white relative overflow-hidden shadow-lg shadow-purple-500/15">
          <div className="relative z-10 space-y-2 max-w-[70%]">
            <h5 className="text-xs font-black leading-tight">Join NovaShop Club</h5>
            <p className="text-[10px] text-white/80 leading-snug">
              Get exclusive offers, early access and more!
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-2 bg-white text-[#6c5ce7] hover:bg-neutral-100 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm transition-transform active:scale-95"
            >
              Join Now
            </button>
          </div>

          {/* 3D Crown & Gifts Graphic */}
          <div className="absolute -bottom-2 -right-2 text-4xl select-none opacity-90 drop-shadow-md">
            👑🛍️
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Column (xl+) */}
      <aside className="hidden xl:block w-80 2xl:w-[350px] flex-shrink-0 sticky top-0 h-screen z-20">
        {content}
      </aside>

      {/* Slide-over Drawer for < xl screens */}
      {isDrawer && isOpen && (
        <div className="xl:hidden fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="relative w-84 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-right duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
