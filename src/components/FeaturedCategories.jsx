import { ArrowRight } from "lucide-react";

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
    <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-24">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
          Explore <span className="text-neutral-400">Categories</span>
        </h2>
        <p className="text-xs font-black text-neutral-400 hidden md:block">
          Curated for excellence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-[800px] md:h-[600px]">
        {featured.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className={`group relative overflow-hidden rounded-[2.5rem] cursor-pointer bg-neutral-100 dark:bg-neutral-900 ${cat.gridSpan}`}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 dark:opacity-60 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent transition-opacity duration-500" />
            
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-black text-white/60 mb-1">Collection</p>
                <h3 className="text-2xl font-black text-white tracking-tight">{cat.name}</h3>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-neutral-900 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
