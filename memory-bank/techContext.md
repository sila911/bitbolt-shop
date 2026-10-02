# Technical Context: BitBolt

## Technology Stack

### Runtime & Core Libraries
- **React**: `^19.2.4` (React 19 with latest Hooks and concurrent features)
- **React DOM**: `^19.2.4`
- **React Router DOM**: `^7.15.1` (Declarative routing: `/`, `/shop`, `/product/:id`, `/lookbook`, `/checkout`, `/exclusive-drop`)
- **Vite**: `^8.0.1` (Fast ESM dev server and production bundler)
- **Tailwind CSS**: `^3.4.19` (Utility-first styling with dark mode support)
- **PostCSS / Autoprefixer**: `^8.5.8` / `^10.4.27`
- **Lucide React**: `^1.7.0` (Icon set across all views)
- **AOS (Animate On Scroll)**: `^2.3.4` (Scroll animations initialized on app load and product changes)
- **goey-toast**: `^0.5.0` (Gooey morphing toast notifications built on Sonner with organic blob animations)
- **framer-motion**: `^12.34.0` (Animation engine powering gooey toast morphing and physics)

---

## Environment Variables

### Defined in `.env.example`
```env
VITE_API_BASE_URL=https://api.escuelajs.co/api/v1
VITE_ENABLE_FALLBACK=true
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_TELEGRAM_CHAT_ID=your_chat_id_here
```

### Active in `.env`
```env
VITE_TELEGRAM_BOT_TOKEN='7522747677:AAFf5uSN3ULEK24c_870o9G-mVLBuZbS_R8'
VITE_TELEGRAM_CHAT_ID='1543040976'
```

### Discrepancy Note
- `src/utils/constants.js` currently defines `export const API_BASE_URL = "https://dummyjson.com";` as a hardcoded string rather than referencing `import.meta.env.VITE_API_BASE_URL`.
- `.env.example` suggests Platzi Fake Store API (`api.escuelajs.co`), but the active query parameters and response mappings (`res.json().products`, `categorySlug`, `/products/search?q=...`) are explicitly crafted for the **DummyJSON API** (`https://dummyjson.com`).

---

## Target APIs & Fetch Logic

### 1. DummyJSON API (`https://dummyjson.com`)
Primary data source for product catalog, categories, search, and individual product details located in `src/api/productApi.js` (and re-exported by `src/services/productApi.js`):
- `GET /products?limit={limit}&skip={skip}`: Paginated list of products (default limit 30 or 50).
- `GET /products/categories`: Category taxonomy listing.
- `GET /products/category/{categorySlug}`: Filter products by category slug.
- `GET /products/search?q={query}`: Server-side search filter with query string.
- `GET /products/{id}`: Single product deep specification and review fetch.

#### Fetch Architecture & Resilience
- **Native `fetch` API** with standard JSON deserialization.
- **Race Condition Protection**: Accepts and forwards `AbortController.signal` across calls.
- **Error Handling**: Gracefully ignores `AbortError` (`error.name === "AbortError"`), logs network/HTTP errors, and bubbles exceptions to caller state.
- **Debounced Search**: 300–400ms debounce in hooks to limit unnecessary API requests during typing.

### 2. Telegram Bot API (`https://api.telegram.org`)
Handles direct concierge order notifications located in `src/services/telegramService.js`:
- `POST https://api.telegram.org/bot${VITE_TELEGRAM_BOT_TOKEN}/sendMessage`:
  - Dispatches formatted markdown/plaintext message summarizing customer information (name, phone, telegram handle, email, address, Google Maps link, landmarks) alongside itemized cart contents and order total.
  - Validates `response.ok` and payload `data.ok`.

### 3. Local Curated Fallback / Hybrid Data
Located in `src/data/curatedProducts.js`:
- `CURATED_DEALS`: Static high-aesthetic product records with images, discounts, and tags.
- `CURATED_RECOMMENDED`: Supplemental high-engagement items merged with API results on `NovaHomePage`.

---

## State Management & Architecture

### React Context Providers (`src/context/` & `src/context/index.jsx`)
- `CartContext`: Manages item list, quantity updates, total pricing, and cart drawer visibility. Persisted in `localStorage` under `bitbolt-cart`.
- `FavoritesContext`: Manages wishlist IDs and drawer visibility. Persisted in `localStorage` under `bitbolt-favorites`.
- `ThemeContext`: Dark/light mode state, automatically syncing with `localStorage` (`bitbolt-theme`) and toggling the `.dark` class on `document.documentElement`.
- `ToastContext`: Gooey morphing notifications powered by `goey-toast` (`GoeyToaster`) with theme sync, deduplication, and tone mapping (`success`, `error`, `warning`, `info`).
- `AppProviders`: Unified wrapper in `src/main.jsx` providing all contexts in hierarchy.

### Custom Hooks (`src/hooks/`)
- `useCart`: Shortcut to `CartContext`.
- `useFavorites`: Shortcut to `FavoritesContext`.
- `useTheme`: Shortcut to `ThemeContext`.
- `useToast`: Shortcut to `ToastContext`.
- `useProducts`: Encapsulates category and search product fetching with AbortController lifecycle.

---

## Code Quality & Tooling
- **ESLint 9 (`eslint.config.js`)**: Flat config using `@eslint/js`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.
- **Fast Refresh Rules**: `react-refresh/only-export-components` configured with `allowExportNames: ['CartContext', 'FavoritesContext', 'ThemeContext', 'ToastContext']` to maintain clean separation and hot reload safety.
- **Unused Variable Enforcement**: Strict pattern ignoring variables starting with `_` or capital letters (`varsIgnorePattern: '^[A-Z_]'`).
