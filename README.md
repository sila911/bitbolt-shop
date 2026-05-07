# BitBolt

BitBolt is a modern e-commerce platform designed to provide a seamless shopping experience. Built using React and Vite, it leverages the latest web technologies to deliver a fast and responsive user interface.

## Features 🚀

### User Features
- **Product Browsing**: Explore a wide range of products with detailed descriptions and images.
- **Favorites Drawer**: Save your favorite products for quick access.
- **Cart Drawer**: Add products to your cart and manage them easily.
- **Search Functionality**: Search for products with real-time suggestions.
- **Product Detail Modals**: View detailed information about products in a modal.

### Admin Features 🛠️
- **Category Management**: Organize products into categories.
- **Product Management**: Add, update, and delete products.

## Tech Stack 🖥️

**Frontend**:
- React
- Tailwind CSS
- Vite

**Other Tools**:
- ESLint for code quality
- PostCSS for CSS transformations


1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd bitbolt
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Folder Structure 📂

Here is the folder structure of the project:

```
.
├── api/
│   └── telegram.ts          # API integration for Telegram bot
├── public/                  # Static assets like images and icons
├── src/                     # Main source code directory
│   ├── components/          # Reusable React components
│   │   ├── About.tsx        # About section component
│   │   ├── BlogPage.tsx     # Blog page component
│   │   ├── Education.tsx    # Education section component
│   │   ├── Experience.tsx   # Experience section component
│   │   ├── Footer.tsx       # Footer component
│   │   ├── Hero.tsx         # Hero section component
│   │   ├── Navbar.tsx       # Navigation bar component
│   │   ├── PrivacyPolicyPage.tsx # Privacy policy page component
│   │   ├── Projects.tsx     # Projects section component
│   │   ├── Skills.tsx       # Skills section component
│   └── context/             # Context API for global state management
│       └── ThemeContext.tsx # Theme context for dark/light mode
│   ├── App.tsx              # Main application component
│   ├── index.css            # Global CSS styles
│   ├── main.tsx             # Application entry point
│   └── translations.ts      # Localization and translations
├── index.html               # Main HTML file
├── metadata.json            # Metadata for the project
├── package.json             # Project dependencies and scripts
├── README.md                # Project documentation
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel deployment configuration
└── vite.config.ts           # Vite configuration
```

