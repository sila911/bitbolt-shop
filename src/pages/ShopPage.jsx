import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-32 pb-20 px-6">
      <div className="max-w-screen-2xl mx-auto text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-12 uppercase text-xs font-black tracking-widest">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <h1 className="text-6xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-6">Full Collection</h1>
        <p className="text-neutral-500 uppercase tracking-widest text-sm font-bold">Coming Soon • Premium Curation</p>
      </div>
    </div>
  );
}
