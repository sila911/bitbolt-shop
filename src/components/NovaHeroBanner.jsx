import { useState, useEffect } from "react";
import { ArrowRight } from "iconsax-react";
import { useNavigate } from "react-router-dom";

export default function NovaHeroBanner({ onShopClick }) {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      tag: "Featured Drop",
      title: "Studio Acoustics & Wireless Audio",
      subtitle: "High-fidelity drivers with low-latency transmission and tactile analog controls.",
      buttonText: "Explore Audio",
      link: "/shop?filter=audio",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
      accent: "from-zinc-900 via-zinc-900 to-zinc-950"
    },
    {
      tag: "Hardware Spec",
      title: "Precision Mechanical Keyboards",
      subtitle: "Gasket-mounted switches, CNC anodized aluminum frames, and doubleshot keycaps.",
      buttonText: "View Hardware",
      link: "/shop?filter=keyboards",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800",
      accent: "from-zinc-900 via-neutral-900 to-zinc-950"
    },
    {
      tag: "Workspace",
      title: "Minimal Desktop Essentials",
      subtitle: "Machined aluminum stands, cable management, and high-density desk pads.",
      buttonText: "Browse Gear",
      link: "/shop?filter=accessories",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800",
      accent: "from-neutral-950 via-zinc-900 to-zinc-950"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[activeSlide];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 min-h-[300px] sm:min-h-[340px] md:min-h-[360px] flex items-center shadow-xl">
      {/* Subtle depth gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${current.accent} transition-opacity duration-700 opacity-90`}
      />

      {/* Grid Pattern overlay for tactile industrial texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
      />

      {/* Content Layout */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 md:grid-cols-12 items-center p-6 sm:p-10 md:p-12 gap-6">
        {/* Left Column Text */}
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-zinc-800/80 border border-zinc-700/60 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-zinc-300">
            <span>{current.tag}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] max-w-xl text-white">
            {current.title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-normal max-w-md leading-relaxed">
            {current.subtitle}
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                if (current.link) {
                  navigate(current.link);
                } else if (onShopClick) {
                  onShopClick();
                } else {
                  navigate("/shop");
                }
              }}
              className="bg-zinc-100 hover:bg-white text-zinc-950 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <span>{current.buttonText}</span>
              <ArrowRight size={14} className="stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Right Column Image */}
        <div className="hidden md:flex md:col-span-5 justify-end relative h-full items-center">
          <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden border border-zinc-800/90 shadow-2xl bg-zinc-900 group">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-4 left-6 sm:left-10 md:left-12 flex items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeSlide === idx ? "w-6 h-1.5 bg-zinc-100" : "w-2 h-1.5 bg-zinc-700 hover:bg-zinc-500"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
