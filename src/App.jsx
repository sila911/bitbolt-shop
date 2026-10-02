import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Layout & UI Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ToastManager from "./components/ui/ToastManager";
import CartDrawer from "./components/CartDrawer";
import FavoritesDrawer from "./components/FavoritesDrawer";
import CheckoutInfoModal from "./components/CheckoutInfoModal";
import ProductDetailModal from "./components/ProductDetailModal";

// Pages
import NovaHomePage from "./pages/NovaHomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LookbookPage from "./pages/LookbookPage";
import CheckoutPage from "./pages/CheckoutPage";
import ExclusiveDropPage from "./pages/ExclusiveDropPage";

// Hooks & Services
import { useCart } from "./hooks/useCart";
import { useFavorites } from "./hooks/useFavorites";
import { useTheme } from "./hooks/useTheme";
import { useToast } from "./hooks/useToast";
import { useProducts } from "./hooks/useProducts";
import { sendTelegramOrder } from "./services/telegramService";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Context Hooks
  const { cart, cartTotal, setCart, isCartOpen, setIsCartOpen, isCheckoutInfoOpen, setIsCheckoutInfoOpen } = useCart();
  const { isFavoritesOpen, setIsFavoritesOpen } = useFavorites();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { addToast } = useToast();

  // Local UI State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [detailProduct, setDetailProduct] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Products Data
  const { products, categories, isLoading, error } = useProducts(selectedCategory, searchTerm);

  // Init Animations
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [products.length]);

  // Handle Telegram Concierge Checkout
  const handleTelegramCheckout = async (customerInfo) => {
    if (cart.length === 0 || isCheckingOut) return;

    try {
      setIsCheckingOut(true);
      await sendTelegramOrder(cart, customerInfo, cartTotal);
      addToast("Order Sent", "Your request has been sent to our Telegram concierge.", "success");
      setCart([]);
      setIsCheckoutInfoOpen(false);
      setIsCartOpen(false);
    } catch (err) {
      addToast("Send Failed", err.message || "Failed to send order to Telegram", "error");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f5f9] dark:bg-[#0c0c0e] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Navbar (outside Home) */}
      {!isHome && (
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          searchSuggestions={searchTerm.trim() ? products.slice(0, 6) : []}
          onSelectSuggestion={(product) => {
            navigate(`/product/${product.id}`);
            setSearchTerm("");
          }}
        />
      )}

      {/* Global Toast Notifications */}
      <ToastManager />

      {/* Application Routing */}
      <Routes>
        <Route
          path="/"
          element={
            <NovaHomePage
              products={products}
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              searchSuggestions={searchTerm.trim() ? products.slice(0, 6) : []}
              onSelectSuggestion={(product) => {
                navigate(`/product/${product.id}`);
                setSearchTerm("");
              }}
            />
          }
        />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/lookbook" element={<LookbookPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/exclusive-drop" element={<ExclusiveDropPage />} />
      </Routes>

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={detailProduct}
        isOpen={Boolean(detailProduct)}
        onClose={() => setDetailProduct(null)}
      />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} isCheckingOut={isCheckingOut} />

      <FavoritesDrawer isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />

      <CheckoutInfoModal
        isOpen={isCheckoutInfoOpen}
        onClose={() => setIsCheckoutInfoOpen(false)}
        onSubmit={handleTelegramCheckout}
        isSubmitting={isCheckingOut}
      />

      {/* Footer (outside Home) */}
      {!isHome && <Footer />}
    </div>
  );
}
