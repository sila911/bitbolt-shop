import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchAllProducts, fetchCategories, fetchProductsByCategory, searchProducts } from "./services/productApi";
import { ProductGridSkeleton } from "./components/ProductSkeleton";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCategories from "./components/FeaturedCategories";
import CollectionsGrid from "./components/CollectionsGrid";
import CategoryFilter from "./components/CategoryFilter";
import ProductGrid from "./components/ProductGrid";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import FavoritesDrawer from "./components/FavoritesDrawer";
import CheckoutInfoModal from "./components/CheckoutInfoModal";
import StatusPopup from "./components/StatusPopup";
import Footer from "./components/Footer";

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [detailProduct, setDetailProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutInfoOpen, setIsCheckoutInfoOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [popup, setPopup] = useState({
    isOpen: false,
    title: "",
    message: "",
    tone: "success",
  });
  const categorySectionRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("bitbolt-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("bitbolt-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Initial Load: Categories only
  useEffect(() => {
    const initLoad = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    initLoad();
  }, []);

  // Consolidated Data Fetching with Debounce & AbortController
  useEffect(() => {
    const controller = new AbortController();
    
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let fetched;
        if (searchTerm.trim()) {
          fetched = await searchProducts(searchTerm, controller.signal);
        } else if (selectedCategory !== "All") {
          fetched = await fetchProductsByCategory(selectedCategory, controller.signal);
        } else {
          fetched = await fetchAllProducts(30, 0, controller.signal);
        }

        if (fetched !== null) {
          setProducts(fetched);
          setIsLoading(false);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    const debounceTimer = setTimeout(() => {
      loadData();
    }, searchTerm.trim() ? 400 : 0); // Only debounce for search typing

    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
    setPopup({
      isOpen: true,
      title: "Added to Cart",
      message: `${product.title} has been added to your cart.`,
      tone: "success",
    });
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };
  const isFavorite = (id) => favorites.includes(id);

  const handleSearchFocus = () => {
    categorySectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  const handleCheckout = async (customerInfo) => {
    if (cart.length === 0 || isCheckingOut) return;

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      setPopup({
        isOpen: true,
        title: "Telegram Config Missing",
        message:
          "Add VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in your .env file.",
        tone: "error",
      });
      return;
    }

    const total = cart.reduce((a, b) => a + b.price, 0);
    const orderLines = cart.map(
      (item, index) =>
        `${index + 1}. ${item.title} - ${item.price.toLocaleString()}$`,
    );
    const message = [
      "New BitBolt Order!",
      "",
      `Full name: ${customerInfo.fullName}`,
      `Phone: ${customerInfo.phoneNumber}`,
      `Telegram: ${customerInfo.telegram}`,
      `E-mail: ${customerInfo.email || "N/A"}`,
      `Address: ${customerInfo.address}`,
      `Google map: ${customerInfo.mapLocation}`,
      `Mark: ${customerInfo.mark || "N/A"}`,
      "",
      "Items:",
      orderLines.join("\n"),
      "",
      `Total: ${total.toLocaleString()}$`,
    ].join("\n");

    try {
      setIsCheckingOut(true);

      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.description || "Telegram API request failed");
      }

      setPopup({
        isOpen: true,
        title: "Order Sent",
        message: "Order sent to Telegram successfully!",
        tone: "success",
      });
      setCart([]);
      setIsCheckoutInfoOpen(false);
      setIsCartOpen(false);
    } catch (error) {
      setPopup({
        isOpen: true,
        title: "Send Failed",
        message: `Failed to send order to Telegram: ${error.message}`,
        tone: "error",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const openCheckoutInfo = () => {
    if (cart.length === 0 || isCheckingOut) return;
    setIsCheckoutInfoOpen(true);
  };

  useEffect(() => {
    AOS.refresh();
  }, [products.length]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <Navbar
        cartCount={cart.length}
        favoritesCount={favorites.length}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        searchSuggestions={searchTerm.trim() ? products.slice(0, 6) : []}
        onSelectSuggestion={(product) => {
          setDetailProduct(product);
          setSearchTerm("");
        }}
        onSearchFocus={handleSearchFocus}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
      />

      <div data-aos="fade-up">
        <Hero />
      </div>

      <div data-aos="fade-up" data-aos-delay="50">
        <FeaturedCategories onSelect={(slug) => {
          setSelectedCategory(slug);
          handleSearchFocus();
        }} />
      </div>

      <div ref={categorySectionRef} data-aos="fade-up" data-aos-delay="80">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <div data-aos="fade-up" data-aos-delay="100">
        <CollectionsGrid onSelect={(slug) => {
          setSelectedCategory(slug);
          handleSearchFocus();
        }} />
      </div>

      <div className="min-h-[600px] transition-all duration-300">
        {error ? (
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-12 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-4">Connection Error</h3>
              <p className="text-red-600 dark:text-red-500 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Retry Connection
              </button>
            </div>
          </div>
        ) : (
          <div data-aos="fade-up" data-aos-delay="120">
            <ProductGrid
              products={products}
              isLoading={isLoading}
              onAddToCart={addToCart}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              onOpenDetail={setDetailProduct}
              onClearFilters={clearFilters}
            />
          </div>
        )}
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
        onRemove={(cartId) => {
          setCart(cart.filter((item) => item.cartId !== cartId));
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
        onClose={() => setPopup((prev) => ({ ...prev, isOpen: false }))}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        favorites={products.filter((p) => favorites.includes(p.id))}
        onClose={() => setIsFavoritesOpen(false)}
        onAddToCart={addToCart}
        onRemoveFavorite={(id) => toggleFavorite(id)}
      />

      <div data-aos="fade-up" data-aos-delay="60">
        <Footer />
      </div>
    </div>
  );
}
