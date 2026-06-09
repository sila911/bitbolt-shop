# BitBolt E-Commerce ⚡

BitBolt is a premium, high-performance e-commerce storefront built with **React 19**, **Vite**, and **Tailwind CSS**. It features a modern dark-themed aesthetic, real-time data fetching via the DummyJSON API, and a seamless multi-page shopping experience.

## Features 🚀

### Core Experience
- **Real-World API**: Integrated with **DummyJSON API** for rich product data (discounts, reviews, stock, etc.).
 **AOS (Animate On Scroll)** transitions and micro-interactions.
- **Advanced Search**:
    
    - **Quick Dropdown**: Floating results with thumbnails and prices.
    - **Keyboard Shortcuts**: Use `/` to focus, `Arrow keys` to navigate, `Enter` to select, and `Esc` to close.

### Shopping Tools
- **Functional Cart**: Supports multi-item quantity management (increment/decrement/remove) with real-time total calculations.
- **Wishlist System**: Slide-over drawer to save items for later with persistent state visualization.
- **Dynamic Filtering**: Horizontal category carousel with scroll-snap and curated collection grids.
- **Rich Detail Modals**: Deep-dive into products with image galleries, technical specs, and customer reviews.

### Checkout & Connectivity
- **Functional Checkout**: Modern multi-column checkout page with form validation and simulated transaction processing.
## Tech Stack 🖥️

- **Frontend**: React 19, Tailwind CSS, Lucide React (Icons), AOS (Animations)
- **Routing**: React Router DOM 7
- **API**: Fetch API + AbortController (Race condition protection)
- **Build Tool**: Vite 8

## Getting Started 🛠️

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sila911/bitbolt-shop.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root:
   ```env
   VITE_TELEGRAM_BOT_TOKEN=your_token
   VITE_TELEGRAM_CHAT_ID=your_id
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## Folder Structure 📂

```
src/
├── components/          # UI Components (Navbar, Hero, Toast, etc.)
├── pages/               # Page Components (Lookbook, Checkout, Shop)
├── services/            # API Service Layer (productApi.js)
├── assets/              # Static images and icons
├── App.jsx              # Main App Logic & Routing
├── index.css            # Global Tailwind Styles & Animations
└── main.jsx             # Entry Point
```


