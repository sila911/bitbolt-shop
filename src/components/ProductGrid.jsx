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
        <h2 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white tracking-tight uppercase">
          Products
        </h2>
        <span className="text-xs font-bold text-neutral-400">
          {isLoading ? 'Loading...' : `${products.length} items`}
        </span>
      </div>

      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={onSelectCategory}
        />
      </div>
      
      {isLoading ? (
        <ProductGridSkeleton count={products.length > 0 ? products.length : 10} />
      ) : products.length === 0 ? (
        <div className="bg-neutral-50 dark:bg-neutral-900/40 rounded-3xl p-12 text-center border border-neutral-200/80 dark:border-neutral-800">
          <p className="text-lg font-bold text-neutral-900 dark:text-white">No products found</p>
          <p className="text-xs text-neutral-400 mt-1 mb-6">Try searching with different terms or selecting another category.</p>
          <button
            onClick={onClearFilters}
            className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Reset Filters
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
