import { Woman, Brush, Mobile, House, Activity, Category } from "iconsax-react";

export default function CategoryIconRow({ onSelectCategory, selectedCategory = "All" }) {
  const categories = [
    {
      label: "Audio & Wearables",
      slug: "mens-shirts",
      icon: Woman,
      bg: "bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
    },
    {
      label: "Keyboards & Tools",
      slug: "beauty",
      icon: Brush,
      bg: "bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
    },
    {
      label: "Electronics",
      slug: "smartphones",
      icon: Mobile,
      bg: "bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
    },
    {
      label: "Desk Setup",
      slug: "furniture",
      icon: House,
      bg: "bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
    },
    {
      label: "Accessories",
      slug: "mens-shoes",
      icon: Activity,
      bg: "bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
    },
    {
      label: "All Hardware",
      slug: "All",
      icon: Category,
      bg: "bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
    }
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 sm:p-4 shadow-sm">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {categories.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedCategory === item.slug;

          return (
            <button
              key={item.label}
              onClick={() => onSelectCategory(item.slug)}
              className={`flex flex-col items-center gap-2 p-2.5 rounded-lg transition-all group cursor-pointer ${
                isSelected
                  ? "bg-zinc-800 border border-zinc-600 text-white"
                  : "hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${item.bg}`}
              >
                <Icon size={18} variant="Linear" />
              </div>
              <span className="text-[11px] font-medium tracking-tight truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
