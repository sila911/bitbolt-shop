import { X, ShoppingBag, Trash2, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FavoritesDrawer({
  isOpen,
  favorites,
  onClose,
  onAddToCart,
  onRemoveFavorite,
}) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md z-[200] flex justify-end transition-all duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-neutral-950 w-full max-w-full sm:max-w-md h-full flex flex-col shadow-2xl relative"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 flex justify-between items-center border-b border-neutral-100 dark:border-neutral-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Heart size={16} className="text-red-500 fill-red-500" />
              <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
                Wishlist
              </h2>
            </div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              {favorites?.length || 0} Saved Items
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 bg-neutral-100 dark:bg-neutral-900 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto no-scrollbar space-y-4">
          {!favorites || favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center text-neutral-400 mb-4">
                <Heart size={24} />
              </div>
              <p className="text-base font-bold text-neutral-900 dark:text-white">Empty Wishlist</p>
              <p className="text-xs text-neutral-400 mt-1 mb-6">Tap the heart on any product to save it here.</p>
              <button 
                onClick={() => {
                  onClose();
                  navigate("/shop");
                }}
                className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Browse Items
              </button>
            </div>
          ) : (
            <div className="grid gap-3">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 group hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors border border-neutral-200/60 dark:border-neutral-800"
                >
                  <div
                    onClick={() => {
                      onClose();
                      navigate(`/product/${item.id}`);
                    }}
                    className="w-18 h-18 sm:w-20 sm:h-20 flex-shrink-0 bg-white dark:bg-neutral-800 rounded-xl overflow-hidden p-1.5 cursor-pointer"
                  >
                    <img
                      src={item.thumbnail || item.img}
                      alt={item.title || item.name}
                      className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform"
                    />
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
                        <h3 className="font-bold text-xs uppercase tracking-tight text-neutral-900 dark:text-white truncate hover:underline">
                          {item.title || item.name}
                        </h3>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider truncate">
                          {item.category?.replace("-", " ")}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveFavorite && onRemoveFavorite(item.id)}
                        className="text-neutral-300 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove from favorites"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="mt-auto flex justify-between items-end pt-1">
                      <p className="text-sm font-black text-neutral-900 dark:text-white">
                        ${item.price?.toLocaleString()}
                      </p>
                      <button
                        onClick={() => onAddToCart && onAddToCart(item)}
                        className="h-8 w-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 grid place-items-center shadow-sm hover:opacity-90 transition-opacity"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-5 border-t border-neutral-100 dark:border-neutral-900 text-center">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
            BitBolt Collection
          </p>
        </div>
      </div>
    </div>
  );
}
