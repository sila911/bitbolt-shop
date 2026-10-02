import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, SearchNormal1 as Search, CloseCircle as X, Flash as Flame, ArrowRight, Star1 as Star } from "iconsax-react";
import { searchProducts } from "../api";

const POPULAR_SEARCHES = [
  "Smartphones",
  "Sneakers",
  "Hoodie",
  "Perfume",
  "Watches",
  "Sunglasses",
  "Laptops",
  "Wireless Earbuds",
  "Summer Sale",
  "Skincare",
  "Minimalist Tee"
];

const DISCOVERY_CARDS = [
  {
    id: 1,
    title: "Minimal Streetwear",
    subtitle: "New Season Drops",
    link: "/shop?category=mens-shirts",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    title: "Urban Tech Essentials",
    subtitle: "Curated Daily Carry",
    link: "/shop?category=smartphones",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
  },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const stored = localStorage.getItem("bitbolt_recent_searches");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Auto-focus search input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Save recent search
  const saveSearchTerm = (term) => {
    if (!term.trim()) return;
    const cleanTerm = term.trim();
    setRecentSearches((prev) => {
      const updated = [cleanTerm, ...prev.filter((t) => t.toLowerCase() !== cleanTerm.toLowerCase())].slice(0, 8);
      try {
        localStorage.setItem("bitbolt_recent_searches", JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem("bitbolt_recent_searches");
    } catch {
      // Ignore storage errors
    }
  };

  // Live search effect with abort controller
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const data = await searchProducts(query.trim(), controller.signal);
        if (!controller.signal.aborted && data) {
          setResults(data);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Search failed", err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  // Execute full search navigation
  const handleExecuteSearch = (searchTerm) => {
    const term = searchTerm || query;
    if (!term.trim()) return;
    saveSearchTerm(term);
    navigate(`/shop?q=${encodeURIComponent(term.trim())}`);
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleExecuteSearch();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col">
      {/* Top Search Bar Header */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 px-4 py-3.5 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="flex-1 relative">
          <div className="relative flex items-center">
            <Search
              size={18}
              className="absolute left-3.5 text-neutral-400 pointer-events-none"
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for what you want"
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-transparent focus:border-[#6c5ce7] py-2.5 pl-10 pr-9 rounded-2xl outline-none text-sm font-medium transition-all placeholder:text-neutral-400 text-neutral-900 dark:text-neutral-100"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="absolute right-2.5 p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                aria-label="Clear input"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {query.trim() && (
          <button
            onClick={() => handleExecuteSearch()}
            className="px-3 py-1.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold uppercase tracking-wider transition-opacity active:scale-95"
          >
            Search
          </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 space-y-7">
        {/* If user is typing: display live search results */}
        {query.trim() ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {isLoading ? "Searching catalog..." : `${results.length} results for "${query}"`}
              </h2>
              {results.length > 0 && (
                <button
                  onClick={() => handleExecuteSearch()}
                  className="text-xs font-bold text-[#6c5ce7] dark:text-[#a29bfe] hover:underline flex items-center gap-1"
                >
                  View all <ArrowRight size={13} />
                </button>
              )}
            </div>

            {results.length > 0 ? (
              <div className="space-y-2">
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      saveSearchTerm(query);
                      navigate(`/product/${product.id}`);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-left transition-all group"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-12 h-12 rounded-xl object-contain bg-white dark:bg-neutral-800 p-1 border border-neutral-200/50 dark:border-neutral-700/50 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate group-hover:text-[#6c5ce7] transition-colors">
                        {product.title}
                      </h4>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-wider">
                        {product.category?.replace("-", " ")}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-black text-neutral-900 dark:text-white">${product.price}</p>
                      {product.rating && (
                        <p className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5 justify-end">
                          <Star size={10} variant="Bold" /> {product.rating}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : !isLoading ? (
              <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-900/40 rounded-3xl p-8 border border-neutral-200/60 dark:border-neutral-800">
                <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-1">No products found</p>
                <p className="text-xs text-neutral-400 mb-4">Try checking your spelling or search for popular terms.</p>
                <button
                  onClick={() => handleExecuteSearch()}
                  className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold"
                >
                  Browse Catalog
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          /* Empty / Default Search State (matching provided screenshot) */
          <>
            {/* Visual Lookbook / Discovery Cards */}
            <div className="grid grid-cols-12 gap-3 sm:gap-4">
              <div
                onClick={() => navigate(DISCOVERY_CARDS[0].link)}
                className="col-span-5 relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={DISCOVERY_CARDS[0].image}
                  alt={DISCOVERY_CARDS[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-3 sm:p-4 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">{DISCOVERY_CARDS[0].subtitle}</p>
                  <p className="text-xs sm:text-sm font-black leading-tight">{DISCOVERY_CARDS[0].title}</p>
                </div>
              </div>

              <div
                onClick={() => navigate(DISCOVERY_CARDS[1].link)}
                className="col-span-7 relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={DISCOVERY_CARDS[1].image}
                  alt={DISCOVERY_CARDS[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-3 sm:p-4 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">{DISCOVERY_CARDS[1].subtitle}</p>
                  <p className="text-xs sm:text-sm font-black leading-tight">{DISCOVERY_CARDS[1].title}</p>
                </div>
              </div>
            </div>

            {/* Recent Searches (if available) */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-black tracking-tight text-neutral-900 dark:text-white">
                    Recent searches
                  </h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-[11px] font-bold text-neutral-400 hover:text-rose-500 transition-colors"
                  >
                    Clear
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleExecuteSearch(term)}
                      className="px-3.5 py-2 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all text-neutral-700 dark:text-neutral-300 active:scale-95"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <div className="flex items-center gap-1.5 mb-3.5">
                <Flame size={18} className="text-[#6c5ce7]" />
                <h3 className="text-base font-black tracking-tight text-neutral-900 dark:text-white">
                  Popular searches
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {POPULAR_SEARCHES.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => handleExecuteSearch(term)}
                    className="px-4 py-2 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-800/90 transition-all active:scale-95 shadow-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
