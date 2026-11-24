import { Location as MapPin, CloseCircle as X } from "iconsax-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const initialForm = {
  fullName: '',
  phoneNumber: '',
  telegram: '',
  email: '',
  address: '',
  mapLocation: '',
  mark: '',
};

export default function CheckoutInfoModal({ isOpen, onClose, onSubmit, isSubmitting }) {
  const [form, setForm] = useState(initialForm);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps', '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="checkout-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            key="checkout-modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-semibold text-white tracking-tight">Checkout Details</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Enter delivery and contact information.</p>
              </div>
              <button 
                onClick={onClose} 
                className="text-zinc-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800 cursor-pointer" 
                aria-label="Close checkout form"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-left">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-zinc-300">Full Name *</span>
                <input
                  required
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="bg-zinc-950/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 outline-none text-zinc-100 placeholder-zinc-500 text-sm transition-colors"
                  placeholder="John Doe"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-zinc-300">Phone Number *</span>
                  <input
                    required
                    value={form.phoneNumber}
                    onChange={(e) => updateField('phoneNumber', e.target.value)}
                    className="bg-zinc-950/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 outline-none text-zinc-100 placeholder-zinc-500 text-sm transition-colors"
                    placeholder="+855..."
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-zinc-300">Telegram Handle / Phone *</span>
                  <input
                    required
                    value={form.telegram}
                    onChange={(e) => updateField('telegram', e.target.value)}
                    className="bg-zinc-950/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 outline-none text-zinc-100 placeholder-zinc-500 text-sm transition-colors"
                    placeholder="@username or phone"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-zinc-300">Email Address (Optional)</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="bg-zinc-950/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 outline-none text-zinc-100 placeholder-zinc-500 text-sm transition-colors"
                  placeholder="name@example.com"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-zinc-300">Delivery Address *</span>
                <textarea
                  required
                  rows={2}
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className="bg-zinc-950/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 outline-none text-zinc-100 placeholder-zinc-500 text-sm transition-colors resize-none"
                  placeholder="Street, building, district, city"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-zinc-300">Map Location Link *</span>
                <div className="flex gap-2">
                  <input
                    required
                    value={form.mapLocation}
                    onChange={(e) => updateField('mapLocation', e.target.value)}
                    className="flex-1 bg-zinc-950/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 outline-none text-zinc-100 placeholder-zinc-500 text-sm transition-colors"
                    placeholder="Google Maps link or coordinates"
                  />
                  <button
                    type="button"
                    onClick={openGoogleMaps}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 rounded-xl px-3 py-2.5 text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                  >
                    <MapPin size={15} /> Select
                  </button>
                </div>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-zinc-300">Delivery Notes (Optional)</span>
                <input
                  value={form.mark}
                  onChange={(e) => updateField('mark', e.target.value)}
                  className="bg-zinc-950/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 outline-none text-zinc-100 placeholder-zinc-500 text-sm transition-colors"
                  placeholder="Floor number, gate code, landmarks"
                />
              </label>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-zinc-800 hover:bg-zinc-750 text-zinc-300 px-4 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-zinc-100 hover:bg-white text-zinc-950 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Order'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
