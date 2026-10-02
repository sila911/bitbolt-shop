import { Heart, ShoppingBag, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NovaProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  variant = "deal" // 'deal' or 'recommended'
}) {
  const navigate = useNavigate();

  const {
    id,
    title,
    category,
    brand,
    price,
    discountPercentage = 0,
    rating = 4.8,
    thumbnail
  } = product;

  const originalPrice = discountPercentage > 0 ? Math.round(price / (1 - discountPercentage / 100)) : price;
  const favorited = isFavorite?.(id);

  // Variant color swatches for recommended style
  const swatches = ["bg-neutral-800", "bg-amber-700", "bg-neutral-300"];

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 rounded-3xl p-3 sm:p-3.5 cursor-pointer group hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Thumbnail Image Container */}
        <div className="relative aspect-square w-full rounded-2xl bg-neutral-100/70 dark:bg-neutral-800/60 overflow-hidden flex items-center justify-center p-3">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300"
          />

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
              -{Math.round(discountPercentage)}%
            </span>
          )}

          {/* Wishlist Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(product);
            }}
            className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 dark:bg-neutral-900/90 shadow-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
            aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={14}
              className={favorited ? "fill-rose-500 text-rose-500" : "text-neutral-400 dark:text-neutral-500"}
            />
          </button>
        </div>

        {/* Info */}
        <div className="pt-3 space-y-0.5">
          <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white truncate group-hover:text-[#6c5ce7] transition-colors">
            {title}
          </h4>
          <p className="text-[11px] text-neutral-400 capitalize truncate">
            {brand || category?.replace("-", " ") || "Collection"}
          </p>
        </div>
      </div>

      {/* Pricing & Footer Actions */}
      <div className="pt-3 mt-2 border-t border-neutral-100 dark:border-neutral-800/80">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-sm sm:text-base font-black text-neutral-900 dark:text-white">
            ${price.toLocaleString()}
          </span>
          {discountPercentage > 0 && (
            <span className="text-[11px] text-neutral-400 line-through font-medium">
              ${originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {variant === "recommended" ? (
          <div className="flex items-center justify-between">
            {/* Color Swatch Dots */}
            <div className="flex items-center gap-1.5">
              {swatches.map((color, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full ${color} ring-1 ring-white dark:ring-neutral-900`}
                />
              ))}
            </div>

            {/* Purple Circular Add-to-Cart Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(product);
              }}
              className="w-8 h-8 rounded-full bg-[#6c5ce7] hover:bg-[#5b4cc4] text-white flex items-center justify-center shadow-md shadow-purple-500/20 active:scale-90 transition-all"
              aria-label={`Add ${title} to bag`}
            >
              <ShoppingBag size={14} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            {/* Rating */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span>{rating}</span>
              <span className="text-[10px] text-neutral-400 font-normal">(124)</span>
            </div>

            {/* Quick Add Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(product);
              }}
              className="p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-[#6c5ce7] transition-colors"
              aria-label={`Add ${title} to bag`}
            >
              <ShoppingBag size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
