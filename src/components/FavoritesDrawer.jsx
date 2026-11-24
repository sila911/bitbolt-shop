import { CloseCircle as X, ShoppingBag, Trash, Heart } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useFavorites } from "../hooks/useFavorites";
import { useCart } from "../hooks/useCart";

export default function FavoritesDrawer({
  isOpen,
  favorites: propFavorites,
  onClose,
  onAddToCart,
  onRemoveFavorite,
}) {
  const navigate = useNavigate();
  const favCtx = useFavorites();
  const cartCtx = useCart();

  const favorites = propFavorites ?? favCtx?.favorites ?? [];
  const isDrawerOpen = isOpen !== undefined ? isOpen : favCtx?.isFavoritesOpen;
  const handleClose = onClose ?? (() => favCtx?.setIsFavoritesOpen?.(false));
  const handleAddToCart = onAddToCart ?? cartCtx?.addToCart;
  const handleRemoveFavorite = onRemoveFavorite ?? favCtx?.toggleFavorite;

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          key="favorites-drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 z-50 flex justify-end"
          onClick={handleClose}
        >
          <motion.div
            key="favorites-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-950 border-l border-zinc-800 text-zinc-100 w-full max-w-full sm:max-w-md h-full flex flex-col shadow-2xl relative"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 flex justify-between items-center border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Heart size={18} variant="Bold" className="text-rose-400" />
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Wishlist</h2>
                  <p className="text-xs text-zinc-400 tabular-nums">
                    {favorites?.length || 0} {favorites?.length === 1 ? 'item saved' : 'items saved'}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleClose} 
                className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close wishlist"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3">
              {!favorites || favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 mb-3">
                    <Heart size={22} />
                  </div>
                  <p className="text-sm font-semibold text-white">Your wishlist is empty</p>
                  <p className="text-xs text-zinc-400 mt-1 mb-5">Click the heart icon on any product to save it here.</p>
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
                <div className="space-y-3">
                  {favorites.map((item) => (
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
                        <img
                          src={item.thumbnail || item.img}
                          alt={item.title || item.name}
                          className="w-full h-full object-contain"
                        />
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
                            <h3 className="font-semibold text-xs text-white truncate hover:underline">{item.title || item.name}</h3>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-wider truncate">{item.brand || item.category?.replace('-', ' ')}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveFavorite(item)}
                            className="text-zinc-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                            aria-label="Remove from wishlist"
                          >
                            <Trash size={15} />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2">
                          <p className="text-xs sm:text-sm font-bold text-white tabular-nums">
                            ${(item.price || 0).toLocaleString()}
                          </p>

                          <button
                            onClick={() => {
                              handleAddToCart?.(item);
                              handleClose();
                            }}
                            className="bg-zinc-100 hover:bg-white text-zinc-950 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs"
                          >
                            <ShoppingBag size={13} />
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
