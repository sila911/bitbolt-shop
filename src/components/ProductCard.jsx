import { Heart, ShoppingBag, Star1 as Star } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { formatCategoryName, calculateOriginalPrice } from "../utils/formatters";

export default function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite: propIsFavorite,
  onOpenDetail,
}) {
  const navigate = useNavigate();
  const cartCtx = useCart();
  const favCtx = useFavorites();

  const { id, title, category, price, discountPercentage = 0, rating, thumbnail } = product;

  const handleAddToCart = onAddToCart ?? cartCtx?.addToCart;
  const handleToggleFavorite = onToggleFavorite ?? favCtx?.toggleFavorite;
  const isFavorite = propIsFavorite !== undefined ? propIsFavorite : favCtx?.isFavorite?.(id);

  const originalPrice = calculateOriginalPrice(price, discountPercentage);

  const handleCardClick = () => {
    if (onOpenDetail) {
      onOpenDetail(product);
    } else {
      navigate(`/product/${id}`);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className="bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800/80 w-full rounded-2xl p-3 cursor-pointer group hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100/60 dark:bg-neutral-800/50 flex-shrink-0">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300"
          />

          {discountPercentage > 0 && (
            <span className="absolute top-2 left-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-[10px] font-bold px-2 py-0.5 rounded-md">
              -{Math.round(discountPercentage)}%
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite?.(product);
            }}
            className="absolute top-2 right-2 h-8 w-8 grid place-items-center bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 active:scale-95 transition-transform"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={16} variant={isFavorite ? "Bold" : "Linear"} className={isFavorite ? "text-rose-500" : "text-neutral-400"} />
          </button>
        </div>

        <div className="pt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 truncate max-w-[70%]">
              {formatCategoryName(category)}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
              <Star size={13} variant="Bold" className="text-amber-400" />
              <span>{rating}</span>
            </div>
          </div>

          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm leading-snug line-clamp-2">
            {title}
          </h3>
        </div>
      </div>

      <div className="pt-3 mt-auto flex items-center justify-between">
        <div>
          {discountPercentage > 0 && (
            <span className="text-[10px] text-neutral-400 line-through block">
              ${originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-sm sm:text-base font-black text-neutral-900 dark:text-white">
            ${price.toLocaleString()}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart?.(product);
          }}
          className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 grid place-items-center hover:opacity-90 active:scale-90 transition-all shadow-sm"
          aria-label={`Add ${title} to cart`}
        >
          <ShoppingBag size={14} className="pointer-events-none" />
        </button>
      </div>
    </article>
  );
}
