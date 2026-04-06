import { useEffect, useRef, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { productsData } from './date/products'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryFilter from './components/CategoryFilter'
import ProductGrid from './components/ProductGrid'
import ProductDetailModal from './components/ProductDetailModal'
import CartDrawer from './components/CartDrawer'
import FavoritesDrawer from './components/FavoritesDrawer'
import Footer from './components/Footer'

export default function App() {
  const [products] = useState(productsData)
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [detailProduct, setDetailProduct] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const categorySectionRef = useRef(null)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('bitbolt-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('bitbolt-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    })
  }, [])

  const filteredProducts = products.filter(p => {
    const q = searchTerm.trim().toLowerCase()
    const matchesSearch =
      q.length === 0 ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const suggestionPool = [...new Set(products.flatMap(p => [p.name, p.category]))]
  const searchSuggestions = suggestionPool
    .filter(item => item.toLowerCase().includes(searchTerm.trim().toLowerCase()))
    .slice(0, 6)

  const addToCart = (product) => setCart([...cart, product])
  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }
  const isFavorite = (id) => favorites.includes(id)

  const handleSearchFocus = () => {
    categorySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
  }

  const handleCheckout = () => {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID
    if (botToken && chatId) {
      const total = cart.reduce((a, b) => a + b.price, 0)
      const message = `🛒 New BitBolt Order!\n\nItems: ${cart.map(i => i.name).join(', ')}\nTotal: ${total.toLocaleString()}$`
      // In real app you would fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
      console.log('📤 Sent to Telegram bot:', message)
      alert('✅ Order sent to your Telegram bot instantly!')
    } else {
      alert('✅ Order placed! (Telegram bot simulation – add .env keys for real send)')
    }
    setCart([])
    setIsCartOpen(false)
  }

  useEffect(() => {
    AOS.refresh()
  }, [filteredProducts.length])

  return (
    <>
      <Navbar
        cartCount={cart.length}
        favoritesCount={favorites.length}
        searchTerm={searchTerm}
        onSearchChange={e => setSearchTerm(e.target.value)}
        searchSuggestions={searchSuggestions}
        onSelectSuggestion={(value) => setSearchTerm(value)}
        onSearchFocus={handleSearchFocus}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
      />

      <div data-aos="fade-up">
        <Hero />
      </div>

      <div ref={categorySectionRef} data-aos="fade-up" data-aos-delay="80">
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      <div data-aos="fade-up" data-aos-delay="120">
        <ProductGrid
          products={filteredProducts}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          onOpenDetail={setDetailProduct}
          onClearFilters={clearFilters}
        />
      </div>

      <ProductDetailModal
        product={detailProduct}
        isOpen={!!detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        isFavorite={isFavorite(detailProduct?.id)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onRemove={(productId) => {
          const itemIndex = cart.findIndex(item => item.id === productId)
          if (itemIndex === -1) return
          setCart(cart.filter((_, idx) => idx !== itemIndex))
        }}
        subtotal={cart.reduce((a, b) => a + b.price, 0)}
        onCheckout={handleCheckout}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        favorites={products.filter(p => favorites.includes(p.id))}
        onClose={() => setIsFavoritesOpen(false)}
        onAddToCart={addToCart}
      />

      <div data-aos="fade-up" data-aos-delay="60">
        <Footer />
      </div>
    </>
  )
}