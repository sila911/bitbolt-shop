import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-32 pb-20 px-6">
      <div className="max-w-screen-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-12 text-xs font-black tracking-widest">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>
        
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black text-neutral-900 dark:text-white tracking-tighter leading-none mb-6">
            Season <span className="text-neutral-400">Lookbook</span>
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed">
            A visual journey through our latest curation. High-performance gear meets high-fashion aesthetics.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[3/4] bg-neutral-100 dark:bg-neutral-900 rounded-[2.5rem] overflow-hidden group">
              <img 
                src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=1000`} 
                alt={`Look ${i}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
