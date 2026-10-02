import { ArrowRight } from "iconsax-react";

const collections = [
  {
    title: "Minimalist Setup",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1000",
    description: "Curated furniture for the modern workspace.",
    theme: "bg-orange-500"
  },
  {
    title: "Luxury Timepieces",
    category: "mens-watches",
    image: "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&q=80&w=1000",
    description: "Precision-engineered watches to elevate your everyday style.",
    theme: "bg-amber-500"
  },
  {
    title: "Next-Gen Mobile",
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000",
    description: "Flagship smartphones and pocket-sized powerhouses.",
    theme: "bg-purple-500"
  }
];

export default function CollectionsGrid({ onSelect }) {
  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white tracking-tight uppercase">
          Collections
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => onSelect(item.category)}
            className="group relative h-[380px] rounded-3xl overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/80"
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                <ArrowRight size={15} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
