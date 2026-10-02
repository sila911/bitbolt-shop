import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-8">
      <Link to="/exclusive-drop" className="group block relative h-[260px] md:h-[300px] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-neutral-950 opacity-90" />

        <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 mb-3">
            Limited Release
          </span>
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase mb-6">
            Drop 001
          </h2>

          <div className="inline-flex items-center gap-2 bg-white text-neutral-950 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all">
            <span>View Drop</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </section>
  );
}
