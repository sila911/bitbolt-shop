import { useState, useRef, useEffect } from "react";
import { Search, Heart, Bell, Menu, ShoppingCart, ChevronDown, Check, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopHeader({
  searchTerm,
  onSearchChange,
  searchSuggestions = [],
  onSelectSuggestion,
  favoritesCount = 0,
  cartCount = 0,
  onOpenSidebar,
  onOpenCart,
  onOpenFavorites
}) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative" ref={searchRef}>
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                onSearchChange(e);
                if (e.target.value.trim()) setIsDropdownOpen(true);
              }}
              onFocus={() => {
                if (searchTerm.trim()) setIsDropdownOpen(true);
              }}
              placeholder="Search for products, brands and more..."
              className="w-full bg-neutral-100 dark:bg-neutral-800/90 border border-transparent focus:border-[#6c5ce7] py-2.5 px-4 pr-10 rounded-2xl outline-none text-xs sm:text-sm font-medium transition-all placeholder:text-neutral-400 text-neutral-800 dark:text-neutral-100"
            />
            <Search
              size={18}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
          </div>

          {/* Search Dropdown */}
          {isDropdownOpen && searchTerm.trim() && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden z-30">
              <div className="max-h-[360px] overflow-y-auto no-scrollbar p-2">
                {searchSuggestions.slice(0, 6).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onSelectSuggestion(product);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition-colors"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-10 h-10 rounded-lg object-contain bg-neutral-100 dark:bg-neutral-800 p-1"
                    />
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

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist Button with Badge */}
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

          {/* Notifications with Badge */}
          <button
            onClick={() => {}}
            className="relative p-2.5 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 bg-rose-500 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Mobile/Tablet Cart Toggle Button (< xl) */}
          <button
            onClick={onOpenCart}
            className="xl:hidden relative p-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Open Cart"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#6c5ce7] text-white text-[10px] font-black h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile Pill ("Alina Putri") */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
                alt="Alina Putri"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/20"
              />
              <span className="hidden sm:inline text-xs font-bold text-neutral-800 dark:text-neutral-200">
                Alina Putri
              </span>
              <ChevronDown size={14} className="text-neutral-400" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl py-2 z-40">
                <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
                  <p className="text-xs font-bold text-neutral-900 dark:text-white">Alina Putri</p>
                  <p className="text-[10px] text-neutral-400">alina.putri@novashop.com</p>
                </div>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    navigate("/orders");
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
                >
                  <User size={14} /> My Profile
                </button>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    navigate("/checkout");
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
                >
                  <Check size={14} /> Orders
                </button>
                <div className="border-t border-neutral-100 dark:border-neutral-800 my-1" />
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full px-4 py-2 text-left text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
