import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950 pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neutral-100 dark:bg-neutral-900 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neutral-100 dark:bg-neutral-900 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-neutral-500">
            <Sparkles size={14} className="text-yellow-500" />
            New Season Collection 2024
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter text-neutral-900 dark:text-white uppercase">
            Future<br />
            <span className="text-neutral-300 dark:text-neutral-800">Essential</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Experience the next generation of premium lifestyle gear. Curated for those who demand excellence in every detail.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="w-full sm:w-auto bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-10 py-6 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl">
              Shop Collection
              <ArrowRight size={18} />
            </button>
            <button className="w-full sm:w-auto bg-transparent border-2 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white px-10 py-6 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all">
              View Lookbook
            </button>
          </div>

          <div className="pt-10 flex flex-wrap justify-center lg:justify-start gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="text-xs font-black uppercase tracking-widest">Free Shipping</div>
             <div className="text-xs font-black uppercase tracking-widest">Premium Quality</div>
             <div className="text-xs font-black uppercase tracking-widest">Global Support</div>
          </div>
        </div>

        <div className="relative group">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-900">
            <img 
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              alt="Premium Product" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
               <p className="text-white text-[10px] font-black uppercase tracking-widest mb-1">Featured Item</p>
               <h3 className="text-white font-black uppercase">Limited Edition Series</h3>
            </div>
          </div>
          
          {/* Floating badge */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white dark:bg-neutral-900 rounded-full flex flex-col items-center justify-center border-4 border-neutral-50 dark:border-neutral-950 shadow-2xl animate-bounce">
             <span className="text-xs font-black text-neutral-400 uppercase">Save</span>
             <span className="text-2xl font-black text-neutral-900 dark:text-white tracking-tighter">30%</span>
          </div>
        </div>
      </div>
    </header>
  )
}
