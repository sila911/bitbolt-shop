import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PromoCardsRow() {
  const navigate = useNavigate();

  // Live countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 18
  });

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* 1. Flash Sale */}
      <div 
        onClick={() => navigate("/shop")}
        className="rounded-3xl p-5 bg-[#fdf0f2] dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-center justify-between cursor-pointer group hover:shadow-md transition-all relative overflow-hidden"
      >
        <div className="space-y-1.5 z-10">
          <h4 className="text-sm font-black text-neutral-900 dark:text-white">Flash Sale</h4>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">Limited time deals</p>
          <p className="text-xs font-black text-rose-500">Up to 70% Off</p>

          {/* Countdown timer */}
          <div className="flex items-center gap-1 pt-1.5 text-[11px] font-black text-neutral-800 dark:text-neutral-200">
            <span className="bg-white dark:bg-neutral-800 px-1.5 py-0.5 rounded-md shadow-xs border border-rose-200/50 dark:border-neutral-700">
              {format(timeLeft.hours)}
            </span>
            <span>:</span>
            <span className="bg-white dark:bg-neutral-800 px-1.5 py-0.5 rounded-md shadow-xs border border-rose-200/50 dark:border-neutral-700">
              {format(timeLeft.minutes)}
            </span>
            <span>:</span>
            <span className="bg-white dark:bg-neutral-800 px-1.5 py-0.5 rounded-md shadow-xs border border-rose-200/50 dark:border-neutral-700">
              {format(timeLeft.seconds)}
            </span>
          </div>
        </div>

        <div className="w-24 h-24 sm:w-26 sm:h-26 flex-shrink-0 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=260"
            alt="Pink Handbag"
            className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      {/* 2. Free Shipping */}
      <div 
        onClick={() => navigate("/shop")}
        className="rounded-3xl p-5 bg-[#f0f9f5] dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between cursor-pointer group hover:shadow-md transition-all relative overflow-hidden"
      >
        <div className="space-y-1.5 z-10">
          <h4 className="text-sm font-black text-neutral-900 dark:text-white">Free Shipping</h4>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">On orders over $50</p>
          <div className="pt-2">
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1 hover:underline">
              Shop now <ArrowRight size={12} />
            </span>
          </div>
        </div>

        <div className="w-22 h-22 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=260"
            alt="Delivery Package"
            className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      {/* 3. New Arrivals */}
      <div 
        onClick={() => navigate("/shop")}
        className="rounded-3xl p-5 bg-[#fef4eb] dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 flex items-center justify-between cursor-pointer group hover:shadow-md transition-all relative overflow-hidden sm:col-span-2 md:col-span-1"
      >
        <div className="space-y-1.5 z-10">
          <h4 className="text-sm font-black text-neutral-900 dark:text-white">New Arrivals</h4>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">Check out the latest trends</p>
          <div className="pt-2">
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 inline-flex items-center gap-1 hover:underline">
              Shop now <ArrowRight size={12} />
            </span>
          </div>
        </div>

        <div className="w-24 h-24 sm:w-26 sm:h-26 flex-shrink-0 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=260"
            alt="Sunglasses"
            className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
