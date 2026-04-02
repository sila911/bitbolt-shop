import { X } from 'lucide-react'
import ProductCard from './ProductCard'

export default function FavoritesDrawer({ isOpen, favorites, onClose, onAddToCart }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[rgba(53,32,102,0.38)] backdrop-blur-sm z-[9999] flex justify-end" onClick={onClose}>
      <div 
        onClick={e => e.stopImmediatePropagation()}
        className="glass w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[rgba(123,97,255,0.16)]"
      >
        <div className="p-8 flex justify-between items-center border-b border-[rgba(123,97,255,0.16)]">
          <h2 className="text-3xl font-semibold text-[var(--color-text)]">Favorites</h2>
          <button onClick={onClose} className="text-[var(--color-primary)]"><X size={32} /></button>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          {favorites.length === 0 ? (
            <p className="text-center text-[var(--color-muted)] mt-20">No favorites yet ❤️</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {favorites.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleFavorite={() => {}} // not needed here
                  isFavorite={true}
                  onOpenDetail={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}