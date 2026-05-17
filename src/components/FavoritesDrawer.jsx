import { X, ShoppingBag, Trash2, Heart } from "lucide-react";

export default function FavoritesDrawer({
  isOpen,
  favorites,
  onClose,
  onAddToCart,
  onRemoveFavorite,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md z-[200] flex justify-end transition-all duration-500 animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-neutral-950 w-full max-w-lg h-full flex flex-col shadow-2xl relative"
      >
        {/* Header */}
        <div className="p-8 flex justify-between items-center border-b border-neutral-100 dark:border-neutral-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Heart size={16} className="text-red-500 fill-red-500" />
              <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">
                Wishlist
              </h2>
            </div>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
              {favorites?.length || 0} Saved Items
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto no-scrollbar space-y-6">
          {!favorites || favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center text-4xl">
                💜
              </div>
              <div>
                <p className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">
                  Empty Wishlist
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                  Tap the heart icon on any product to save it here.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Back to Shop
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 p-4 rounded-[2rem] bg-neutral-50 dark:bg-neutral-900/50 group hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
                >
                  <div className="w-24 h-24 flex-shrink-0 bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden p-2">
                    <img
                      src={item.thumbnail || item.img}
                      alt={item.title || item.name}
                      className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="min-w-0">
                        <h3 className="font-black text-sm uppercase tracking-tight text-neutral-900 dark:text-white truncate">
                          {item.title || item.name}
                        </h3>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest truncate">
                          {item.category}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveFavorite && onRemoveFavorite(item.id)}
                        className="text-neutral-300 hover:text-red-500 transition-colors"
                        aria-label="Remove from favorites"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-auto flex justify-between items-end">
                      <p className="text-xl font-black text-neutral-900 dark:text-white">
                        ${item.price.toLocaleString()}
                      </p>
                      <button
                        onClick={() => onAddToCart && onAddToCart(item)}
                        className="h-10 w-10 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 grid place-items-center shadow-lg hover:bg-primary dark:hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-8 border-t border-neutral-100 dark:border-neutral-900 text-center">
           <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">
             BitBolt Digital Shop • Premium Gear
           </p>
        </div>
      </div>
    </div>
  );
}
