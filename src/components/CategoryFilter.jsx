import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function CategoryFilter({ categories, selected, onSelect }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Normalize categories if they come as objects { slug, name }
  const formattedCategories = [
    { slug: 'All', name: 'All' },
    ...categories.map(c => typeof c === 'string' ? { slug: c, name: c } : c)
  ];

  return (
    <div className="relative group w-full">
      <div className="flex items-center gap-4">
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4 no-scrollbar items-center scroll-smooth snap-x snap-mandatory"
        >
          {formattedCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onSelect(cat.slug)}
              className={`px-8 py-3 rounded-2xl text-xs font-black tracking-widest whitespace-nowrap transition-all duration-300 border-2 snap-start ${
                selected === cat.slug
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-xl scale-105"
                  : "bg-white dark:bg-neutral-900 text-neutral-400 border-neutral-100 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
              }`}
            >
              {cat.name.replace("-", " ")}
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
