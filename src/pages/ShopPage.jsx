import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, FilterSearch as SlidersHorizontal, Tag, Flash as Flame, Cup as Trophy, CloseCircle as X, SearchNormal1 as Search, MagicStar as Sparkles } from "iconsax-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAllProducts, fetchCategories, fetchProductsByCategory, searchProducts } from "../api";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { ProductGridSkeleton } from "../components/ProductSkeleton";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";

export default function ShopPage({ onAddToCart, onToggleFavorite, isFavorite }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const cartCtx = useCart();
  const favCtx = useFavorites();

  const handleAddToCart = onAddToCart ?? cartCtx?.addToCart;
  const handleToggleFavorite = onToggleFavorite ?? favCtx?.toggleFavorite;
  const checkIsFavorite = isFavorite ?? ((id) => favCtx?.isFavorite?.(id));

  // Extract query parameters
  const categoryParam = searchParams.get("category") || "All";
  const filterParam = searchParams.get("filter") || ""; // 'deals' | 'new-arrivals' | 'best-sellers'
  const searchQuery = searchParams.get("q") || "";
  const sortParam = searchParams.get("sort") || "featured";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState(sortParam);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentKey = `${categoryParam}::${searchQuery}`;
  const [loadedKey, setLoadedKey] = useState("");

  // Sync sortBy when sortParam changes
  useEffect(() => {
    if (sortParam) setSortBy(sortParam);
  }, [sortParam]);

  // Load real categories taxonomy
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchCategories().then((cats) => cats && setCategories(cats)).catch(() => {});
  }, []);

  // Fetch products dynamically based on category, search query, or all products
  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);
        let data;

        if (searchQuery.trim()) {
          data = await searchProducts(searchQuery, controller.signal);
        } else if (categoryParam !== "All") {
          data = await fetchProductsByCategory(categoryParam, controller.signal);
        } else {
          // Fetch large batch of real products across all departments
          data = await fetchAllProducts(100, 0, controller.signal);
        }

        if (!controller.signal.aborted) {
          if (data) {
            setProducts(data);
          }
          setLoadedKey(currentKey);
        }
      } catch (err) {
        if (err.name !== "AbortError" && !controller.signal.aborted) {
          setError(err.message || "Failed to load products");
          setLoadedKey(currentKey);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [categoryParam, searchQuery, currentKey]);

  // Handle category selection
  const handleSelectCategory = (catSlug) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (catSlug === "All") {
        next.delete("category");
      } else {
        next.set("category", catSlug);
      }
      next.delete("q");
      return next;
    });
  };

  // Handle quick filter tab selection
  const handleSelectFilter = (filterKey) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (filterParam === filterKey || !filterKey) {
        next.delete("filter");
      } else {
        next.set("filter", filterKey);
      }
      return next;
    });
  };

  // Handle sort selection
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newSort === "featured") {
        next.delete("sort");
      } else {
        next.set("sort", newSort);
      }
      return next;
    });
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setSearchParams({});
    setSortBy("featured");
  };

  // Track if current category/query data is completely loaded
  const isDataReady = !isLoading && loadedKey === currentKey;

  // Filter and sort products dynamically
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply high-level dynamic filters
    if (filterParam === "deals") {
      result = result.filter((p) => (p.discountPercentage || 0) >= 8);
    } else if (filterParam === "best-sellers") {
      result = result.filter((p) => (p.rating || 0) >= 4.0);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (filterParam === "deals" && sortBy === "featured") {
        return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      }
      if (filterParam === "best-sellers" && sortBy === "featured") {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (filterParam === "new-arrivals" && sortBy === "featured") {
        return b.id - a.id;
      }

      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "discount") return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return 0; // featured default
    });

    return result;
  }, [products, filterParam, sortBy]);

  // Display human-readable title based on active filter
  const getHeaderTitle = () => {
    if (searchQuery) return `Search: "${searchQuery}"`;
    if (categoryParam !== "All") {
      const found = categories.find((c) => (typeof c === "object" ? c.slug === categoryParam : c === categoryParam));
      return (typeof found === "object" ? found.name : found) || categoryParam.replace("-", " ");
    }
    if (filterParam === "deals") return "Special Deals & Discounts";
    if (filterParam === "new-arrivals") return "New Arrivals";
    if (filterParam === "best-sellers") return "Best Sellers";
    return "All Products";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 pt-24 md:pt-28 pb-20 px-4 sm:px-6 md:px-12 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header with Back button & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-all text-xs font-bold uppercase tracking-wider shadow-sm group"
              aria-label="Go back"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-black capitalize tracking-tight flex items-center gap-2">
                {getHeaderTitle()}
              </h1>
              <p className="text-xs text-neutral-500 font-medium">
                {!isDataReady ? "Fetching real data..." : `${filteredProducts.length} items available`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 px-3 py-2 rounded-xl shadow-sm">
              <SlidersHorizontal size={14} className="text-neutral-400" />
              <label htmlFor="shop-sort" className="sr-only">Sort by</label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-transparent text-xs font-bold outline-none cursor-pointer text-neutral-700 dark:text-neutral-200"
              >
                <option value="featured" className="dark:bg-neutral-900">Featured</option>
                <option value="price-low" className="dark:bg-neutral-900">Price: Low to High</option>
                <option value="price-high" className="dark:bg-neutral-900">Price: High to Low</option>
                <option value="rating" className="dark:bg-neutral-900">Highest Rated</option>
                <option value="discount" className="dark:bg-neutral-900">Biggest Discount</option>
                <option value="name" className="dark:bg-neutral-900">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Filter Bar (Deals, New Arrivals, Best Sellers) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
          <button
            onClick={() => handleSelectFilter("")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
              !filterParam
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-sm"
                : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400"
            }`}
          >
            All Collections
          </button>
          <button
            onClick={() => handleSelectFilter("deals")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
              filterParam === "deals"
                ? "bg-rose-500 text-white border-rose-500 shadow-sm shadow-rose-500/20"
                : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:text-rose-500 hover:border-rose-300"
            }`}
          >
            <Tag size={13} />
            <span>Hot Deals</span>
          </button>
          <button
            onClick={() => handleSelectFilter("new-arrivals")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
              filterParam === "new-arrivals"
                ? "bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/20"
                : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:text-amber-500 hover:border-amber-300"
            }`}
          >
            <Flame size={13} />
            <span>New Arrivals</span>
          </button>
          <button
            onClick={() => handleSelectFilter("best-sellers")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
              filterParam === "best-sellers"
                ? "bg-[#6c5ce7] text-white border-[#6c5ce7] shadow-sm shadow-purple-500/20"
                : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:text-[#6c5ce7] hover:border-purple-300"
            }`}
          >
            <Trophy size={13} />
            <span>Best Sellers</span>
          </button>

          {(categoryParam !== "All" || filterParam || searchQuery) && (
            <button
              onClick={handleClearAllFilters}
              className="ml-auto px-3 py-1.5 rounded-full text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <X size={14} />
              <span>Clear Filter</span>
            </button>
          )}
        </div>

        {/* Category Horizontal Filter */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selected={categoryParam}
            onSelect={handleSelectCategory}
          />
        </div>

        {/* Content Section */}
        {error ? (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-2xl p-8 text-center max-w-md mx-auto">
            <p className="text-sm font-bold text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={handleClearAllFilters}
              className="px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : !isDataReady ? (
          <ProductGridSkeleton count={10} />
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-12 text-center max-w-md mx-auto">
            <p className="text-base font-bold mb-1">No products found</p>
            <p className="text-xs text-neutral-400 mb-6">
              {searchQuery
                ? `No items match "${searchQuery}". Try different keywords.`
                : "No items match your active filters."}
            </p>
            <button
              onClick={handleClearAllFilters}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {filteredProducts.map((product) => (
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
