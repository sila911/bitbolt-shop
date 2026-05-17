import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Minimalist Setup",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1000",
    description: "Curated furniture for the modern workspace.",
    theme: "bg-orange-500"
  },
  {
    title: "Pro Photography",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000",
    description: "High-end lenses and lighting gear.",
    theme: "bg-blue-500"
  },
  {
    title: "Urban Tech",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1000",
    description: "Essential devices for the digital nomad.",
    theme: "bg-purple-500"
  }
];

export default function CollectionsGrid({ onSelect }) {
  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-2">Curated Series</h4>
          <h2 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-none">
            Browse <span className="text-neutral-400">Collections</span>
          </h2>
        </div>
        <button className="text-xs font-black uppercase tracking-widest text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white pb-1 hover:text-neutral-400 dark:hover:text-neutral-400 hover:border-neutral-400 transition-colors">
          View All Editions
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => onSelect(item.category)}
            className="group relative h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-900 transition-all duration-500"
          >
            {/* Image with zoom effect */}
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 dark:opacity-60 group-hover:opacity-100"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            
            {/* Floating indicator */}
            <div className={`absolute top-8 left-8 w-2 h-2 rounded-full ${item.theme} animate-pulse`} />

            {/* Content */}
            <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-4">
                Collection Edition
              </span>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-400 font-medium mb-6 opacity-0 group-hover:opacity-100 transition-opacity delay-100 line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-widest group/btn">
                <span>Explore Now</span>
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-neutral-950 transition-all">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
