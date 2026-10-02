import { X, Heart, Star, ShoppingBag, Truck, ShieldCheck, RefreshCcw, StarHalf } from 'lucide-react'
import { useState } from 'react'

import { useCart } from '../hooks/useCart'
import { useFavorites } from '../hooks/useFavorites'

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart, onToggleFavorite, isFavorite }) {
  const [activeImage, setActiveImage] = useState(0)
  const cartCtx = useCart()
  const favCtx = useFavorites()

  if (!isOpen || !product) return null

  const handleAddToCart = onAddToCart ?? cartCtx?.addToCart
  const handleToggleFavorite = onToggleFavorite ?? favCtx?.toggleFavorite
  const favorited = isFavorite !== undefined ? isFavorite : favCtx?.isFavorite?.(product.id)

  const {
    id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    images,
    reviews,
    warrantyInformation,
    shippingInformation,
    returnPolicy,
    weight,
    dimensions
  } = product

  const originalPrice = Math.round(price / (1 - discountPercentage / 100))
  const isLowStock = stock < 10

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)
      } else if (i - 0.5 <= rating) {
        stars.push(<StarHalf key={i} size={16} className="fill-yellow-400 text-yellow-400" />)
      } else {
        stars.push(<Star key={i} size={16} className="text-neutral-300 dark:text-neutral-700" />)
      }
    }
    return stars
  }

  return (
    <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md flex items-center justify-center z-[9999] p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-6xl rounded-[2.5rem] overflow-hidden max-h-[90vh] flex flex-col shadow-2xl" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
             <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-[10px] font-bold text-neutral-500">
               {category.replace('-', ' ')}
             </span>
             {isLowStock && (
               <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-[10px] font-bold">
                 Limited Stock
               </span>
             )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-400">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Gallery */}
            <section className="p-8 lg:border-r border-neutral-100 dark:border-neutral-800">
              <div className="aspect-square rounded-3xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/50 mb-6 group relative">
                <img 
                  src={images[activeImage]} 
                  alt={title} 
                  className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-neutral-900 dark:border-white scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${title} ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Extra Info Icons */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col items-center p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 text-center">
                   <Truck size={20} className="mb-2 text-neutral-400" />
                   <span className="text-[10px] font-bold text-neutral-900 dark:text-neutral-100 leading-tight">{shippingInformation}</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 text-center">
                   <ShieldCheck size={20} className="mb-2 text-neutral-400" />
                   <span className="text-[10px] font-bold text-neutral-900 dark:text-neutral-100 leading-tight">{warrantyInformation}</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 text-center">
                   <RefreshCcw size={20} className="mb-2 text-neutral-400" />
                   <span className="text-[10px] font-bold text-neutral-900 dark:text-neutral-100 leading-tight">{returnPolicy}</span>
                </div>
              </div>
            </section>

            {/* Content */}
            <section className="p-8 flex flex-col">
              <div className="mb-8">
                <p className="text-sm font-bold text-neutral-400 mb-2">{brand}</p>
                <h2 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tighter leading-none mb-4">{title}</h2>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {renderStars(rating)}
                  </div>
                  <span className="text-sm font-bold text-neutral-900 dark:text-white">{rating}</span>
                  <span className="text-neutral-300 dark:text-neutral-700">|</span>
                  <span className="text-sm font-bold text-neutral-400">{stock} In Stock</span>
                </div>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white">${price.toLocaleString()}</span>
                {discountPercentage > 0 && (
                  <>
                    <span className="text-xl text-neutral-400 line-through decoration-red-500/50">${originalPrice.toLocaleString()}</span>
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-black rounded-lg">-{Math.round(discountPercentage)}%</span>
                  </>
                )}
              </div>

              <div className="space-y-6 mb-10">
                <div>
                  <h4 className="text-xs font-black text-neutral-400 mb-2">Description</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{description}</p>
                </div>

                <div className="grid grid-cols-2 gap-8 py-6 border-y border-neutral-100 dark:border-neutral-800">
                  <div>
                    <h4 className="text-[10px] font-black text-neutral-400 mb-2">Weight</h4>
                    <p className="font-bold text-neutral-900 dark:text-white">{weight}g</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-neutral-400 mb-2">Dimensions</h4>
                    <p className="font-bold text-neutral-900 dark:text-white">
                      {dimensions.width}x{dimensions.height}x{dimensions.depth} cm
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 mt-auto">
                <button
                  onClick={(e) => { 
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product); 
                    onClose();
                  }}
                  className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95 shadow-xl"
                >
                  <ShoppingBag size={20} className="pointer-events-none" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleToggleFavorite(product)}
                  className={`p-5 rounded-2xl border-2 transition-all flex items-center justify-center ${
                    favorited 
                      ? 'bg-red-50 border-red-200 text-red-500 dark:bg-red-900/20 dark:border-red-800' 
                      : 'border-neutral-100 dark:border-neutral-800 text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <Heart size={24} className={favorited ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Reviews Section */}
              <div className="mt-12 pt-12 border-t border-neutral-100 dark:border-neutral-800">
                <h4 className="text-xs font-black text-neutral-400 mb-6">Customer Reviews</h4>
                <div className="space-y-8">
                  {reviews.map((rev, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-sm text-neutral-900 dark:text-white">{rev.reviewerName}</span>
                        <div className="flex gap-1">{renderStars(rev.rating)}</div>
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed italic">"{rev.comment}"</p>
                      <span className="text-[10px] font-bold text-neutral-300 dark:text-neutral-700 mt-2">
                        {new Date(rev.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
