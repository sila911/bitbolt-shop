import ProductCard from './ProductCard'
import { ProductGridSkeleton } from './ProductSkeleton'
import CategoryFilter from './CategoryFilter'

export default function ProductGrid({ 
  products, 
  isLoading, 
  onAddToCart, 
  onToggleFavorite, 
  isFavorite, 
  onOpenDetail, 
  onClearFilters,
  categories,
  selectedCategory,
  onSelectCategory,
  gridRef
}) {
  return (
    <section ref={gridRef} className="max-w-screen-2xl mx-auto px-4 md:px-8 pb-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-4xl font-black text-neutral-900 dark:text-white tracking-tighter">
          Exclusive <span className="text-neutral-400">Collection</span>
        </h2>
        <p className="text-xs md:text-sm font-bold text-neutral-400 tracking-widest uppercase">
          {isLoading ? 'Searching...' : `${products.length} Items Found`}
        </p>
      </div>

      <div className="mb-12">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={onSelectCategory}
        />
      </div>
      
      {isLoading ? (
        <ProductGridSkeleton count={products.length > 0 ? products.length : 10} />
      ) : products.length === 0 ? (
        <div className="bg-neutral-100 dark:bg-neutral-900/50 rounded-[3rem] p-12 md:p-24 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="text-6xl mb-6">🔍</div>
          <p className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white">No products match your vibe</p>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2 max-w-md mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
          <button
            onClick={onClearFilters}
            className="mt-8 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-4 rounded-full text-xs font-black tracking-widest hover:scale-105 transition-transform"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite(product.id)}
              onOpenDetail={() => onOpenDetail(product)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
