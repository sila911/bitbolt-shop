import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Heart, Moon, Sun, X } from "lucide-react";

export default function Navbar({
  cartCount,
  favoritesCount,
  searchTerm,
  onSearchChange,
  searchSuggestions,
  onSelectSuggestion,
  onSearchFocus,
  onOpenCart,
  onOpenFavorites,
  isDarkMode,
  onToggleDarkMode,
}) {
  const navigate = useNavigate();
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
    if (!isDropdownOpen || !searchSuggestions?.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev < searchSuggestions.length - 1 ? prev + 1 : prev));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (event.key === "Enter") {
      if (highlightedIndex >= 0) {
        event.preventDefault();
        onSelectSuggestion(searchSuggestions[highlightedIndex]);
        setIsDropdownOpen(false);
        setIsMobileSearchOpen(false);
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
        {/* Logo & Navigation Links */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-neutral-900 text-sm sm:text-base font-black group-hover:scale-105 transition-transform">
              B
            </div>
            <span className="text-lg sm:text-xl font-black tracking-tight text-neutral-900 dark:text-white uppercase">
              Bit<span className="text-neutral-400">Bolt</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
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
                onSearchChange(e);
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
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              size={15}
            />
          </div>

          {/* Search Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden z-[110]">
              <div className="max-h-[360px] overflow-y-auto no-scrollbar p-2">
                {searchSuggestions.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      onSelectSuggestion(product);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors text-left ${
                      highlightedIndex === index
                        ? "bg-neutral-100 dark:bg-neutral-800"
                        : "hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 p-1">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                        {product.title}
                      </h4>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-wider">
                        {product.category?.replace("-", " ")}
                      </p>
                    </div>
                    <span className="text-xs font-black text-neutral-900 dark:text-white">
                      ${product.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => {
              setIsMobileSearchOpen((prev) => !prev);
              setTimeout(() => mobileInputRef.current?.focus(), 100);
            }}
            className="md:hidden p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="Toggle mobile search"
          >
            {isMobileSearchOpen ? <X size={17} /> : <Search size={17} />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleDarkMode();
            }}
            className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="Open wishlist"
          >
            <Heart size={17} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-3.5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-sm"
            aria-label="Open cart"
          >
            <ShoppingCart size={15} />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-white/20 dark:bg-neutral-900/10 px-1.5 py-0.2 rounded text-[10px]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 pt-3 pb-2 bg-white/95 dark:bg-neutral-950/95 border-b border-neutral-200 dark:border-neutral-800">
          <div className="relative">
            <input
              ref={mobileInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e)}
              placeholder="Search products..."
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 py-2 px-3 pl-9 rounded-xl outline-none text-xs font-bold"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={14} />
          </div>

          {searchTerm.trim() && searchSuggestions && searchSuggestions.length > 0 && (
            <div className="mt-2 max-h-[240px] overflow-y-auto no-scrollbar space-y-1 py-1">
              {searchSuggestions.slice(0, 5).map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    setIsMobileSearchOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 text-left"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-8 h-8 rounded object-contain mix-blend-multiply dark:mix-blend-normal bg-neutral-100 dark:bg-neutral-800 p-0.5"
                  />
                  <span className="text-xs font-bold truncate flex-1">{product.title}</span>
                  <span className="text-xs font-black">${product.price}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
