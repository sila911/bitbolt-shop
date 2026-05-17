import { ArrowLeft, CreditCard, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 pt-32 pb-20 px-6">
      <div className="max-w-screen-xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-12 uppercase text-xs font-black tracking-widest">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-8">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="FULL NAME" className="w-full bg-white dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800 p-4 rounded-2xl text-sm font-bold outline-none focus:border-neutral-900 dark:focus:border-white transition-all uppercase placeholder:text-neutral-400" />
                <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-white dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800 p-4 rounded-2xl text-sm font-bold outline-none focus:border-neutral-900 dark:focus:border-white transition-all uppercase placeholder:text-neutral-400" />
                <input type="text" placeholder="STREET ADDRESS" className="w-full bg-white dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800 p-4 rounded-2xl text-sm font-bold outline-none focus:border-neutral-900 dark:focus:border-white transition-all uppercase placeholder:text-neutral-400 md:col-span-2" />
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-8">Payment Method</h2>
              <div className="grid gap-4">
                <div className="p-6 rounded-2xl border-2 border-neutral-900 dark:border-white bg-white dark:bg-neutral-900 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard size={24} />
                    <span className="font-bold text-sm uppercase tracking-widest">Credit Card</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border-4 border-neutral-900 dark:border-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="bg-white dark:bg-neutral-900 p-8 rounded-[2.5rem] shadow-xl space-y-8 sticky top-32">
            <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold text-neutral-500 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-500 uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-green-500">FREE</span>
              </div>
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">
                <span>Total</span>
                <span>$0.00</span>
              </div>
            </div>
            
            <button className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl">
              Complete Order
            </button>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                <ShieldCheck size={16} /> Secure checkout enabled
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                <Truck size={16} /> Express global delivery
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
