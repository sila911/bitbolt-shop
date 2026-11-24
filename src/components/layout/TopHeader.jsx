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
    <header className="sticky top-0 z-20 bg-zinc-950 border-b border-zinc-800 px-4 sm:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
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
              placeholder="Search hardware, keyboards, audio..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 py-2.5 px-4 pr-10 rounded-xl outline-none text-xs sm:text-sm font-medium transition-all placeholder:text-zinc-500 text-zinc-100"
            />
            <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
          </div>

          {/* Search Suggestions Dropdown */}
          {isDropdownOpen && searchTerm.trim() && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-30">
              <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
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
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800 text-left transition-colors cursor-pointer"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-9 h-9 rounded-md object-contain bg-zinc-950 border border-zinc-800 p-1 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-zinc-100 truncate">{product.title}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                        {product.category?.replace("-", " ")}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-white tabular-nums">${product.price}</span>
                  </button>
                ))}

                <div className="pt-1 mt-1 border-t border-zinc-800">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
                    }}
                    className="w-full text-center py-2 px-3 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
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
            className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            title="Search"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          <button
            onClick={onOpenFavorites}
            className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart size={18} />
            <span className="hidden md:inline text-xs font-medium text-zinc-300">Wishlist</span>
            {favoritesCount > 0 && (
              <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-semibold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center tabular-nums">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart Toggle */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label="Toggle Cart"
            title="Cart"
          >
            <ShoppingCart size={18} />
            <span className="hidden md:inline text-xs font-medium text-zinc-300">Bag</span>
            {cartCount > 0 && (
              <span className="bg-zinc-100 text-zinc-950 text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
