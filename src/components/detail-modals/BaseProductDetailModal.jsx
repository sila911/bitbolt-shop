import { X, Heart, Star, Cpu, BatteryCharging, Camera, Sparkles, MonitorSmartphone, Boxes } from 'lucide-react'

const fallbackIcons = [Cpu, BatteryCharging, Camera, Sparkles, MonitorSmartphone, Boxes]

export default function BaseProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  optionLabels,
  specs,
  topLabel,
}) {
  if (!isOpen || !product) return null

  const filledStars = Math.round(product.rating || 0)
  const parsedItems = (product.description || '')
    .split('•')
    .map((item) => item.trim())
    .filter(Boolean)

  const normalizedSpecs = specs?.length
    ? specs
    : parsedItems.map((item, index) => ({ icon: fallbackIcons[index % fallbackIcons.length], text: item }))

  return (
    <div className="fixed inset-0 bg-[rgba(53,32,102,0.38)] backdrop-blur-sm flex items-center justify-center z-[9999]" onClick={onClose}>
      <div className="glass max-w-6xl w-full mx-3 md:mx-6 rounded-3xl overflow-hidden max-h-[92vh] overflow-y-auto" onClick={e => e.stopImmediatePropagation()}>
        <div className="p-4 md:p-6 flex items-center justify-between border-b border-[rgba(123,97,255,0.16)]">
          <p className="text-sm text-[var(--color-primary)] font-semibold tracking-wide uppercase">{topLabel || 'Product Detail'}</p>
          <button onClick={onClose} className="text-[var(--color-primary)]" aria-label="Close detail modal"><X size={26} /></button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.2fr]">
          <section className="p-5 md:p-8 lg:border-r border-[rgba(123,97,255,0.16)]">
            <div className="flex items-center gap-3 text-sm mb-6">
              {(optionLabels || ['Base', 'Pro', 'Max']).map((label, index) => (
                <button
                  key={label}
                  className={index === 0 ? 'glass px-4 py-1.5 rounded-2xl text-[var(--color-text)]' : 'px-4 py-1.5 rounded-2xl text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors'}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="rounded-3xl overflow-hidden border border-[rgba(123,97,255,0.14)] bg-white/40 dark:bg-black/10">
              <img src={product.img} alt={product.name} className="w-full aspect-[4/3] object-cover" />
            </div>

            <div className="flex items-center justify-center gap-3 mt-6">
              {[0, 1, 2, 3, 4].map((dot) => (
                <span
                  key={dot}
                  className={`h-2.5 w-2.5 rounded-full ${dot === 0 ? 'bg-[var(--color-text)]' : 'bg-[rgba(123,97,255,0.35)]'}`}
                />
              ))}
            </div>

            <p className="text-center text-xs text-[var(--color-muted)] mt-5">Available colorways</p>
            <div className="flex justify-center gap-3 mt-3">
              <span className="h-3.5 w-3.5 rounded-full bg-zinc-900" />
              <span className="h-3.5 w-3.5 rounded-full bg-zinc-300" />
              <span className="h-3.5 w-3.5 rounded-full bg-slate-400" />
            </div>
          </section>

          <section className="p-5 md:p-8">
            <p className="text-xs font-semibold tracking-wide text-[var(--color-primary)] uppercase">{product.category}</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-text)] mt-1">{product.name}</h2>

            <div className="flex flex-wrap items-center gap-4 mt-3">
              <p className="text-xl md:text-2xl font-semibold text-[var(--color-text)]">{product.price.toLocaleString()}$</p>
              <div className="flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={star <= filledStars ? 'fill-[var(--color-primary)] text-[var(--color-primary)]' : 'text-[var(--color-muted)]'}
                    />
                  ))}
                </div>
                <span>{product.rating} / 5</span>
              </div>
              <span className="text-sm text-[var(--color-muted)]">{product.sold} sold</span>
            </div>

            <div className="space-y-4 mt-7">
              {normalizedSpecs.map((item, index) => {
                const Icon = item.icon || fallbackIcons[index % fallbackIcons.length]
                return (
                  <div key={`${item.text}-${index}`} className="grid grid-cols-[22px_1fr] gap-4 py-2 border-b border-[rgba(123,97,255,0.14)] last:border-b-0">
                    <Icon size={18} className="mt-0.5 text-[var(--color-primary)]" />
                    <p className="text-[var(--color-text)] leading-snug">{item.text}</p>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
              <button
                onClick={() => { onAddToCart(product); onClose() }}
                className="brand-gradient text-white py-4 rounded-2xl font-semibold"
              >
                Buy Now
              </button>
              <button
                onClick={() => onToggleFavorite(product.id)}
                className="glass py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 text-[var(--color-text)]"
              >
                <Heart className={isFavorite ? 'fill-[var(--color-primary)] text-[var(--color-primary)]' : 'text-[var(--color-muted)]'} size={18} />
                {isFavorite ? 'Saved in Favorites' : 'Save to Favorites'}
              </button>
            </div>

            <p className="text-[var(--color-muted)] text-sm mt-5">Quick summary: {product.description}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
