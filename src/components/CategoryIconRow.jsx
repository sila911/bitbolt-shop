import { Shirt, Sparkles, Headphones, Armchair, Footprints, LayoutGrid } from "lucide-react";

export default function CategoryIconRow({ onSelectCategory, selectedCategory = "All" }) {
  const categories = [
    {
      label: "Fashion",
      slug: "mens-shirts",
      icon: Shirt,
      bg: "bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-400"
    },
    {
      label: "Beauty",
      slug: "beauty",
      icon: Sparkles,
      bg: "bg-pink-50 text-pink-500 dark:bg-pink-950/40 dark:text-pink-400"
    },
    {
      label: "Electronics",
      slug: "smartphones",
      icon: Headphones,
      bg: "bg-indigo-50 text-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-400"
    },
    {
      label: "Home & Living",
      slug: "furniture",
      icon: Armchair,
      bg: "bg-amber-50 text-amber-500 dark:bg-amber-950/40 dark:text-amber-400"
    },
    {
      label: "Sports",
      slug: "mens-shoes",
      icon: Footprints,
      bg: "bg-sky-50 text-sky-500 dark:bg-sky-950/40 dark:text-sky-400"
    },
    {
      label: "More",
      slug: "All",
      icon: LayoutGrid,
      bg: "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
    }
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 rounded-3xl p-4 sm:p-5 shadow-sm">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedCategory === item.slug;

          return (
            <button
              key={item.label}
              onClick={() => onSelectCategory(item.slug)}
              className={`flex flex-col items-center gap-2 p-2.5 rounded-2xl transition-all group ${
                isSelected
                  ? "ring-2 ring-[#6c5ce7] bg-purple-50/50 dark:bg-purple-950/30"
                  : "hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
              }`}
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${item.bg}`}
              >
                <Icon size={22} className="stroke-[2.2]" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-neutral-700 dark:text-neutral-300">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
