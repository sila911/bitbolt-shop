import { useState, useEffect } from "react";
import { ArrowRight } from "iconsax-react";
import { useNavigate } from "react-router-dom";

export default function PromoCardsRow() {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 45, seconds: 18 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num) => String(num).padStart(2, "0");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
      {/* 1. Flash Deals */}
      <div
        onClick={() => navigate("/shop?filter=deals")}
        className="rounded-xl p-4 sm:p-5 bg-zinc-900 border border-zinc-800 flex items-center justify-between cursor-pointer group hover:border-zinc-700 transition-all relative overflow-hidden"
      >
        <div className="space-y-1.5 z-10">
          <h4 className="text-sm font-bold text-white tracking-tight">Flash Hardware Sale</h4>
          <p className="text-xs text-zinc-400 font-normal">Discounted peripheral inventory</p>
          <p className="text-xs font-semibold text-rose-400 tabular-nums">Up to 40% Off</p>

          <div className="flex items-center gap-1 pt-1.5 text-xs font-semibold text-zinc-300 tabular-nums">
            <span className="bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
              {format(timeLeft.hours)}
            </span>
            <span>:</span>
            <span className="bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
              {format(timeLeft.minutes)}
            </span>
            <span>:</span>
            <span className="bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
              {format(timeLeft.seconds)}
            </span>
          </div>
        </div>

        <div className="w-20 h-20 sm:w-22 sm:h-22 shrink-0 flex items-center justify-center bg-zinc-950 rounded-lg p-2 border border-zinc-850">
          <img
            src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=260"
            alt="Hardware Headphones"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* 2. Free Delivery */}
      <div
        onClick={() => navigate("/shop")}
        className="rounded-xl p-4 sm:p-5 bg-zinc-900 border border-zinc-800 flex items-center justify-between cursor-pointer group hover:border-zinc-700 transition-all relative overflow-hidden"
      >
        <div className="space-y-1.5 z-10">
          <h4 className="text-sm font-bold text-white tracking-tight">Complimentary Shipping</h4>
          <p className="text-xs text-zinc-400 font-normal">On all domestic orders over $50</p>
          <div className="pt-2">
            <span className="text-xs font-medium text-emerald-400 inline-flex items-center gap-1 group-hover:underline">
              View terms <ArrowRight size={12} />
            </span>
          </div>
        </div>

        <div className="w-20 h-20 sm:w-22 sm:h-22 shrink-0 flex items-center justify-center bg-zinc-950 rounded-lg p-2 border border-zinc-850">
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=260"
            alt="Package delivery"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* 3. New Drops */}
      <div
        onClick={() => navigate("/shop?filter=new-arrivals")}
        className="rounded-xl p-4 sm:p-5 bg-zinc-900 border border-zinc-800 flex items-center justify-between cursor-pointer group hover:border-zinc-700 transition-all relative overflow-hidden sm:col-span-2 md:col-span-1"
      >
        <div className="space-y-1.5 z-10">
          <h4 className="text-sm font-bold text-white tracking-tight">New Arrivals</h4>
          <p className="text-xs text-zinc-400 font-normal">Fresh additions to the tech lineup</p>
          <div className="pt-2">
            <span className="text-xs font-medium text-zinc-200 inline-flex items-center gap-1 group-hover:underline">
              Browse batch <ArrowRight size={12} />
            </span>
          </div>
        </div>

        <div className="w-20 h-20 sm:w-22 sm:h-22 shrink-0 flex items-center justify-center bg-zinc-950 rounded-lg p-2 border border-zinc-850">
          <img
            src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=260"
            alt="Mouse Hardware"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
