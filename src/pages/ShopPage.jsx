import { useState, useEffect } from "react";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts, fetchCategories, fetchProductsByCategory } from "../api";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { ProductGridSkeleton } from "../components/ProductSkeleton";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";

export default function ShopPage({ onAddToCart, onToggleFavorite, isFavorite }) {
  const navigate = useNavigate();
  const cartCtx = useCart();
  const favCtx = useFavorites();

  const handleAddToCart = onAddToCart ?? cartCtx?.addToCart;
  const handleToggleFavorite = onToggleFavorite ?? favCtx?.toggleFavorite;
  const checkIsFavorite = isFavorite ?? ((id) => favCtx?.isFavorite?.(id));
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchCategories().then((cats) => cats && setCategories(cats)).catch(() => {});
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);
        let data;
        if (selectedCategory !== "All") {
          data = await fetchProductsByCategory(selectedCategory, controller.signal);
        } else {
          data = await fetchAllProducts(50, 0, controller.signal);
        }
        if (data) setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load products");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [selectedCategory]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "name") return a.title.localeCompare(b.title);
    return 0; // featured
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 pt-24 md:pt-28 pb-20 px-4 sm:px-6 md:px-12 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header with Back button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-all text-xs font-bold uppercase tracking-wider shadow-sm group"
              aria-label="Go back"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight">
              Catalog
            </h1>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 px-3 py-2 rounded-xl shadow-sm">
              <SlidersHorizontal size={14} className="text-neutral-400" />
              <label htmlFor="shop-sort" className="sr-only">Sort by</label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-bold outline-none cursor-pointer text-neutral-700 dark:text-neutral-200"
              >
                <option value="featured" className="dark:bg-neutral-900">Featured</option>
                <option value="price-low" className="dark:bg-neutral-900">Price: Low to High</option>
                <option value="price-high" className="dark:bg-neutral-900">Price: High to Low</option>
                <option value="rating" className="dark:bg-neutral-900">Top Rated</option>
                <option value="name" className="dark:bg-neutral-900">Name (A-Z)</option>
              </select>
            </div>

            <span className="text-xs font-bold text-neutral-400 hidden sm:inline">
              {isLoading ? "Loading..." : `${products.length} items`}
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Content */}
        {error ? (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-2xl p-8 text-center max-w-md mx-auto">
            <p className="text-sm font-bold text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider"
            >
              Reset Filter
            </button>
          </div>
        ) : isLoading ? (
          <ProductGridSkeleton count={10} />
        ) : sortedProducts.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-12 text-center max-w-md mx-auto">
            <p className="text-base font-bold mb-1">No products found</p>
            <p className="text-xs text-neutral-400 mb-6">Try selecting another category.</p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={checkIsFavorite(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
