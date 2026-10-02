import { ArrowRight } from "iconsax-react";

export default function Hero({ onShopClick, onViewLookbook }) {
  return (
    <header className="relative min-h-[80vh] flex items-center justify-center bg-white dark:bg-neutral-950 pt-28 pb-16">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
            Collection 2026
          </span>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter text-neutral-900 dark:text-white uppercase">
            Future<br />
            <span className="text-neutral-300 dark:text-neutral-700">Standard</span>
          </h1>
          
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-md mx-auto lg:mx-0 font-medium">
            Curated gear, tech, and everyday essentials.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <button 
              onClick={onShopClick}
              className="w-full sm:w-auto bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
            >
              Explore Shop
              <ArrowRight size={15} />
            </button>
            <button 
              onClick={onViewLookbook}
              className="w-full sm:w-auto bg-transparent border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              Lookbook
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/80">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover" 
              alt="BitBolt Featured Item" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest block mb-1">Featured Drop</span>
              <p className="text-white text-sm font-bold">Limited Edition Sneakers</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
