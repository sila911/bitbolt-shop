import ProductCard from './ProductCard'

export default function ProductGrid({ products, onAddToCart, onToggleFavorite, isFavorite, onOpenDetail }) {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 pb-20">
      <h2 className="text-4xl font-semibold text-[var(--color-text)] mb-8 logo-font">Featured Products</h2>
      
      {products.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <p className="text-2xl text-[var(--color-text)]">No products found</p>
          <p className="text-[var(--color-muted)] mt-2">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
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