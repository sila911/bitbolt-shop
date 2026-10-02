import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import NovaHeroBanner from "../components/NovaHeroBanner";
import CategoryIconRow from "../components/CategoryIconRow";
import PromoCardsRow from "../components/PromoCardsRow";
import NovaProductRail from "../components/NovaProductRail";
import TrustBadges from "../components/TrustBadges";
import RightCartSidebar from "../components/RightCartSidebar";
import { CURATED_DEALS, CURATED_RECOMMENDED } from "../data/curatedProducts";

export default function NovaHomePage({
  products = [],
  cart = [],
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  onToggleFavorite,
  isFavorite,
  favoritesCount = 0,
  searchTerm = "",
  onSearchChange,
  searchSuggestions = [],
  onSelectSuggestion,
  isDarkMode,
  onToggleDarkMode,
  onShopClick
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Blend live products with curated products matching screenshot
  const dealProducts = products.length >= 4 
    ? [...CURATED_DEALS, ...products.slice(0, 4)]
    : CURATED_DEALS;

  const recommendedProducts = products.length >= 8 
    ? [...CURATED_RECOMMENDED, ...products.slice(4, 8)]
    : CURATED_RECOMMENDED;

  return (
    <div className="min-h-screen bg-[#f4f5f9] dark:bg-[#0c0c0e] text-neutral-900 dark:text-neutral-100 flex transition-colors">
      {/* 1. Left Navigation Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        favoritesCount={favoritesCount}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
        onCategorySelect={setSelectedCategory}
      />

      {/* 2. Middle Main Feed Area */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto no-scrollbar">
        {/* Top Header */}
        <TopHeader
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          searchSuggestions={searchSuggestions}
          onSelectSuggestion={onSelectSuggestion}
          favoritesCount={favoritesCount}
          cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenCart={() => setIsMobileCartOpen(true)}
          onOpenFavorites={() => {
            // Can trigger a wishlist drawer or navigate
          }}
        />

        {/* Scrollable Feed Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 space-y-6 sm:space-y-8 max-w-7xl w-full mx-auto">
          {/* Hero Banner */}
          <NovaHeroBanner onShopClick={onShopClick} />

          {/* Category Icons Row */}
          <CategoryIconRow
            selectedCategory={selectedCategory}
            onSelectCategory={(slug) => {
              setSelectedCategory(slug);
              onShopClick?.();
            }}
          />

          {/* 3 Mini Promo Banners: Flash Sale, Free Shipping, New Arrivals */}
          <PromoCardsRow />

          {/* Section 1: "Best Deals for You" */}
          <NovaProductRail
            title="Best Deals for You"
            products={dealProducts}
            variant="deal"
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite}
            viewAllLink="/shop"
          />

          {/* Section 2: "Recommended for You" */}
          <NovaProductRail
            title="Recommended for You"
            products={recommendedProducts}
            variant="recommended"
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite}
            viewAllLink="/shop"
          />

          {/* Trust Badges */}
          <TrustBadges />

          {/* Minimal Clean Footer */}
          <footer className="pt-4 pb-8 text-center text-xs text-neutral-400 font-medium">
            <p>© 2026 NovaShop. All rights reserved. • Curated Fashion, Beauty & Lifestyle</p>
          </footer>
        </main>
      </div>

      {/* 3. Right Persistent Cart & Recommendations Sidebar */}
      <RightCartSidebar
        cart={cart}
        onUpdateQuantity={onUpdateQuantity}
        onRemove={onRemoveFromCart}
        onAddToCart={onAddToCart}
        allProducts={dealProducts}
      />

      {/* Mobile Drawer Version of Right Cart Sidebar */}
      <RightCartSidebar
        cart={cart}
        onUpdateQuantity={onUpdateQuantity}
        onRemove={onRemoveFromCart}
        onAddToCart={onAddToCart}
        allProducts={dealProducts}
        isDrawer={true}
        isOpen={isMobileCartOpen}
        onClose={() => setIsMobileCartOpen(false)}
      />
    </div>
  );
}
