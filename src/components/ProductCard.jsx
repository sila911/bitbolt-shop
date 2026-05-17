import { Heart, ShoppingBag, Star } from 'lucide-react'

export default function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite, onOpenDetail }) {
  const { 
    id, 
    title, 
    category, 
    price, 
    discountPercentage, 
    rating, 
    thumbnail, 
    brand,
    stock 
  } = product;

  const originalPrice = Math.round(price / (1 - discountPercentage / 100));
  const isLowStock = stock < 10;

  return (
    <article
      onClick={() => onOpenDetail(product)}
      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 w-full rounded-3xl p-3 md:p-4 cursor-pointer group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-[420px] md:h-[450px]"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/50 flex-shrink-0">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500" 
        />
        
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full">
            -{Math.round(discountPercentage)}%
          </div>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(id) }}
          className="absolute top-2 right-2 h-8 w-8 md:h-10 md:w-10 grid place-items-center bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md rounded-full shadow-sm hover:scale-110 transition-transform"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-400 dark:text-neutral-500'} />
        </button>
      </div>

      <div className="pt-4 flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-primary text-[10px] md:text-xs font-bold tracking-widest truncate max-w-[70%]">{category.replace('-', ' ')}</p>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] md:text-xs font-black text-neutral-900 dark:text-neutral-100">{rating}</span>
          </div>
        </div>

        <div className="h-12 mb-2">
          <h3 className="font-black text-neutral-900 dark:text-neutral-100 text-sm md:text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors tracking-tight">
            {brand && <span className="text-neutral-400 mr-1">{brand}</span>}
            {title}
          </h3>
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex flex-col">
            {discountPercentage > 0 && (
              <span className="text-[10px] md:text-xs text-neutral-400 dark:text-neutral-500 line-through decoration-red-500/50">
                ${originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-lg md:text-xl font-black text-neutral-900 dark:text-neutral-100 leading-none">
              ${price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={(e) => { 
              e.preventDefault();
              e.stopPropagation(); 
              onAddToCart(product);
            }}
            className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 grid place-items-center shadow-lg hover:bg-primary dark:hover:bg-primary hover:text-white transition-all duration-300"
            aria-label={`Add ${title} to cart`}
          >
            <ShoppingBag size={18} className="pointer-events-none" />
          </button>
        </div>

        <div className="h-4 mt-2">
          {isLowStock && (
            <p className="text-[10px] font-bold text-red-500 tracking-widest flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-current animate-pulse" />
              Only {stock} left
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
