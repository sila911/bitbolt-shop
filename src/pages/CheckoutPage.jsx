import { useState } from "react";
import { ArrowLeft, Card as CreditCard, ShieldTick as ShieldCheck, TruckFast as Truck, ShoppingBag, TickCircle as CheckCircle2 } from "iconsax-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";

export default function CheckoutPage({ cart: propCart, total: propTotal, clearCart: propClearCart, addToast: propAddToast }) {
  const navigate = useNavigate();
  const cartCtx = useCart();
  const toastCtx = useToast();

  const cart = propCart ?? cartCtx?.cart ?? [];
  const total = propTotal ?? cartCtx?.cartTotal ?? 0;
  const clearCart = propClearCart ?? cartCtx?.clearCart;
  const addToast = propAddToast ?? toastCtx?.addToast;
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      addToast("Empty Bag", "Add some items to your collection before checking out.", "error");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.address) {
      addToast("Missing Info", "Please fill in all shipping details.", "error");
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      addToast("Order Placed", "Your premium gear is on its way!", "success");
      clearCart();
      navigate("/");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-12 text-xs font-black tracking-widest">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tighter mb-8">Shipping Details</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your name" 
                    className="w-full bg-white dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800 p-4 rounded-2xl text-sm font-bold outline-none focus:border-neutral-900 dark:focus:border-white transition-all placeholder:text-neutral-400" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@mail.com" 
                    className="w-full bg-white dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800 p-4 rounded-2xl text-sm font-bold outline-none focus:border-neutral-900 dark:focus:border-white transition-all placeholder:text-neutral-400" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-neutral-400 tracking-widest">Street Address</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Shipping destination" 
                    className="w-full bg-white dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800 p-4 rounded-2xl text-sm font-bold outline-none focus:border-neutral-900 dark:focus:border-white transition-all placeholder:text-neutral-400" 
                  />
                </div>
              </form>
            </section>

            <section>
              <h2 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tighter mb-8">Payment Method</h2>
              <div className="grid gap-4">
                <div className="p-6 rounded-2xl border-2 border-neutral-900 dark:border-white bg-white dark:bg-neutral-900 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <span className="font-black text-sm tracking-widest block">Credit Card</span>
                      <span className="text-[10px] font-bold text-neutral-400 tracking-widest">Encrypted & Secure</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-4 border-neutral-900 dark:border-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="bg-white dark:bg-neutral-900 p-8 rounded-[2.5rem] shadow-xl space-y-8 sticky top-32 border border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="text-neutral-400" />
              <h3 className="text-xl font-black text-neutral-900 dark:text-white tracking-tighter">Order Summary</h3>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto no-scrollbar space-y-4 pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-neutral-50 dark:bg-neutral-800 flex-shrink-0 p-1">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black truncate">{item.title}</p>
                      <p className="text-[10px] font-bold text-neutral-400">QTY: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-black">${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
              {cart.length === 0 && <p className="text-sm text-neutral-400 font-medium italic">Your bag is empty</p>}
            </div>

            <div className="space-y-4 pt-6 border-t border-neutral-100 dark:border-neutral-800">
              <div className="flex justify-between text-sm font-bold text-neutral-500 tracking-widest">
                <span>Subtotal</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-500 tracking-widest">
                <span>Shipping</span>
                <span className="text-green-500 font-black">FREE</span>
              </div>
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between text-2xl font-black text-neutral-900 dark:text-white tracking-tighter">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              onClick={handlePlaceOrder}
              disabled={isProcessing || cart.length === 0}
              className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-50 disabled:hover:scale-100"
            >
              {isProcessing ? "Processing..." : "Place Order Now"}
            </button>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-[10px] font-black text-neutral-400 tracking-widest">
                <ShieldCheck size={16} className="text-green-500" /> Secure checkout enabled
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black text-neutral-400 tracking-widest">
                <Truck size={16} className="text-blue-500" /> Express global delivery
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
