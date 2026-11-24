import { useState } from "react";
import NovaProductCard from "./NovaProductCard";
import { Link } from "react-router-dom";

export default function NovaProductRail({
  title,
  products = [],
  variant = "deal",
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  viewAllLink = "/shop"
}) {
  const [activePage, setActivePage] = useState(0);

  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const displayedProducts = products.slice(activePage * pageSize, (activePage + 1) * pageSize);

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
          {title}
        </h3>
        <Link
          to={viewAllLink}
          className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
        {displayedProducts.map((product) => (
          <NovaProductCard
            key={product.id}
            product={product}
            variant={variant}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite}
          />
        ))}
      </div>

      {/* Slide / Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePage(i)}
              className={`rounded-full transition-all cursor-pointer ${
                activePage === i
                  ? "w-5 h-1.5 bg-zinc-200"
                  : "w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
