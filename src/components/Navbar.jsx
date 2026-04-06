import { useEffect, useRef, useState } from 'react'
import { ShoppingCart, Search, Heart, Moon, Sun } from 'lucide-react'

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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const mobileSearchRef = useRef(null)

  useEffect(() => {
    if (!isMobileSearchOpen) return

    const onPointerDown = (event) => {
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
        setIsMobileSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [isMobileSearchOpen])

  return (
    <>
      <nav className="glass sticky top-0 z-50 border-b border-[rgba(123,97,255,0.16)] text-[var(--color-text)]">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-2 md:py-2.5 flex items-center justify-between gap-3">
        <div className={`${isMobileSearchOpen ? 'hidden lg:flex' : 'flex'} items-center gap-3`}>
          <div className="w-8 h-8 md:w-9 md:h-9 brand-gradient rounded-3xl flex items-center justify-center text-white text-xl md:text-3xl font-bold">B</div>
          <h1 className="logo-font text-xl md:text-3xl tracking-tighter text-[var(--color-text)]">BitBolt</h1>
        </div>

        <div className="hidden lg:flex flex-1 max-w-2xl mx-12">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={onSearchChange}
              onFocus={onSearchFocus}
              placeholder="Search laptops, phones, tablets..."
              className="glass w-full py-3 px-5 text-base rounded-3xl outline-none placeholder:text-[var(--color-muted)]"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" size={24} />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <button
            onClick={onToggleDarkMode}
            className="flex items-center gap-2 hover:text-[var(--color-primary)]"
            aria-label="Toggle dark or light mode"
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            <span className="hidden sm:inline">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <button onClick={onOpenFavorites} className="relative flex items-center gap-2 hover:text-[var(--color-primary)]">
            <Heart size={24} />
            <span className="absolute -top-1 -right-1 brand-gradient text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{favoritesCount}</span>
            <span className="hidden sm:inline">Favorites</span>
          </button>

          <button onClick={onOpenCart} className="relative flex items-center gap-2 hover:text-[var(--color-primary)]">
            <ShoppingCart size={28} />
            <span className="absolute -top-1 -right-1 brand-gradient text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
            <span className="hidden sm:inline">Cart</span>
          </button>
        </div>

        <div className={`lg:hidden flex items-center gap-2 ${isMobileSearchOpen ? 'flex-1' : ''}`}>
          {isMobileSearchOpen ? (
            <div ref={mobileSearchRef} className="relative flex-1 z-[60]">
              <div className="relative">
                <input
                  autoFocus
                  type="text"
                  value={searchTerm}
                  onChange={onSearchChange}
                  onFocus={onSearchFocus}
                  placeholder="Search products..."
                  className="glass w-full py-2.5 pl-4 pr-10 text-sm rounded-3xl outline-none placeholder:text-[var(--color-muted)]"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" size={18} />
              </div>
              {searchSuggestions?.length > 0 && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 glass border border-[rgba(123,97,255,0.16)] rounded-2xl overflow-hidden shadow-lg">
                  {searchSuggestions.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        onSelectSuggestion?.(item)
                        setIsMobileSearchOpen(false)
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/30 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="w-9 h-9 bg-white/70 rounded-3xl flex items-center justify-center text-[var(--color-primary)]"
                aria-label="Toggle mobile search"
              >
                <Search size={18} />
              </button>
              <button
                onClick={onOpenFavorites}
                className="relative w-9 h-9 bg-white/70 rounded-3xl flex items-center justify-center text-[var(--color-primary)]"
                aria-label="Open favorites"
              >
                <Heart size={18} />
                <span className="absolute -top-1 -right-1 brand-gradient text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full font-bold">{favoritesCount}</span>
              </button>
              <button
                onClick={onOpenCart}
                className="relative w-9 h-9 bg-white/70 rounded-3xl flex items-center justify-center text-[var(--color-primary)]"
                aria-label="Open cart"
              >
                <ShoppingCart size={18} />
                <span className="absolute -top-1 -right-1 brand-gradient text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full font-bold">{cartCount}</span>
              </button>
              <button
                onClick={onToggleDarkMode}
                className="w-9 h-9 bg-white/70 rounded-3xl flex items-center justify-center text-[var(--color-primary)]"
                aria-label="Toggle dark or light mode"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </>
          )}
        </div>
      </div>
      </nav>

      {isMobileSearchOpen && (
        <button
          className="lg:hidden fixed inset-0 z-[55]"
          aria-label="Close mobile search"
          onClick={() => setIsMobileSearchOpen(false)}
        />
      )}
    </>
  )
}