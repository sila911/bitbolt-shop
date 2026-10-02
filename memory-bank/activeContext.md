# Active Context: BitBolt

## Current Status

- The codebase is functional, compiles cleanly with Vite (`npm run build` succeeds in ~1.8s), and passes ESLint with 0 errors and 0 warnings (`npm run lint`).
- The storefront features two home/browsing modes:
  1. `NovaHomePage`: Dark aesthetic with sidebars, promo cards, and curated product rails.
  2. `ShopPage`: Traditional catalog grid with sorting and category filtering.
- Cart and wishlist systems are fully operational with local storage persistence.

---

## Recent Changes & Fixes

- **Mobile/Tablet Search Icon Only & Dedicated `/search` Page**:
  - In [TopHeader.jsx](file:///d:/Code/React%20JS/bitbolt/src/components/layout/TopHeader.jsx), made full search bar desktop-only (`hidden lg:flex`), and added a search icon button for tablet and phone (`lg:hidden`) that navigates directly to `/search`.
  - In [Navbar.jsx](file:///d:/Code/React%20JS/bitbolt/src/components/layout/Navbar.jsx), updated mobile search icon to route to `/search`.
  - Created [SearchPage.jsx](file:///d:/Code/React%20JS/bitbolt/src/pages/SearchPage.jsx) matching the user's mobile search interface design:
    - Back navigation button with auto-focusing search capsule input.
    - Two visual discovery lookbook cards with curated links.
    - Interactive "Popular searches" pill tags (`Smartphones`, `Sneakers`, `Hoodie`, `Perfume`, etc.) and recent search history with localStorage persistence.
    - Debounced real-time live search with matching product cards and direct navigation to product details or search results.
  - Added `/search` route in [App.jsx](file:///d:/Code/React%20JS/bitbolt/src/App.jsx) and suppressed duplicate header/footer on `/search`.
- **Notification Icon Removal**:
  - Removed notification Bell icon and badge button from [TopHeader.jsx](file:///d:/Code/React%20JS/bitbolt/src/components/layout/TopHeader.jsx) per user request.
- **Iconsax React 19 Display Fix & Compatibility**:
  - Identified root cause of icons not rendering: React 19 removed support for `defaultProps` on forwardRef components. `iconsax-react` relied on `defaultProps` for `size: 24`, `color: 'currentColor'`, and `variant: 'Linear'`, which caused icons to render with `stroke: undefined` (transparent) and collapsed size.
  - Added [scripts/patch-iconsax.js](file:///d:/Code/React%20JS/bitbolt/scripts/patch-iconsax.js) and `postinstall` script in [package.json](file:///d:/Code/React%20JS/bitbolt/package.json) to patch `iconsax-react` default parameters across all 1986 icon files.
  - Added `iconsaxReact19` transform plugin in [vite.config.js](file:///d:/Code/React%20JS/bitbolt/vite.config.js) and cleared Vite pre-bundled cache. All icons now render with default `currentColor` stroke, proper sizes, and linear style.
- **Shop Loading Transition Guard (Prevent 0.5s "No products found" flash)**:
  - In [ShopPage.jsx](file:///d:/Code/React%20JS/bitbolt/src/pages/ShopPage.jsx), introduced `currentKey` and `loadedKey` state tracking (`${categoryParam}::${searchQuery}`) and `isDataReady = !isLoading && loadedKey === currentKey`.
  - Guarded against premature `setIsLoading(false)` on aborted fetches.
  - Replaced immediate empty check with `!isDataReady ? <ProductGridSkeleton /> : filteredProducts.length === 0 ? ...`. Eliminates the 0.5s empty state flash when navigating between categories or loading new pages.
- **Top Header Profile & Dropdown Removal**:
  - Removed user profile avatar and dropdown menu from [TopHeader.jsx](file:///d:/Code/React%20JS/bitbolt/src/components/layout/TopHeader.jsx) per user request.
  - Cleaned up unused state (`isUserMenuOpen`) and icon imports.
- **Brand Name Uniformity ("BitBolt")**:
  - Replaced "NovaShop" with "BitBolt" in [Sidebar.jsx](file:///d:/Code/React%20JS/bitbolt/src/components/layout/Sidebar.jsx), [RightCartSidebar.jsx](file:///d:/Code/React%20JS/bitbolt/src/components/layout/RightCartSidebar.jsx) ("Join BitBolt Club"), [NovaHomePage.jsx](file:///d:/Code/React%20JS/bitbolt/src/pages/NovaHomePage.jsx) footer copyright, and [curatedProducts.js](file:///d:/Code/React%20JS/bitbolt/src/data/curatedProducts.js).
- **Icons Migration to Iconsax (https://app.iconsax.io/)**:
  - Replaced `lucide-react` icons across the entire codebase with `iconsax-react` (v0.0.8).
  - All icons default to `Linear` variant (not showing bold by default per user specification).
  - Configured `Bold` variant exclusively for active/toggled states (e.g. favorited heart `variant={isFavorite ? "Bold" : "Linear"}` and star ratings).
  - Mapped icon equivalents across all components:
    - Navigation & actions: `ArrowLeft`, `ArrowRight`, `ArrowLeft2`, `ArrowRight2`, `ArrowDown2`, `ArrowUp2`, `CloseCircle`, `TickCircle`, `TickSquare`, `Add`, `Minus`, `Trash`.
    - Shopping & commerce: `ShoppingBag`, `Bag2`, `Card`, `TruckFast`, `ShieldTick`, `RotateLeft`, `Box`, `TicketDiscount`.
    - UI & category indicators: `SearchNormal1`, `HambergerMenu`, `Heart`, `Star1`, `Flash`, `Cup`, `MagicStar`, `FilterSearch`, `Woman`, `Mobile`, `House`, `Activity`, `Category`, `Notification`, `User`, `Logout`, `Sun1`, `Moon`, `Setting2`, `Headphone`, `Send2`, `Message`, `Camera`, `Code`, `ExportCurve`, `Location`.
  - Replaced broken multi-line prop formatting in `RightCartSidebar.jsx` and verified `npm run lint` and `npm run build` pass with 0 errors.
- **Dynamic Data & Real API Navigation**:
  - Replaced static mock items (`CURATED_DEALS`, `CURATED_RECOMMENDED`) in `NovaHomePage.jsx` with real live DummyJSON API products dynamically derived using `useMemo` (`discountPercentage >= 8` for deals and `rating >= 4.0` for recommended products). Eliminates broken `404` errors when clicking mock IDs (`990`, `991`, `992`).
  - Increased general catalog fetch limit from 30 to 60 in `useProducts.js` for richer initial data across all departments.
  - Upgraded `ShopPage.jsx` to full `useSearchParams` query-string synchronization:
    - Reads and drives `?category=...`, `?filter=deals|new-arrivals|best-sellers`, `?q=...`, and `?sort=featured|price-low|price-high|rating|discount|name`.
    - Directly fetches via `fetchProductsByCategory(slug)` and `searchProducts(q)` when URL parameters are present.
    - Added interactive quick-filter tabs ("⚡ Hot Deals", "🔥 New Arrivals", "🏆 Best Sellers") and clearable filter tags.
  - Upgraded `Sidebar.jsx`:
    - Loaded live categories from `fetchCategories()` into an expandable taxonomy menu with direct `/shop?category=${cat.slug}` routes.
    - Wired "Deals" to `/shop?filter=deals`, "New Arrivals" to `/shop?filter=new-arrivals`, "Best Sellers" to `/shop?filter=best-sellers`, "Top Rated" to `/shop?sort=rating`, "Wishlist" to open the favorites drawer, and "Summer Sale" promo card to `/shop?filter=deals`.
  - Wired `NovaHeroBanner.jsx` slides to themed routes (`/shop?filter=new-arrivals`, `/shop?filter=deals`, `/shop?category=smartphones`).
  - Wired `PromoCardsRow.jsx` to `/shop?filter=deals` (Flash Sale) and `/shop?filter=new-arrivals` (New Arrivals).
  - Added Enter key search routing to `TopHeader.jsx` and `Navbar.jsx` (`/shop?q=${query}`) with "View all results" option in dropdowns.
  - Linked `ProductDetailPage.jsx` category, brand, and related products header directly to `/shop?category=...` and `/shop?q=...`.
- **Cart Sidebar UI Fix (Duplicate Cart & Close Button)**:
  - Resolved duplicate cart sidebar bug on desktop (`xl+`) where `NovaHomePage.jsx` mounted two instances of `RightCartSidebar` and `RightCartSidebar.jsx` unconditionally rendered `<aside className="hidden xl:block">`.
  - Added desktop closing support (`isDesktopOpen` and `onCloseDesktop`) with active `X` button and `TopHeader` Cart toggle button.
  - Unified `RightCartSidebar` in `NovaHomePage.jsx` to a single instance handling both desktop sticky sidebar and mobile slide-over drawer.
- **HTML Document Hygiene (UTF-8 early declaration)**:
  - Verified and positioned `<meta charset="UTF-8" />` as the first tag inside `<head>` in `index.html` (within the first 1024 bytes), followed by the viewport meta tag and resources, ensuring universal character rendering and standard conformance.
- **Agent Skills Installed (mattpocock/skills)**:
  - Installed 37 engineering, design, architecture, and workflow skills into `.agents/skills` via `npx skills@latest add mattpocock/skills -y`.
  - Added [skills-lock.json](file:///d:/Code/React%20JS/bitbolt/skills-lock.json) tracking installed skills and versions.
- **Toast System Upgrade (goey-toast)**:
  - Installed `goey-toast` and peer dependency `framer-motion`.
  - Imported `goey-toast/styles.css` in `src/main.jsx`.
  - Replaced custom toast DOM rendering in `src/components/ui/ToastManager.jsx` with `<GoeyToaster position="top-right" theme={isDarkMode ? "dark" : "light"} richColors closeButton duration={4000} />`.
  - Updated `src/context/ToastContext.jsx` to route `addToast` calls through `goeyToast.success/error/warning/info` with title, description, and deduplication ID.

  - Re-exported `toast` from `src/hooks/useToast.js` for flexible usage.

- **ESLint & Fast Refresh Resolution**:
  - `eslint.config.js`: Added `allowExportNames: ['CartContext', 'FavoritesContext', 'ThemeContext', 'ToastContext']` for `react-refresh/only-export-components`.
  - `src/pages/CheckoutPage.jsx`: Added missing `import { useState } from "react"`.
  - `src/App.jsx`: Removed unused `useTheme`, `selectedCategory` state, and unused `useProducts` return values (`categories`, `isLoading`, `error`).
  - `src/components/layout/Navbar.jsx`: Added `useNavigate` for Enter key routing and fixed variable references.
  - `src/components/ProductDetailModal.jsx`: Removed unused `id` from product destructuring.
  - `src/components/ProductSkeleton.jsx`: Replaced `export *` with explicit named and default component exports (`ProductSkeleton`, `ProductGridSkeleton`).
  - `src/context/index.jsx`: Replaced wildcard exports `export *` with explicit component provider exports.

---

## Active Decisions & Architectural Observations

### 1. API Endpoint Configuration

- In `src/utils/constants.js`, `API_BASE_URL` is hardcoded to `"https://dummyjson.com"`.
- Meanwhile, `.env.example` lists `VITE_API_BASE_URL=https://api.escuelajs.co/api/v1` and `VITE_ENABLE_FALLBACK=true`.
- **Decision Needed**: Determine whether `API_BASE_URL` in `constants.js` should read `import.meta.env.VITE_API_BASE_URL || "https://dummyjson.com"` and align data modeling if EscuelaJS API is ever intended to be used. Currently, all data structures (e.g. `product.rating`, `product.stock`, `product.discountPercentage`, `product.images`) depend on DummyJSON's schema.

### 2. Dual Checkout Flows

- Flow A: `CheckoutInfoModal.jsx` connects to `sendTelegramOrder` via `handleTelegramCheckout` in `App.jsx`.
- Flow B: `CheckoutPage.jsx` has a standalone multi-column form that simulates processing locally with `setTimeout`, but does not currently call `sendTelegramOrder`.
- **Decision Needed**: Unify or clarify whether `CheckoutPage.jsx` should also dispatch to `sendTelegramOrder`.

---

## Immediate Next Steps

1. **Dynamic Environment Variable for API**:
   Update `src/utils/constants.js` to prioritize `import.meta.env.VITE_API_BASE_URL` with a sensible fallback (`https://dummyjson.com`).
2. **Checkout Flow Synchronization**:
   Integrate `sendTelegramOrder` into `src/pages/CheckoutPage.jsx` so that direct checkout submissions also dispatch orders to Telegram when configured.
3. **Continuous Maintenance**:
   Ensure `memory-bank/` is referenced and updated as new features or refactorings are introduced.
