import { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchAllProducts, fetchCategories, fetchProductsByCategory, searchProducts } from "./services/productApi";

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
import ToastManager from "./components/ToastManager";
import Footer from "./components/Footer";
import PromoBanner from "./components/PromoBanner";

// Pages
import LookbookPage from "./pages/LookbookPage";
import ShopPage from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";
import ExclusiveDropPage from "./pages/ExclusiveDropPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NovaHomePage from "./pages/NovaHomePage";

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cart with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("bitbolt-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites with localStorage persistence
  const [favoriteItems, setFavoriteItems] = useState(() => {
    try {
      const saved = localStorage.getItem("bitbolt-favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [detailProduct, setDetailProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutInfoOpen, setIsCheckoutInfoOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [toasts, setToasts] = useState([]);
  const categorySectionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("bitbolt-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    try {
      localStorage.setItem("bitbolt-cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("bitbolt-favorites", JSON.stringify(favoriteItems));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteItems]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("bitbolt-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const addToast = (title, message, tone = "success", dedupeKey = null) => {
    const id = Date.now();
    
    setToasts((prev) => {
      // Deduplication Logic: Check if a toast with the same dedupeKey or title+message exists
      const isDuplicate = prev.some(t => {
        if (dedupeKey && t.dedupeKey === dedupeKey) return true;
        if (!dedupeKey && t.title === title && typeof t.message === 'string' && t.message === message) return true;
        return false;
      });
      
      if (isDuplicate) return prev;
      return [...prev, { id, title, message, tone, dedupeKey }];
    });
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

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
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        addToast(
          "Quantity Updated",
          <span>Increased <span className="text-neutral-900 dark:text-white font-bold">{product.title}</span> quantity in your collection.</span>,
          "success",
          `cart-update-${product.id}`
        );
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        }
        addToast(
        "Added to Cart",
        <span><span className="text-white font-bold">{product.title}</span> has been added to your collection.</span>,
        "success",
        `cart-add-${product.id}`
        );      return [...prevCart, { ...product, quantity: 1, cartId: Date.now() }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    addToast("Item Removed", "Product removed from your collection.", "info", `cart-remove-${productId}`);
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleFavorite = (productOrId) => {
    const id = typeof productOrId === "object" ? productOrId.id : productOrId;
    setFavoriteItems((prev) => {
      const exists = prev.some((item) => item.id === id);
      if (exists) {
        addToast("Wishlist Updated", "Item removed from your wishlist.", "info");
        return prev.filter((item) => item.id !== id);
      } else {
        const found = typeof productOrId === "object" ? productOrId : products.find((p) => p.id === id);
        addToast("Saved to Wishlist", "Item added to your wishlist.", "success");
        return found ? [...prev, found] : [...prev, { id, title: `Product #${id}`, price: 0 }];
      }
    });
  };
  const isFavorite = (id) => favoriteItems.some((item) => item.id === id);

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
      addToast(
        "Config Missing",
        "Telegram API credentials not found in environment.",
        "error"
      );
      return;
    }

    const total = cartTotal;
    const orderLines = cart.map(
      (item, index) =>
        `${index + 1}. ${item.title} (x${item.quantity}) - ${(item.price * item.quantity).toLocaleString()}$`,
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

      addToast(
        "Order Sent",
        "Your request has been sent to our Telegram concierge.",
        "success"
      );
      setCart([]);
      setIsCheckoutInfoOpen(false);
      setIsCartOpen(false);
    } catch (error) {
      addToast(
        "Send Failed",
        `Failed to send order to Telegram: ${error.message}`,
        "error"
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    AOS.refresh();
  }, [products.length]);

  const HomePage = () => (
    <>
      <div data-aos="fade-up">
        <Hero onShopClick={() => navigate("/shop")} onViewLookbook={() => navigate("/lookbook")} />
      </div>

      <div data-aos="fade-up" data-aos-delay="50">
        <FeaturedCategories onSelect={(slug) => {
          setSelectedCategory(slug);
          handleSearchFocus();
        }} />
      </div>

      <div data-aos="fade-up" data-aos-delay="80">
        <PromoBanner />
      </div>

      <div data-aos="fade-up" data-aos-delay="120">
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
          <div data-aos="fade-up" data-aos-delay="150">
            <ProductGrid
              products={products}
              isLoading={isLoading}
              onAddToCart={addToCart}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              onOpenDetail={(product) => navigate(`/product/${product.id}`)}
              onClearFilters={clearFilters}
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              gridRef={categorySectionRef}
            />
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f4f5f9] dark:bg-[#0c0c0e] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {!isHome && (
        <Navbar
          cartCount={cartCount}
          favoritesCount={favoriteItems.length}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          searchSuggestions={searchTerm.trim() ? products.slice(0, 6) : []}
          onSelectSuggestion={(product) => {
            navigate(`/product/${product.id}`);
            setSearchTerm("");
          }}
          onSearchFocus={handleSearchFocus}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenFavorites={() => setIsFavoritesOpen(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        />
      )}

      <ToastManager toasts={toasts} removeToast={removeToast} />

      <Routes>
        <Route
          path="/"
          element={
            <NovaHomePage
              products={products}
              cart={cart}
              onAddToCart={addToCart}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              favoritesCount={favoriteItems.length}
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              searchSuggestions={searchTerm.trim() ? products.slice(0, 6) : []}
              onSelectSuggestion={(product) => {
                navigate(`/product/${product.id}`);
                setSearchTerm("");
              }}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
              onShopClick={() => navigate("/shop")}
            />
          }
        />
        <Route path="/shop" element={<ShopPage onAddToCart={addToCart} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />} />
        <Route path="/product/:id" element={<ProductDetailPage onAddToCart={addToCart} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} addToast={addToast} />} />
        <Route path="/lookbook" element={<LookbookPage />} />
        <Route path="/checkout" element={<CheckoutPage 
          cart={cart} 
          total={cartTotal} 
          clearCart={clearCart} 
          addToast={addToast} 
        />} />
        <Route path="/exclusive-drop" element={<ExclusiveDropPage />} />
      </Routes>

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
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        subtotal={cartTotal}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate("/checkout");
        }}
        isCheckingOut={isCheckingOut}
      />

      <CheckoutInfoModal
        isOpen={isCheckoutInfoOpen}
        onClose={() => setIsCheckoutInfoOpen(false)}
        onSubmit={handleCheckout}
        isSubmitting={isCheckingOut}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        favorites={favoriteItems}
        onClose={() => setIsFavoritesOpen(false)}
        onAddToCart={addToCart}
        onRemoveFavorite={(id) => toggleFavorite(id)}
      />

      {!isHome && (
        <div data-aos="fade-up" data-aos-delay="60">
          <Footer />
        </div>
      )}
    </div>
  );
}
