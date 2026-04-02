import { useEffect, useState } from 'react'
import { ShoppingCart, Search, User, Heart, Store, Moon, Sun, Menu, X } from 'lucide-react'

export default function Navbar({
  cartCount,
  favoritesCount,
  searchTerm,
  onSearchChange,
  onOpenCart,
  onOpenFavorites,
  isDarkMode,
  onToggleDarkMode,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <nav className="glass sticky top-0 z-50 border-b border-[rgba(123,97,255,0.16)] text-[var(--color-text)]">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 brand-gradient rounded-3xl flex items-center justify-center text-white text-4xl font-bold">B</div>
          <h1 className="logo-font text-4xl tracking-tighter text-[var(--color-text)]">BitBolt</h1>
        </div>

        <div className="hidden md:flex flex-1 max-w-2xl mx-12">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search laptops, phones, tablets..."
              className="glass w-full py-4 px-6 text-lg rounded-3xl outline-none placeholder:text-[var(--color-muted)]"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" size={24} />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button className="flex items-center gap-2 hover:text-[var(--color-primary)]">
            <Store size={22} />
            <span className="hidden sm:inline">Shop</span>
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

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/70 rounded-3xl flex items-center justify-center text-[var(--color-primary)]">
              <User size={22} />
            </div>
            <button
              onClick={onToggleDarkMode}
              className="w-9 h-9 bg-white/70 rounded-3xl flex items-center justify-center text-[var(--color-primary)] hover:opacity-80"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onToggleDarkMode}
            className="w-9 h-9 bg-white/70 rounded-3xl flex items-center justify-center text-[var(--color-primary)]"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-10 h-10 glass rounded-3xl flex items-center justify-center text-[var(--color-primary)]"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998]" onClick={closeMobileMenu}>
          <div className="absolute inset-0 bg-[rgba(30,22,58,0.35)] backdrop-blur-sm" />
          <aside
            onClick={e => e.stopPropagation()}
            className="absolute top-0 right-0 h-full w-[70vw] min-w-[260px] max-w-[420px] glass border-l border-[rgba(123,97,255,0.2)] p-5 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[var(--color-text)]">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="w-9 h-9 bg-white/70 rounded-3xl flex items-center justify-center text-[var(--color-primary)]"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={onSearchChange}
                placeholder="Search name or category..."
                className="glass w-full py-3 px-4 text-base rounded-3xl outline-none placeholder:text-[var(--color-muted)]"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" size={20} />
            </div>

            <button onClick={() => { closeMobileMenu(); onOpenFavorites() }} className="glass py-3 px-4 rounded-3xl text-left text-[var(--color-text)]">
              Favorites ({favoritesCount})
            </button>
            <button onClick={() => { closeMobileMenu(); onOpenCart() }} className="glass py-3 px-4 rounded-3xl text-left text-[var(--color-text)]">
              Cart ({cartCount})
            </button>
            <button onClick={closeMobileMenu} className="glass py-3 px-4 rounded-3xl text-left text-[var(--color-text)]">
              Close Menu
            </button>
          </aside>
        </div>
      )}
    </>
  )
}