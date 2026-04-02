import { X, Heart } from 'lucide-react'

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart, onToggleFavorite, isFavorite }) {
  if (!isOpen || !product) return null
  return (
    <div className="fixed inset-0 bg-[rgba(53,32,102,0.38)] backdrop-blur-sm flex items-center justify-center z-[9999]" onClick={onClose}>
      <div className="glass max-w-2xl w-full mx-4 rounded-3xl overflow-hidden" onClick={e => e.stopImmediatePropagation()}>
        <div className="p-8 flex justify-between border-b border-[rgba(123,97,255,0.16)]">
          <h2 className="text-3xl font-semibold text-[var(--color-text)]">{product.name}</h2>
          <button onClick={onClose} className="text-[var(--color-primary)]"><X size={32} /></button>
        </div>
        <img src={product.img} className="w-full h-96 object-cover" />
        <div className="p-8">
          <p className="text-[var(--color-muted)]">{product.description}</p>
          <div className="flex gap-4 mt-8">
            <button onClick={() => { onAddToCart(product); onClose() }} className="flex-1 brand-gradient text-white py-5 rounded-3xl font-semibold">ADD TO CART</button>
            <button onClick={() => onToggleFavorite(product.id)} className="flex-1 glass py-5 rounded-3xl font-semibold flex items-center justify-center gap-3">
              <Heart className={isFavorite ? 'fill-[var(--color-primary)] text-[var(--color-primary)]' : 'text-[var(--color-muted)]'} /> {isFavorite ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}