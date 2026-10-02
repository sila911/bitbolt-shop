import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Package, 
  Check, 
  Minus, 
  Plus, 
  Share2 
} from "lucide-react";
import { fetchProductById, fetchProductsByCategory } from "../services/productApi";
import ProductCard from "../components/ProductCard";

export default function ProductDetailPage({ onAddToCart, onToggleFavorite, isFavorite, addToast }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const controller = new AbortController();

    async function loadProduct() {
      try {
        setIsLoading(true);
        setError(null);
        setSelectedImage(0);
        setQuantity(1);

        const data = await fetchProductById(id, controller.signal);
        if (!data) return;
        setProduct(data);

        // Fetch related products from same category
        if (data.category) {
          try {
            const related = await fetchProductsByCategory(data.category, controller.signal);
            if (related) {
              setRelatedProducts(related.filter((p) => p.id !== data.id).slice(0, 4));
            }
          } catch {
            // Ignore related products fetch errors
          }
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load product");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();

    return () => controller.abort();
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      addToast?.("Link Copied", "Product URL copied to clipboard.", "info");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAdd = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 pt-28 pb-20 px-4 sm:px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          {/* Back button skeleton */}
          <div className="h-10 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-xl mb-8 animate-pulse" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-3xl animate-pulse" />
            <div className="space-y-6">
              <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
              <div className="h-12 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
              <div className="h-8 w-40 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
              <div className="h-28 w-full bg-neutral-200 dark:bg-neutral-800 rounded-2xl animate-pulse" />
              <div className="h-14 w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 pt-32 pb-20 px-6 text-center">
        <div className="max-w-md mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-10">
          <p className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Product Not Found</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">{error || "The item you're looking for doesn't exist or was removed."}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const {
    title,
    brand,
    category,
    price,
    discountPercentage = 0,
    rating = 0,
    stock = 0,
    description = "",
    images = [],
    thumbnail = "",
    reviews = [],
    warrantyInformation,
    shippingInformation,
    returnPolicy,
    weight,
    dimensions
  } = product;

  const originalPrice = discountPercentage > 0 ? Math.round(price / (1 - discountPercentage / 100)) : price;
  const gallery = images && images.length > 0 ? images : [thumbnail];
  const favorited = isFavorite?.(product.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 pt-24 md:pt-28 pb-24 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Top Navigation Bar: Back icon button for (-1) leave */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-all text-xs font-bold uppercase tracking-wider shadow-sm group"
            aria-label="Go back to previous page"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors shadow-sm"
              title="Share link"
              aria-label="Share product"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
            </button>

            <button
              onClick={() => onToggleFavorite?.(product.id)}
              className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm transition-colors"
              aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={18} className={favorited ? "fill-red-500 text-red-500" : "text-neutral-500"} />
            </button>
          </div>
        </div>

        {/* Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Image Gallery (5 cols on lg) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-center p-6 shadow-sm">
              <img
                src={gallery[selectedImage] || thumbnail}
                alt={title}
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-all duration-300"
              />

              {discountPercentage > 0 && (
                <span className="absolute top-4 left-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold px-3 py-1 rounded-lg">
                  -{Math.round(discountPercentage)}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails row */}
            {gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border-2 flex-shrink-0 p-1.5 transition-all ${
                      selectedImage === idx
                        ? "border-neutral-900 dark:border-white shadow-sm"
                        : "border-neutral-200/70 dark:border-neutral-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${title} thumb ${idx}`}
                      className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Actions (7 cols on lg) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                  {category ? category.replace("-", " ") : "Catalog"}
                </span>
                {brand && (
                  <>
                    <span className="text-neutral-300 dark:text-neutral-700">•</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                      {brand}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
                {title}
              </h1>

              {/* Rating & Stock status */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-900 px-3 py-1 rounded-lg text-xs font-bold">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span>{rating}</span>
                  {reviews && reviews.length > 0 && (
                    <span className="text-neutral-400 font-medium">({reviews.length})</span>
                  )}
                </div>

                <div className="text-xs font-bold">
                  {stock > 0 ? (
                    <span className="text-green-600 dark:text-green-400">
                      In Stock {stock < 10 && `(${stock} left)`}
                    </span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-neutral-900 dark:text-white">
                    ${price.toLocaleString()}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="text-sm text-neutral-400 line-through font-medium">
                      ${originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <p className="text-[11px] text-green-600 dark:text-green-400 font-bold mt-0.5">
                    Save ${(originalPrice - price).toLocaleString()} ({Math.round(discountPercentage)}%)
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl border border-neutral-200/60 dark:border-neutral-700">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-xs font-black">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 py-4 px-8 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 hover:opacity-90 active:scale-[0.99] transition-all shadow-md"
              >
                <ShoppingBag size={16} />
                Add to Bag • ${(price * quantity).toLocaleString()}
              </button>

              <button
                onClick={() => onToggleFavorite?.(product.id)}
                className={`py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider border flex items-center justify-center gap-2 transition-colors ${
                  favorited
                    ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400"
                    : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600"
                }`}
              >
                <Heart size={16} className={favorited ? "fill-current" : ""} />
                <span>{favorited ? "Saved" : "Save"}</span>
              </button>
            </div>

            {/* Description */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Overview</h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {description}
              </p>
            </div>

            {/* Perks & Policies */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 flex items-center gap-3">
                <Truck size={18} className="text-neutral-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold truncate">Shipping</p>
                  <p className="text-[10px] text-neutral-400 truncate">{shippingInformation || "Free standard delivery"}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 flex items-center gap-3">
                <ShieldCheck size={18} className="text-neutral-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold truncate">Warranty</p>
                  <p className="text-[10px] text-neutral-400 truncate">{warrantyInformation || "1 Year Official"}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 flex items-center gap-3">
                <RotateCcw size={18} className="text-neutral-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold truncate">Returns</p>
                  <p className="text-[10px] text-neutral-400 truncate">{returnPolicy || "30-Day Guarantee"}</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {(weight || dimensions) && (
              <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 text-xs space-y-2">
                <span className="font-bold text-neutral-400 uppercase tracking-wider block text-[10px]">Specifications</span>
                <div className="grid grid-cols-2 gap-2 text-neutral-600 dark:text-neutral-300">
                  {weight && (
                    <div>Weight: <span className="font-bold text-neutral-900 dark:text-white">{weight} kg</span></div>
                  )}
                  {dimensions && (
                    <div>Dimensions: <span className="font-bold text-neutral-900 dark:text-white">{dimensions.width} × {dimensions.height} × {dimensions.depth} cm</span></div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        {reviews && reviews.length > 0 && (
          <section className="mt-16 pt-12 border-t border-neutral-200/80 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight uppercase">
                Customer Reviews ({reviews.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviews.map((rev, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < rev.rating ? "fill-amber-400 text-amber-400" : "text-neutral-200 dark:text-neutral-700"}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-neutral-400">
                      {new Date(rev.date).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                    "{rev.comment}"
                  </p>

                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    {rev.reviewerName}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-neutral-200/80 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight uppercase">
                More in {category.replace("-", " ")}
              </h2>
              <Link
                to="/shop"
                className="text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                View Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={onAddToCart}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={isFavorite?.(p.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
