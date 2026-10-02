import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bag2 as ShoppingCart, SearchNormal1 as Search, Heart, Moon, Sun1 as Sun, CloseCircle as X } from "iconsax-react";
import { useCart } from "../../hooks/useCart";
import { useFavorites } from "../../hooks/useFavorites";
import { useTheme } from "../../hooks/useTheme";

export default function Navbar({
  cartCount: propCartCount,
  favoritesCount: propFavoritesCount,
  searchTerm = "",
  onSearchChange,
  searchSuggestions = [],
  onSelectSuggestion,
  onSearchFocus,
  onOpenCart: propOnOpenCart,
  onOpenFavorites: propOnOpenFavorites,
  isDarkMode: propIsDarkMode,
  onToggleDarkMode: propOnToggleDarkMode,
}) {
  const navigate = useNavigate();
  const cartContext = useCart();
  const favoritesContext = useFavorites();
  const themeContext = useTheme();

  const cartCount = propCartCount ?? cartContext?.cartCount ?? 0;
  const favoritesCount = propFavoritesCount ?? favoritesContext?.favoritesCount ?? 0;
  const onOpenCart = propOnOpenCart ?? (() => cartContext?.setIsCartOpen?.(true));
  const onOpenFavorites = propOnOpenFavorites ?? (() => favoritesContext?.setIsFavoritesOpen?.(true));
  const isDarkMode = propIsDarkMode ?? themeContext?.isDarkMode ?? false;
  const onToggleDarkMode = propOnToggleDarkMode ?? themeContext?.toggleDarkMode;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);
  const mobileInputRef = useRef(null);

  const [prevSearchTerm, setPrevSearchTerm] = useState(searchTerm);
  if (prevSearchTerm !== searchTerm) {
    setHighlightedIndex(-1);
    setPrevSearchTerm(searchTerm);
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleGlobalKeyDown = (event) => {
      if (event.key === "/" && document.activeElement !== inputRef.current && document.activeElement !== mobileInputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setIsMobileSearchOpen(false);
        inputRef.current?.blur();
        mobileInputRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  const handleInputKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      if (!isDropdownOpen || !searchSuggestions?.length) return;
      event.preventDefault();
      setHighlightedIndex((prev) => (prev < searchSuggestions.length - 1 ? prev + 1 : prev));
    } else if (event.key === "ArrowUp") {
      if (!isDropdownOpen || !searchSuggestions?.length) return;
      event.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (event.key === "Enter") {
      if (highlightedIndex >= 0 && searchSuggestions?.[highlightedIndex]) {
        event.preventDefault();
        onSelectSuggestion?.(searchSuggestions[highlightedIndex]);
        setIsDropdownOpen(false);
        setIsMobileSearchOpen(false);
      } else if (searchTerm.trim()) {
        event.preventDefault();
        setIsDropdownOpen(false);
        setIsMobileSearchOpen(false);
        navigate(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
      }
    }
  };

  const showDropdown = isDropdownOpen && searchTerm.trim() && searchSuggestions && searchSuggestions.length > 0;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md py-2.5 shadow-sm border-b border-neutral-200/50 dark:border-neutral-800/50"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-3 sm:gap-6">
        <div className="flex items-center gap-6 sm:gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-neutral-900 text-sm sm:text-base font-black group-hover:scale-105 transition-transform">
              B
            </div>
            <span className="text-lg sm:text-xl font-black tracking-tight text-neutral-900 dark:text-white uppercase">
              Bit<span className="text-neutral-400">Bolt</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `transition-colors hover:text-neutral-900 dark:hover:text-white ${
                  isActive ? "text-neutral-900 dark:text-white" : "text-neutral-400"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/lookbook"
              className={({ isActive }) =>
                `transition-colors hover:text-neutral-900 dark:hover:text-white ${
                  isActive ? "text-neutral-900 dark:text-white" : "text-neutral-400"
                }`
              }
            >
              Lookbook
            </NavLink>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg relative" ref={searchContainerRef}>
          <div className="relative w-full">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                onSearchChange?.(e);
                if (e.target.value.trim()) setIsDropdownOpen(true);
              }}
              onFocus={() => {
                onSearchFocus?.();
                if (searchTerm.trim()) setIsDropdownOpen(true);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder="Search catalog... [/]"
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 py-2.5 px-4 pl-10 rounded-xl outline-none transition-all text-xs font-bold tracking-wide"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={15} />
          </div>

          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden z-[110]">
              <div className="max-h-[360px] overflow-y-auto no-scrollbar p-2">
                {searchSuggestions.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      onSelectSuggestion?.(product);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors text-left ${
                      highlightedIndex === index
                        ? "bg-neutral-100 dark:bg-neutral-800"
                        : "hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 p-1">
                      <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate text-neutral-900 dark:text-neutral-100">{product.title}</p>
                      <p className="text-[10px] text-neutral-400 font-semibold">{product.category}</p>
                    </div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">${product.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsMobileSearchOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle mobile search"
          >
            <Search size={18} />
          </button>

          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={onOpenFavorites}
            className="relative p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Open Wishlist"
          >
            <Heart size={18} />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full grid place-items-center px-1">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Open Cart"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-bold rounded-full grid place-items-center px-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 pt-3 pb-2 bg-white/95 dark:bg-neutral-950/95 border-b border-neutral-200 dark:border-neutral-800">
          <div className="relative">
            <input
              ref={mobileInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                onSearchChange?.(e);
                if (e.target.value.trim()) setIsDropdownOpen(true);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder="Search catalog..."
              className="w-full bg-neutral-100 dark:bg-neutral-900 py-2.5 pl-10 pr-9 rounded-xl text-xs font-bold outline-none"
              autoFocus
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={15} />
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 p-1"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
