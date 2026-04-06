import { MapPin, X } from 'lucide-react'
import { useState } from 'react'

const initialForm = {
  fullName: '',
  phoneNumber: '',
  telegram: '',
  email: '',
  address: '',
  mapLocation: '',
  mark: '',
}

export default function CheckoutInfoModal({ isOpen, onClose, onSubmit, isSubmitting }) {
  const [form, setForm] = useState(initialForm)

  if (!isOpen) return null

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps', '_blank', 'noopener,noreferrer')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(form)
  }

  return (
    <div className="fixed inset-0 bg-[rgba(53,32,102,0.45)] backdrop-blur-sm flex items-center justify-center z-[10000]" onClick={onClose}>
      <div className="glass w-full max-w-2xl mx-3 md:mx-6 rounded-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 md:p-6 flex items-center justify-between border-b border-[rgba(123,97,255,0.16)]">
          <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-text)]">Checkout Information</h3>
          <button onClick={onClose} className="text-[var(--color-primary)]" aria-label="Close checkout form">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm text-[var(--color-text)]">Full name *</span>
            <input
              required
              value={form.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className="glass rounded-2xl px-4 py-3 outline-none text-[var(--color-text)]"
              placeholder="Your full name"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-[var(--color-text)]">Phone number *</span>
            <input
              required
              value={form.phoneNumber}
              onChange={(e) => updateField('phoneNumber', e.target.value)}
              className="glass rounded-2xl px-4 py-3 outline-none text-[var(--color-text)]"
              placeholder="+855..."
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-[var(--color-text)]">Telegram (phone or username) *</span>
            <input
              required
              value={form.telegram}
              onChange={(e) => updateField('telegram', e.target.value)}
              className="glass rounded-2xl px-4 py-3 outline-none text-[var(--color-text)]"
              placeholder="@username or +855..."
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-[var(--color-text)]">E-mail (optional)</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="glass rounded-2xl px-4 py-3 outline-none text-[var(--color-text)]"
              placeholder="name@example.com"
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm text-[var(--color-text)]">Address *</span>
            <textarea
              required
              value={form.address}
              onChange={(e) => updateField('address', e.target.value)}
              className="glass rounded-2xl px-4 py-3 outline-none text-[var(--color-text)] min-h-[90px]"
              placeholder="Street, city, additional details"
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm text-[var(--color-text)]">Google map location *</span>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                required
                value={form.mapLocation}
                onChange={(e) => updateField('mapLocation', e.target.value)}
                className="glass rounded-2xl px-4 py-3 outline-none text-[var(--color-text)] flex-1"
                placeholder="Paste Google Maps link or pin"
              />
              <button
                type="button"
                onClick={openGoogleMaps}
                className="glass rounded-2xl px-4 py-3 text-[var(--color-text)] flex items-center justify-center gap-2"
              >
                <MapPin size={16} /> Select on map
              </button>
            </div>
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm text-[var(--color-text)]">Mark (optional)</span>
            <textarea
              value={form.mark}
              onChange={(e) => updateField('mark', e.target.value)}
              className="glass rounded-2xl px-4 py-3 outline-none text-[var(--color-text)] min-h-[80px]"
              placeholder="House note, floor, landmark, etc."
            />
          </label>

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="glass px-5 py-3 rounded-2xl text-[var(--color-text)]">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="brand-gradient text-white px-6 py-3 rounded-2xl font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Confirm & Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
