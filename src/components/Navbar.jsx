import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Search, Heart, Moon, Sun } from "lucide-react";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);

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

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const showDropdown = isDropdownOpen && searchTerm.trim() && searchSuggestions && searchSuggestions.length > 0;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled 
        ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl py-3 shadow-xl" 
        : "bg-transparent py-6"
    }`}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-neutral-900 text-xl font-black group-hover:scale-110 transition-transform">
            B
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-neutral-900 dark:text-white uppercase">
            Bit<span className="text-neutral-400">Bolt</span>
          </h1>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-xl relative group" ref={searchContainerRef}>
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                onSearchChange(e);
                if (e.target.value.trim()) setIsDropdownOpen(true);
              }}
              onFocus={() => {
                onSearchFocus();
                if (searchTerm.trim()) setIsDropdownOpen(true);
              }}
              placeholder="Search our collection..."
              className="w-full bg-neutral-100 dark:bg-neutral-900 border-2 border-transparent focus:border-neutral-900 dark:focus:border-white py-3 px-6 pl-12 rounded-2xl outline-none transition-all duration-300 text-sm font-bold uppercase tracking-widest"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 dark:group-focus-within:text-white transition-colors"
              size={18}
            />
          </div>

          {/* Search Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden z-[110] animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                <div className="p-4 grid gap-2">
                  <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">Quick Results</p>
                  {searchSuggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        onSelectSuggestion(product);
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left group/item"
                    >
                      <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 overflow-hidden p-1">
                        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white truncate group-hover/item:text-primary transition-colors">{product.title}</h4>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{product.category.replace('-', ' ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-neutral-900 dark:text-white">${product.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setIsDropdownOpen(false)}
                className="w-full p-4 bg-neutral-50 dark:bg-neutral-800/50 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors border-t border-neutral-100 dark:border-neutral-800"
              >
                View all results for "{searchTerm}"
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          <button
            onClick={onToggleDarkMode}
            className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={onOpenFavorites}
            className="relative p-3 bg-neutral-100 dark:bg-neutral-900 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <Heart size={20} />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-white/20 dark:bg-neutral-900/10 px-2 py-0.5 rounded-md">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
