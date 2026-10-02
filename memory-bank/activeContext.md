# Active Context: BitBolt

## Current Status
- The codebase is functional, compiles cleanly with Vite (`npm run build` succeeds in ~1.8s), and passes ESLint with 0 errors and 0 warnings (`npm run lint`).
- The storefront features two home/browsing modes:
  1. `NovaHomePage`: Dark aesthetic with sidebars, promo cards, and curated product rails.
  2. `ShopPage`: Traditional catalog grid with sorting and category filtering.
- Cart and wishlist systems are fully operational with local storage persistence.

---

## Recent Changes & Fixes
- **ESLint & Fast Refresh Resolution**:
  - `eslint.config.js`: Added `allowExportNames: ['CartContext', 'FavoritesContext', 'ThemeContext', 'ToastContext']` for `react-refresh/only-export-components`.
  - `src/pages/CheckoutPage.jsx`: Added missing `import { useState } from "react"`.
  - `src/App.jsx`: Removed unused `useTheme`, `selectedCategory` state, and unused `useProducts` return values (`categories`, `isLoading`, `error`).
  - `src/components/layout/Navbar.jsx`: Removed unused `useNavigate` import and unused `navigate` constant.
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
