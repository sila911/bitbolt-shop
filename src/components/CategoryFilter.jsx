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
      <div className="flex items-center gap-3">
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors shadow-sm hidden md:grid place-items-center flex-shrink-0"
          aria-label="Scroll categories left"
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-2 no-scrollbar items-center scroll-smooth snap-x snap-mandatory flex-1"
        >
          {formattedCategories.map((cat) => {
            const isSelected = selected === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onSelect(cat.slug)}
                className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-200 snap-start border ${
                  isSelected
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-sm"
                    : "bg-white dark:bg-neutral-900/60 text-neutral-500 dark:text-neutral-400 border-neutral-200/70 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                {cat.name.replace("-", " ")}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors shadow-sm hidden md:grid place-items-center flex-shrink-0"
          aria-label="Scroll categories right"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
