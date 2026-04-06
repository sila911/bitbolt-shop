import { Heart, ShoppingBag } from 'lucide-react'

export default function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite, onOpenDetail }) {
  return (
    <article
      onClick={onOpenDetail}
      className="glass w-full rounded-[2.25rem] p-3 md:p-4 cursor-pointer group hover:-translate-y-1 hover:scale-[1.01] transition-all"
    >
      <div className="relative rounded-[1.75rem] overflow-hidden border-2 border-[var(--color-border)]">
        <img src={product.img} alt={product.name} className="w-full aspect-[3/4] object-cover" />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id) }}
          className="absolute top-3 right-3 h-10 w-10 grid place-items-center glass rounded-full"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} className={isFavorite ? 'fill-[var(--color-primary)] text-[var(--color-primary)]' : 'text-[var(--color-muted)]'} />
        </button>
      </div>
      <div className="pt-4 px-1">
        <p className="text-[var(--color-primary)] text-xs sm:text-sm leading-none">{product.category}</p>
        <h3 className="font-semibold text-[var(--color-primary)] text-lg sm:text-xl md:text-2xl leading-tight tracking-tight mt-1 line-clamp-2">{product.name}</h3>
        <div className="flex justify-between items-end mt-5">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text)] leading-none">{product.price.toLocaleString()}$</p>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product) }}
            className="h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-2xl brand-gradient text-white grid place-items-center shadow-lg"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={20} className="md:h-6 md:w-6" />
          </button>
        </div>
      </div>
    </article>
  )
}