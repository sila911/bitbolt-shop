
import { useState, useRef, useEffect } from "react";
import { SearchNormal1 as Search, Heart, HambergerMenu as Menu, Bag2 as ShoppingCart } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useFavorites } from "../../hooks/useFavorites";

export default function TopHeader({
  searchTerm = "",
  onSearchChange,
  searchSuggestions = [],
  onSelectSuggestion,
  favoritesCount: propFavoritesCount,
  cartCount: propCartCount,
  onOpenSidebar,
  onOpenCart: propOnOpenCart,
  onOpenFavorites: propOnOpenFavorites,
}) {
  const navigate = useNavigate();
  const cartCtx = useCart();
  const favCtx = useFavorites();

  const cartCount = propCartCount ?? cartCtx?.cartCount ?? 0;
  const favoritesCount = propFavoritesCount ?? favCtx?.favoritesCount ?? 0;
  const onOpenCart = propOnOpenCart ?? (() => cartCtx?.setIsCartOpen?.(true));
  const onOpenFavorites = propOnOpenFavorites ?? (() => favCtx?.setIsFavoritesOpen?.(true));

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200/70 dark:border-neutral-800/80 px-4 sm:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar (Desktop full bar) */}
        <div className="hidden lg:flex flex-1 max-w-2xl relative" ref={searchRef}>
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                onSearchChange?.(e);
                if (e.target.value.trim()) setIsDropdownOpen(true);
              }}
              onFocus={() => {
                if (searchTerm.trim()) setIsDropdownOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchTerm.trim()) {
                  setIsDropdownOpen(false);
                  navigate(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
                }
              }}
              placeholder="Search for products, brands and more..."
              className="w-full bg-neutral-100 dark:bg-neutral-800/90 border border-transparent focus:border-[#6c5ce7] py-2.5 px-4 pr-10 rounded-2xl outline-none text-xs sm:text-sm font-medium transition-all placeholder:text-neutral-400 text-neutral-800 dark:text-neutral-100"
            />
            <Search size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>

          {/* Search Suggestions Dropdown */}
          {isDropdownOpen && searchTerm.trim() && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden z-30">
              <div className="max-h-[360px] overflow-y-auto no-scrollbar p-2">
                {searchSuggestions.slice(0, 6).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (onSelectSuggestion) {
                        onSelectSuggestion(product);
                      } else {
                        navigate(`/product/${product.id}`);
                      }
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition-colors"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-10 h-10 rounded-lg object-contain bg-neutral-100 dark:bg-neutral-800 p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">{product.title}</h4>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-wider">
                        {product.category?.replace("-", " ")}
                      </p>
                    </div>
                    <span className="text-xs font-black text-neutral-900 dark:text-white">${product.price}</span>
                  </button>
                ))}

                <div className="pt-1 mt-1 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
                    }}
                    className="w-full text-center py-2 px-3 text-xs font-bold text-[#6c5ce7] dark:text-[#a29bfe] hover:bg-neutral-100 dark:hover:bg-neutral-800/80 rounded-xl transition-colors"
                  >
                    View all results for &ldquo;{searchTerm}&rdquo; &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search Icon Only (Tablet & Phone) */}
          <button
            onClick={() => navigate("/search")}
            className="lg:hidden p-2.5 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors flex items-center justify-center"
            title="Search"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors flex items-center gap-1.5"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart size={18} />
            <span className="hidden md:inline text-xs font-semibold">Wishlist</span>
            {favoritesCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart Toggle */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors flex items-center gap-1.5"
            aria-label="Toggle Cart"
            title="Cart"
          >
            <ShoppingCart size={18} />
            <span className="hidden md:inline text-xs font-semibold">Cart</span>
            {cartCount > 0 && (
              <span className="bg-[#6c5ce7] text-white text-[10px] font-black h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
