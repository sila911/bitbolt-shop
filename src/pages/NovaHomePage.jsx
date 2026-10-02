import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import TopHeader from "../components/layout/TopHeader";
import RightCartSidebar from "../components/layout/RightCartSidebar";
import NovaHeroBanner from "../components/NovaHeroBanner";
import CategoryIconRow from "../components/CategoryIconRow";
import PromoCardsRow from "../components/ui/PromoCardsRow";
import NovaProductRail from "../components/NovaProductRail";
import TrustBadges from "../components/ui/TrustBadges";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { useTheme } from "../hooks/useTheme";

export default function NovaHomePage({
  products = [],
  cart: propCart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  onToggleFavorite,
  isFavorite,
  favoritesCount: propFavoritesCount,
  searchTerm = "",
  onSearchChange,
  searchSuggestions = [],
  onSelectSuggestion,
  isDarkMode: propIsDarkMode,
  onToggleDarkMode: propOnToggleDarkMode,
  onShopClick,
}) {
  const navigate = useNavigate();
  const cartCtx = useCart();
  const favCtx = useFavorites();
  const themeCtx = useTheme();

  const cart = propCart ?? cartCtx?.cart ?? [];
  const handleAddToCart = onAddToCart ?? cartCtx?.addToCart;
  const handleUpdateQuantity = onUpdateQuantity ?? cartCtx?.updateQuantity;
  const handleRemoveFromCart = onRemoveFromCart ?? cartCtx?.removeFromCart;
  const handleToggleFavorite = onToggleFavorite ?? favCtx?.toggleFavorite;
  const checkIsFavorite = isFavorite ?? ((id) => favCtx?.isFavorite?.(id));
  const favoritesCount = propFavoritesCount ?? favCtx?.favoritesCount ?? 0;
  const isDarkMode = propIsDarkMode ?? themeCtx?.isDarkMode ?? false;
  const onToggleDarkMode = propOnToggleDarkMode ?? themeCtx?.toggleDarkMode;
  const handleShopClick = onShopClick ?? (() => navigate("/shop"));

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [isDesktopCartOpen, setIsDesktopCartOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleToggleCart = () => {
    setIsMobileCartOpen((prev) => !prev);
    setIsDesktopCartOpen((prev) => !prev);
  };

  // Derive deals dynamically from live API products with discount percentage
  const dealProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    const deals = [...products]
      .filter((p) => (p.discountPercentage || 0) >= 8)
      .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    return deals.length >= 4 ? deals : products.slice(0, 8);
  }, [products]);

  // Derive recommended products dynamically from live API products with top ratings
  const recommendedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    const top = [...products]
      .filter((p) => (p.rating || 0) >= 4.0)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return top.length >= 4 ? top : products.slice(4, 12);
  }, [products]);

  return (
    <div className="min-h-screen bg-[#f4f5f9] dark:bg-[#0c0c0e] text-neutral-900 dark:text-neutral-100 flex transition-colors">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        favoritesCount={favoritesCount}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
        onCategorySelect={setSelectedCategory}
      />

      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto no-scrollbar">
        <TopHeader
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          searchSuggestions={searchSuggestions}
          onSelectSuggestion={onSelectSuggestion}
          favoritesCount={favoritesCount}
          cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenCart={handleToggleCart}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-7 space-y-6 sm:space-y-8 max-w-7xl w-full mx-auto">
          <NovaHeroBanner onShopClick={handleShopClick} />

          <CategoryIconRow
            selectedCategory={selectedCategory}
            onSelectCategory={(slug) => {
              setSelectedCategory(slug);
              if (slug === "All") {
                navigate("/shop");
              } else {
                navigate(`/shop?category=${encodeURIComponent(slug)}`);
              }
            }}
          />

          <PromoCardsRow />

          <NovaProductRail
            title="Best Deals for You"
            products={dealProducts}
            variant="deal"
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={checkIsFavorite}
            viewAllLink="/shop?filter=deals"
          />

          <NovaProductRail
            title="Recommended for You"
            products={recommendedProducts}
            variant="recommended"
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={checkIsFavorite}
            viewAllLink="/shop?filter=best-sellers"
          />

          <TrustBadges />

          <footer className="pt-4 pb-8 text-center text-xs text-neutral-400 font-medium">
            <p>© 2026 BitBolt. All rights reserved. • Curated Fashion, Beauty & Lifestyle</p>
          </footer>
        </main>
      </div>

      <RightCartSidebar
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onAddToCart={handleAddToCart}
        allProducts={products.length > 0 ? products : dealProducts}
        isDesktopOpen={isDesktopCartOpen}
        onCloseDesktop={() => setIsDesktopCartOpen(false)}
        isOpen={isMobileCartOpen}
        onClose={() => setIsMobileCartOpen(false)}
      />
    </div>
  );
}
