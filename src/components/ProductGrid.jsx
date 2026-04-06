import ProductCard from './ProductCard'

export default function ProductGrid({ products, onAddToCart, onToggleFavorite, isFavorite, onOpenDetail, onClearFilters }) {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 pb-20">
      <h2 className="text-4xl font-semibold text-[var(--color-text)] mb-8 logo-font">Featured Products</h2>
      
      {products.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <p className="text-2xl text-[var(--color-text)]">No products found</p>
          <p className="text-[var(--color-muted)] mt-2">Try a different search or category</p>
          <button
            onClick={onClearFilters}
            className="mt-6 brand-gradient text-white px-6 py-3 rounded-3xl text-sm font-semibold"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 xl:gap-5">
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