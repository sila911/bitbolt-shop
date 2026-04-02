import { Heart } from 'lucide-react'

export default function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite, onOpenDetail }) {
  return (
    <div onClick={onOpenDetail} className="glass rounded-3xl overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all">
      <div className="relative">
        <img src={product.img} alt={product.name} className="w-full h-64 object-cover" />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id) }}
          className="absolute top-4 right-4 p-3 glass rounded-2xl"
        >
          <Heart size={22} className={isFavorite ? 'fill-[var(--color-primary)] text-[var(--color-primary)]' : 'text-[var(--color-muted)]'} />
        </button>
      </div>
      <div className="p-6">
        <p className="text-[var(--color-primary)] text-sm">{product.category}</p>
        <h3 className="font-semibold text-xl mt-1 line-clamp-1">{product.name}</h3>
        <div className="flex justify-between items-end mt-6">
          <p className="text-4xl font-bold text-[var(--color-text)]">${product.price}</p>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product) }}
            className="brand-gradient text-white px-8 py-4 rounded-3xl font-semibold text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}