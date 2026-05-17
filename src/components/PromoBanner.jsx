import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
      <Link to="/exclusive-drop" className="group block relative h-[400px] rounded-[3rem] overflow-hidden bg-neutral-900 shadow-2xl">
        {/* Background Animation/Effect */}
        <div className="absolute inset-0 opacity-40">
           <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary rounded-full blur-[120px] animate-pulse" />
           <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center p-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8">
            <Zap size={14} className="text-yellow-400 fill-yellow-400" />
            Limited Time Offer
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            Exclusive<br />
            <span className="text-neutral-500">Drop 001</span>
          </h2>
          
          <p className="text-neutral-400 font-medium max-w-lg mb-10 text-lg">
            Our most ambitious collection yet. High-performance materials designed for the urban pioneer. Available for 48 hours only.
          </p>

          <div className="flex items-center gap-4 bg-white text-neutral-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs group-hover:scale-105 active:scale-95 transition-all shadow-2xl">
            Get Priority Access
            <ArrowRight size={18} />
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute top-10 right-10 flex flex-col items-end gap-1">
           <div className="text-[10px] font-black text-white uppercase tracking-widest opacity-40">Status</div>
           <div className="text-xs font-black text-green-400 uppercase tracking-widest flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
             Live Now
           </div>
        </div>
      </Link>
    </section>
  );
}
