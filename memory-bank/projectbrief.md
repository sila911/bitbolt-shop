# Project Brief: BitBolt E-Commerce ⚡

## Overview
BitBolt is a high-performance, dark-aesthetic e-commerce storefront web application built with React 19, Vite 8, and Tailwind CSS. It is designed to provide a snappy, premium shopping experience featuring real-time product browsing, category filtering, search suggestions, drawer/modal-based interactions, persistent cart and wishlist systems, and Telegram order dispatching.

## Core Goals
1. **Premium Aesthetic & Performance**: Deliver a modern, high-contrast dark-mode first design with smooth micro-interactions and scroll animations (AOS).
2. **Product Catalog & Discovery**: Fetch and display real-world product data with categories, detailed specifications, ratings, stock status, search autocomplete, and curated feature rails.
3. **Seamless Cart & Wishlist**: Client-side state management for cart operations (add, quantity increment/decrement, remove, totals) and wishlist items, backed by LocalStorage persistence.
4. **Checkout & Order Dispatch**: Support both modal-based Telegram concierge checkout and a dedicated multi-column checkout page.

## Core Features & User Flows
- **Home View (`NovaHomePage`)**:
  - Hero banner with promotional CTA.
  - Category icon rail for quick filtering.
  - Promo card highlights.
  - Curated deals & recommended product rails (combining local curated mocks and live API products).
  - Collapsible desktop/mobile drawer navigation (`Sidebar`, `RightCartSidebar`).
  - Search bar with instant suggestions and keyboard navigation.
- **Shop Catalog (`ShopPage`)**:
  - Full product browsing with category filtering and sorting (price low-to-high, price high-to-low, featured).
  - Responsive product card grid with loading skeleton states (`ProductSkeleton`).
- **Product Detail (`ProductDetailPage` & `ProductDetailModal`)**:
  - Rich image galleries, ratings, stock alerts, specifications, and related products.
  - Quick action to add to cart or toggle favorite.
- **Cart & Favorites Drawers (`CartDrawer`, `FavoritesDrawer`)**:
  - Slide-over drawers accessible globally across non-home pages or within the home layout.
- **Checkout Systems**:
  - `CheckoutInfoModal`: Collects delivery information (full name, phone, telegram handle, email, address, map location, mark) and dispatches order payload to a Telegram channel/bot via Telegram Bot API.
  - `CheckoutPage`: Standalone multi-step form view for direct order review, payment method selection, and submission.
- **Global Feedback**:
  - `ToastManager` and `useToast` hook for contextual notifications (success, warning, error, info).
