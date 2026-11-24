import { ShieldTick as ShieldCheck, RotateLeft as RotateCcw, Headphone as Headphones, Star } from "iconsax-react";

export default function TrustBadges() {
  const badges = [
    { title: "Encrypted Checkout", subtitle: "Direct order dispatch", icon: ShieldCheck, color: "text-zinc-200" },
    { title: "Hardware Guarantee", subtitle: "30-day return policy", icon: RotateCcw, color: "text-zinc-200" },
    { title: "Direct Support", subtitle: "Telegram concierge service", icon: Headphones, color: "text-zinc-200" },
    { title: "Verified Gear", subtitle: "Curated tech specs", icon: Star, color: "text-zinc-200" },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 shadow-sm">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div key={idx} className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 ${badge.color}`}
              >
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-semibold text-white leading-snug truncate">
                  {badge.title}
                </h5>
                <p className="text-[11px] text-zinc-400 font-normal truncate">{badge.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
