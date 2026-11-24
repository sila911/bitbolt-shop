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
      className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 w-full rounded-xl p-3 cursor-pointer group transition-all duration-200 flex flex-col justify-between shadow-sm"
    >
      <div>
        <div className="relative aspect-square rounded-lg overflow-hidden bg-zinc-950 border border-zinc-850 flex items-center justify-center p-3 shrink-0">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {discountPercentage > 0 && (
            <span className="absolute top-2 left-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-semibold px-1.5 py-0.5 rounded tabular-nums">
              -{Math.round(discountPercentage)}%
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite?.(product);
            }}
            className="absolute top-2 right-2 h-7 w-7 sm:h-8 sm:w-8 grid place-items-center bg-zinc-900/90 border border-zinc-800/80 rounded-lg shadow-sm hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={14} variant={isFavorite ? "Bold" : "Linear"} className={isFavorite ? "text-rose-400" : "text-zinc-400"} />
          </button>
        </div>

        <div className="pt-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 truncate max-w-[70%]">
              {formatCategoryName(category)}
            </span>
            <div className="flex items-center gap-1 text-xs text-zinc-300">
              <Star size={12} variant="Bold" className="text-amber-400" />
              <span className="font-semibold tabular-nums">{rating}</span>
            </div>
          </div>

          <h3 className="font-semibold text-zinc-100 text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-white transition-colors">
            {title}
          </h3>
        </div>
      </div>

      <div className="pt-3 mt-auto flex items-center justify-between border-t border-zinc-800/80">
        <div>
          {discountPercentage > 0 && (
            <span className="text-xs text-zinc-500 line-through tabular-nums block font-normal">
              ${originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-sm sm:text-base font-bold text-white tabular-nums">
            ${price.toLocaleString()}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart?.(product);
          }}
          className="h-8 w-8 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 grid place-items-center active:scale-90 transition-all cursor-pointer shadow-xs"
          aria-label={`Add ${title} to cart`}
        >
          <ShoppingBag size={14} />
        </button>
      </div>
    </article>
  );
}
