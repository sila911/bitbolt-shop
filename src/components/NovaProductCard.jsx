import { Heart, ShoppingBag, Star1 as Star } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";

export default function NovaProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  variant = "deal",
}) {
  const navigate = useNavigate();
  const cartCtx = useCart();
  const favCtx = useFavorites();

  const handleAddToCart = onAddToCart ?? cartCtx?.addToCart;
  const handleToggleFavorite = onToggleFavorite ?? favCtx?.toggleFavorite;

  const {
    id,
    title,
    category,
    brand,
    price,
    discountPercentage = 0,
    rating = 4.8,
    thumbnail,
  } = product;

  const originalPrice =
    discountPercentage > 0 ? Math.round(price / (1 - discountPercentage / 100)) : price;

  const favorited =
    isFavorite !== undefined
      ? typeof isFavorite === "function"
        ? isFavorite(id)
        : isFavorite
      : favCtx?.isFavorite?.(id);

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-3 sm:p-3.5 cursor-pointer group transition-all duration-200 flex flex-col justify-between shadow-sm"
    >
      <div>
        <div className="relative aspect-square w-full rounded-lg bg-zinc-950 border border-zinc-850 overflow-hidden flex items-center justify-center p-3">
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
            className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-900/90 border border-zinc-800/80 flex items-center justify-center hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
            aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={14}
              variant={favorited ? "Bold" : "Linear"}
              className={favorited ? "text-rose-400" : "text-zinc-400"}
            />
          </button>
        </div>

        <div className="pt-3 space-y-1">
          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider truncate">
            {brand || category?.replace("-", " ") || "Hardware"}
          </p>
          <h4 className="text-xs sm:text-sm font-semibold text-zinc-100 truncate group-hover:text-white transition-colors">
            {title}
          </h4>
        </div>
      </div>

      <div className="pt-3 mt-2 border-t border-zinc-800/80">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-sm sm:text-base font-bold text-white tabular-nums">
            ${price.toLocaleString()}
          </span>
          {discountPercentage > 0 && (
            <span className="text-xs text-zinc-500 line-through tabular-nums font-normal">
              ${originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {variant === "recommended" ? (
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-emerald-400">In Stock</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart?.(product);
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 flex items-center justify-center active:scale-90 transition-all cursor-pointer shadow-xs"
              aria-label={`Add ${title} to cart`}
            >
              <ShoppingBag size={14} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-zinc-300">
              <Star size={12} variant="Bold" className="text-amber-400" />
              <span className="font-semibold tabular-nums">{rating}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart?.(product);
              }}
              className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 transition-colors cursor-pointer"
              aria-label={`Add ${title} to cart`}
            >
              <ShoppingBag size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
