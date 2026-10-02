import { Message as MessageCircle, Send2 as Send, Camera, Code as Terminal, ExportCurve as ArrowUpRight } from "iconsax-react";

export default function Footer() {
  const links = {
    shop: ["New Arrivals", "Best Sellers", "Exclusive Drop", "Lookbook"],
    support: ["Shipping Policy", "Return & Exchanges", "Product Care", "FAQs"],
    company: ["Our Story", "Careers", "Terms of Service", "Privacy Policy"],
  };

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 pt-16 pb-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-14">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-neutral-900 text-lg font-black">
                B
              </div>
              <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white uppercase">
                BitBolt
              </h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed font-medium">
              Curated gear, tech, and everyday essentials.
            </p>
            <div className="flex gap-4">
              {[MessageCircle, Send, Camera, Terminal].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-400 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all"
                  aria-label="Social Link"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-6">
                {title}
              </h3>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm font-bold text-neutral-900 dark:text-white tracking-wider hover:text-neutral-400 transition-colors flex items-center group"
                    >
                      {item}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black tracking-widest text-neutral-400">
            © 2026 BitBolt. All rights reserved.
          </p>
          <div className="flex gap-8">
            <button className="text-[10px] font-black tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Privacy
            </button>
            <button className="text-[10px] font-black tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Terms
            </button>
            <button className="text-[10px] font-black tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
