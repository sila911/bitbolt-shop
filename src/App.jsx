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
import CheckoutInfoModal from './components/CheckoutInfoModal'
import StatusPopup from './components/StatusPopup'
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
  const [isCheckoutInfoOpen, setIsCheckoutInfoOpen] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '', tone: 'success' })
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

  const handleCheckout = async (customerInfo) => {
    if (cart.length === 0 || isCheckingOut) return

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      setPopup({
        isOpen: true,
        title: 'Telegram Config Missing',
        message: 'Add VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in your .env file.',
        tone: 'error',
      })
      return
    }

    const total = cart.reduce((a, b) => a + b.price, 0)
    const orderLines = cart.map((item, index) => `${index + 1}. ${item.name} - ${item.price.toLocaleString()}$`)
    const message = [
      'New BitBolt Order!',
      '',
      `Full name: ${customerInfo.fullName}`,
      `Phone: ${customerInfo.phoneNumber}`,
      `Telegram: ${customerInfo.telegram}`,
      `E-mail: ${customerInfo.email || 'N/A'}`,
      `Address: ${customerInfo.address}`,
      `Google map: ${customerInfo.mapLocation}`,
      `Mark: ${customerInfo.mark || 'N/A'}`,
      '',
      'Items:',
      orderLines.join('\n'),
      '',
      `Total: ${total.toLocaleString()}$`,
    ].join('\n')

    try {
      setIsCheckingOut(true)

      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error(data.description || 'Telegram API request failed')
      }

      setPopup({
        isOpen: true,
        title: 'Order Sent',
        message: 'Order sent to Telegram successfully!',
        tone: 'success',
      })
      setCart([])
      setIsCheckoutInfoOpen(false)
      setIsCartOpen(false)
    } catch (error) {
      setPopup({
        isOpen: true,
        title: 'Send Failed',
        message: `Failed to send order to Telegram: ${error.message}`,
        tone: 'error',
      })
    } finally {
      setIsCheckingOut(false)
    }
  }

  const openCheckoutInfo = () => {
    if (cart.length === 0 || isCheckingOut) return
    setIsCheckoutInfoOpen(true)
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
        onCheckout={openCheckoutInfo}
        isCheckingOut={isCheckingOut}
      />

      <CheckoutInfoModal
        isOpen={isCheckoutInfoOpen}
        onClose={() => setIsCheckoutInfoOpen(false)}
        onSubmit={handleCheckout}
        isSubmitting={isCheckingOut}
      />

      <StatusPopup
        isOpen={popup.isOpen}
        title={popup.title}
        message={popup.message}
        tone={popup.tone}
        onClose={() => setPopup(prev => ({ ...prev, isOpen: false }))}
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