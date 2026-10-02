import { ArrowRight } from "iconsax-react";

const featured = [
  {
    name: "Laptops",
    slug: "laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000",
    gridSpan: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Furniture",
    slug: "furniture",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1000",
    gridSpan: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Sunglasses",
    slug: "sunglasses",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1000",
    gridSpan: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Fashion",
    slug: "mens-shirts",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1000",
    gridSpan: "md:col-span-2 md:row-span-1",
  },
];

export default function FeaturedCategories({ onSelect }) {
  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white tracking-tight uppercase">
          Categories
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[420px] md:h-[320px]">
        {featured.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className="group relative overflow-hidden rounded-2xl cursor-pointer bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/80"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
            
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white tracking-tight">{cat.name}</h3>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
