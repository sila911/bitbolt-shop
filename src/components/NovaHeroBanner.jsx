import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NovaHeroBanner({ onShopClick }) {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      tag: "New Collection",
      title: "Find Your Style, Love Your Look ✨",
      subtitle: "Discover the latest trends in fashion, beauty, and lifestyle.",
      buttonText: "Shop Now",
      gradient: "from-[#8b7df8] via-[#ba8cf9] to-[#f093b0]",
      link: "/shop?filter=new-arrivals",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
    },
    {
      tag: "Summer Drop",
      title: "Elevate Your Everyday Essentials ⚡",
      subtitle: "Curated premium gadgets and contemporary accessories.",
      buttonText: "Explore Deals",
      gradient: "from-[#6c5ce7] via-[#a29bfe] to-[#fd79a8]",
      link: "/shop?filter=deals",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800"
    },
    {
      tag: "Exclusive Tech",
      title: "Smart Devices, Seamless Living 🎧",
      subtitle: "Precision engineering crafted for your modern workflow.",
      buttonText: "Discover Tech",
      gradient: "from-[#4834d4] via-[#686de0] to-[#e056fd]",
      link: "/shop?category=smartphones",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[activeSlide];

  return (
    <div className="relative rounded-[2.2rem] overflow-hidden shadow-lg shadow-purple-500/10 min-h-[300px] sm:min-h-[340px] md:min-h-[360px] flex items-center">
      {/* Dynamic Gradient Background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${current.gradient} transition-all duration-700`}
      />

      {/* Decorative Lighting Blurs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-pink-400/20 rounded-full blur-2xl pointer-events-none" />

      {/* Content Layout */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 md:grid-cols-12 items-center p-6 sm:p-10 md:p-12">
        {/* Left Column Text */}
        <div className="md:col-span-7 space-y-4 text-white">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
            <span>{current.tag}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] max-w-lg text-white drop-shadow-sm">
            {current.title}
          </h2>

          <p className="text-xs sm:text-sm text-white/90 font-medium max-w-md leading-relaxed">
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
              className="bg-white text-[#6c5ce7] hover:bg-neutral-50 px-6 sm:px-7 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2.5 shadow-md shadow-purple-900/10 hover:scale-105 active:scale-95 transition-all"
            >
              <span>{current.buttonText}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column Image */}
        <div className="hidden md:flex md:col-span-5 justify-end relative h-full items-center">
          <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/30 group">
            <img
              src={current.image}
              alt="Model"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              activeSlide === idx ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
