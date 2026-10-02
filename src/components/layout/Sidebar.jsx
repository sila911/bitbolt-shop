import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Home,
  LayoutGrid,
  Tag,
  Flame,
  Trophy,
  Diamond,
  FolderHeart,
  Package,
  Heart,
  Ticket,
  MapPin,
  Settings,
  Headphones,
  Sun,
  Moon,
  X,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useFavorites } from "../../hooks/useFavorites";
import { useTheme } from "../../hooks/useTheme";

export default function Sidebar({
  isOpen,
  onClose,
  favoritesCount: propFavoritesCount,
  isDarkMode: propIsDarkMode,
  onToggleDarkMode: propOnToggleDarkMode,
  onCategorySelect,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  const favoritesCtx = useFavorites();
  const themeCtx = useTheme();

  const favoritesCount = propFavoritesCount ?? favoritesCtx?.favoritesCount ?? 0;
  const isDarkMode = propIsDarkMode ?? themeCtx?.isDarkMode ?? false;
  const onToggleDarkMode = propOnToggleDarkMode ?? themeCtx?.toggleDarkMode;

  const primaryNav = [
    { label: "Home", icon: Home, path: "/" },
    {
      label: "Categories",
      icon: LayoutGrid,
      path: "/shop",
      action: () => {
        onCategorySelect?.("All");
        navigate("/shop");
        onClose?.();
      },
    },
    {
      label: "Deals",
      icon: Tag,
      path: "/deals",
      badge: "Hot",
      badgeColor: "bg-rose-500 text-white",
      action: () => {
        navigate("/shop");
        onClose?.();
      },
    },
    {
      label: "New Arrivals",
      icon: Flame,
      path: "/new-arrivals",
      action: () => {
        navigate("/shop");
        onClose?.();
      },
    },
    {
      label: "Best Sellers",
      icon: Trophy,
      path: "/best-sellers",
      action: () => {
        navigate("/shop");
        onClose?.();
      },
    },
    {
      label: "Brands",
      icon: Diamond,
      path: "/brands",
      action: () => {
        navigate("/shop");
        onClose?.();
      },
    },
    { label: "Collections", icon: FolderHeart, path: "/lookbook" },
  ];

  const secondaryNav = [
    {
      label: "My Orders",
      icon: Package,
      path: "/orders",
      action: () => {
        navigate("/checkout");
        onClose?.();
      },
    },
    {
      label: "Wishlist",
      icon: Heart,
      path: "/wishlist",
      badge: favoritesCount > 0 ? String(favoritesCount) : null,
      badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
    },
    { label: "Coupons", icon: Ticket, path: "/coupons" },
    { label: "Addresses", icon: MapPin, path: "/addresses" },
    { label: "Account Settings", icon: Settings, path: "/settings" },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 border-r border-neutral-200/80 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 select-none">
      <div className="p-6 pb-5 flex items-center justify-between">
        <Link to="/" onClick={onClose} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6c5ce7] to-[#a29bfe] flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <ShoppingBag size={20} className="stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-neutral-900 dark:text-white leading-none">
              Nova<span className="text-[#6c5ce7]">Shop</span>
            </span>
          </div>
        </Link>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-2 space-y-6">
        <div className="space-y-1">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path && !item.action;

            return (
              <button
                key={item.label}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    navigate(item.path);
                    onClose?.();
                  }
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#6c5ce7] text-white shadow-md shadow-purple-500/25"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? "text-white" : "text-neutral-400 dark:text-neutral-500"} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 space-y-1">
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path;

            return (
              <button
                key={item.label}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    navigate(item.path);
                    onClose?.();
                  }
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                    : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={17} className="text-neutral-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Summer Sale Card */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[#7064f5] via-[#8c7bf7] to-[#ba8ff9] text-white relative overflow-hidden shadow-lg shadow-purple-500/15">
          <div className="relative z-10 space-y-3">
            <span className="inline-block bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
              Special Offer
            </span>
            <div>
              <h4 className="text-base font-black tracking-tight leading-tight">Summer Sale</h4>
              <p className="text-xs text-white/90 font-medium">Up to 50% Off</p>
            </div>
            <button
              onClick={() => {
                navigate("/shop");
                onClose?.();
              }}
              className="bg-white text-[#6c5ce7] hover:bg-neutral-100 px-4 py-1.5 rounded-xl text-xs font-bold transition-transform active:scale-95 shadow-sm inline-flex items-center gap-1.5"
            >
              <span>Shop Now</span>
              <ArrowRight size={13} />
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/15 rounded-full blur-xl pointer-events-none" />
          <div className="absolute top-2 right-2 text-3xl opacity-20 select-none">🛍️</div>
        </div>
      </div>

      <div className="p-4 border-t border-neutral-100 dark:border-neutral-800/80 space-y-3">
        <div className="flex items-center gap-3 px-2 text-xs">
          <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500">
            <Headphones size={16} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-neutral-900 dark:text-white text-[11px]">Need Help?</span>
            <span className="text-[10px] text-neutral-400">24/7 Support Center</span>
          </div>
        </div>

        <button
          onClick={onToggleDarkMode}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            {isDarkMode ? <Moon size={15} /> : <Sun size={15} />}
            <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
          </div>
          <ChevronRight size={14} className="text-neutral-400" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-0 h-screen z-30">
        {sidebarContent}
      </aside>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
