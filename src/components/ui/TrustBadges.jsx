import { ShieldCheck, RotateCcw, Headphones, Star } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    { title: "Secure Payment", subtitle: "100% secure payment", icon: ShieldCheck, color: "text-[#6c5ce7]" },
    { title: "Easy Returns", subtitle: "30-day return policy", icon: RotateCcw, color: "text-blue-500" },
    { title: "24/7 Support", subtitle: "Dedicated support", icon: Headphones, color: "text-emerald-500" },
    { title: "Trusted by Thousands", subtitle: "4.8 average rating", icon: Star, color: "text-amber-500" },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 rounded-3xl p-5 shadow-sm">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div key={idx} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 ${badge.color}`}
              >
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-neutral-900 dark:text-white leading-snug truncate">
                  {badge.title}
                </h5>
                <p className="text-[10px] text-neutral-400 font-medium truncate">{badge.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
