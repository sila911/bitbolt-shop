import { X, ShoppingBag, Trash2 } from "lucide-react";

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
      className="fixed inset-0 bg-[rgba(53,32,102,0.38)] backdrop-blur-sm z-[9999] flex justify-end"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopImmediatePropagation()}
        className="glass w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[rgba(123,97,255,0.16)]"
      >
        <div className="p-8 flex justify-between items-center border-b border-[rgba(123,97,255,0.16)]">
          <h2 className="text-3xl font-semibold text-[var(--color-text)]">
            Favorites
          </h2>
          <button onClick={onClose} className="text-[var(--color-primary)]">
            <X size={32} />
          </button>
        </div>
        <div className="flex-1 p-8 overflow-y-auto space-y-6">
          {!favorites || favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-6xl mb-6">💜</p>
              <p className="text-2xl text-[var(--color-muted)]">
                No favorites yet
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 glass p-4 rounded-3xl items-center"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-2xl"
                  />
                  <div className="flex-1">
                    <p className="text-[var(--color-primary)] text-xs sm:text-sm leading-none">
                      {item.category}
                    </p>
                    <p className="font-semibold text-[var(--color-text)] text-lg line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-2xl font-bold mt-2">
                      {item.price.toLocaleString()}$
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => onAddToCart && onAddToCart(item)}
                      className="h-11 w-11 rounded-2xl brand-gradient text-white grid place-items-center shadow-lg"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <ShoppingBag size={18} />
                    </button>
                    <button
                      onClick={() =>
                        onRemoveFavorite ? onRemoveFavorite(item.id) : null
                      }
                      className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
