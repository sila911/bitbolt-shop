# Active Context: BitBolt

## Current Status
- The codebase is functional, compiles cleanly with Vite (`npm run build` succeeds in ~1.8s), and passes ESLint with 0 errors and 0 warnings (`npm run lint`).
- The storefront features two home/browsing modes:
  1. `NovaHomePage`: Dark aesthetic with sidebars, promo cards, and curated product rails.
  2. `ShopPage`: Traditional catalog grid with sorting and category filtering.
- Cart and wishlist systems are fully operational with local storage persistence.

---

## Recent Changes & Fixes
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
