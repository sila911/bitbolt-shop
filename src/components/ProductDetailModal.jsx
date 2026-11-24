import { CloseCircle as X, Heart, Star1 as Star, ShoppingBag, TruckFast as Truck, ShieldTick as ShieldCheck, RotateLeft as RefreshCcw } from 'iconsax-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart, onToggleFavorite, isFavorite }) {
  const [activeImage, setActiveImage] = useState(0);
  const cartCtx = useCart();
  const favCtx = useFavorites();

  const handleAddToCart = onAddToCart ?? cartCtx?.addToCart;
  const handleToggleFavorite = onToggleFavorite ?? favCtx?.toggleFavorite;
  const favorited = isFavorite !== undefined ? isFavorite : favCtx?.isFavorite?.(product?.id);

  if (!product) return null;

  const {
    title,
    description,
    price,
    discountPercentage = 0,
    rating = 0,
    stock = 0,
    brand = '',
    category = '',
    images = [],
    reviews = [],
    warrantyInformation = 'Standard 1-year warranty',
    shippingInformation = 'Standard 2-4 day shipping',
    returnPolicy = '30-day return policy',
    weight = 0,
    dimensions = { width: 0, height: 0, depth: 0 }
  } = product;

  const originalPrice = Math.round(price / (1 - discountPercentage / 100));
  const isLowStock = stock > 0 && stock < 10;

  const renderStars = (ratingVal) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(ratingVal)) {
        stars.push(<Star key={i} size={15} variant="Bold" className="text-amber-400" />);
      } else if (i - 0.5 <= ratingVal) {
        stars.push(<Star key={i} size={15} variant="Linear" className="text-amber-400" />);
      } else {
        stars.push(<Star key={i} size={15} variant="Linear" className="text-zinc-600" />);
      }
    }
    return stars;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="product-detail-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div 
            key="product-detail-card"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="bg-zinc-900 border border-zinc-800 text-zinc-100 w-full max-w-5xl rounded-2xl overflow-hidden max-h-[90vh] flex flex-col shadow-2xl" 
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-zinc-800 rounded-md text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  {category.replace('-', ' ')}
                </span>
                {isLowStock && (
                  <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md text-xs font-medium">
                    Low Stock: {stock} units left
                  </span>
                )}
              </div>
              <button 
                onClick={onClose} 
                className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white cursor-pointer"
                aria-label="Close product view"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image Gallery */}
                <section className="p-6 sm:p-8 lg:border-r border-zinc-800 flex flex-col">
                  <div className="aspect-square rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 mb-4 flex items-center justify-center">
                    <img 
                      src={images[activeImage] || images[0]} 
                      alt={title} 
                      className="w-full h-full object-contain p-4" 
                    />
                  </div>
                  
                  {images.length > 1 && (
                    <div className="flex gap-2.5 overflow-x-auto pb-2">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(idx)}
                          className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border bg-zinc-950 p-1 transition-all cursor-pointer ${
                            activeImage === idx 
                              ? 'border-zinc-200 ring-1 ring-zinc-200' 
                              : 'border-zinc-800 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`${title} preview ${idx + 1}`} className="w-full h-full object-contain" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Trust Specs */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="flex flex-col items-center p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-center">
                      <Truck size={18} className="mb-1 text-zinc-400" />
                      <span className="text-[11px] font-medium text-zinc-300 leading-tight">{shippingInformation}</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-center">
                      <ShieldCheck size={18} className="mb-1 text-zinc-400" />
                      <span className="text-[11px] font-medium text-zinc-300 leading-tight">{warrantyInformation}</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-center">
                      <RefreshCcw size={18} className="mb-1 text-zinc-400" />
                      <span className="text-[11px] font-medium text-zinc-300 leading-tight">{returnPolicy}</span>
                    </div>
                  </div>
                </section>

                {/* Content */}
                <section className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {brand && <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">{brand}</p>}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-3">{title}</h2>
                    
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center gap-1">
                        {renderStars(rating)}
                      </div>
                      <span className="text-xs font-semibold text-zinc-200 tabular-nums">{rating}</span>
                      <span className="text-zinc-700">|</span>
                      <span className="text-xs text-zinc-400 tabular-nums">{stock} in stock</span>
                    </div>

                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-3xl sm:text-4xl font-bold text-white tabular-nums">${price.toLocaleString()}</span>
                      {discountPercentage > 0 && (
                        <>
                          <span className="text-lg text-zinc-500 line-through tabular-nums">${originalPrice.toLocaleString()}</span>
                          <span className="px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-md tabular-nums">
                            -{Math.round(discountPercentage)}%
                          </span>
                        </>
                      )}
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Overview</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed font-normal">{description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-800">
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">Weight</h4>
                          <p className="text-sm text-zinc-200 tabular-nums font-medium">{weight}g</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">Dimensions</h4>
                          <p className="text-sm text-zinc-200 tabular-nums font-medium">
                            {dimensions.width} × {dimensions.height} × {dimensions.depth} cm
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-[1fr_auto] gap-3 pt-4 border-t border-zinc-800">
                    <button
                      onClick={(e) => { 
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart?.(product); 
                        onClose();
                      }}
                      className="bg-zinc-100 hover:bg-white text-zinc-950 py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag size={17} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleToggleFavorite?.(product)}
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
                        favorited 
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                          : 'bg-zinc-800/80 border-zinc-700/60 text-zinc-400 hover:text-white'
                      }`}
                      aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={20} variant={favorited ? 'Bold' : 'Linear'} className={favorited ? 'text-rose-400' : ''} />
                    </button>
                  </div>

                  {/* Reviews Section */}
                  {reviews.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-zinc-800">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Customer Reviews</h4>
                      <div className="space-y-4">
                        {reviews.slice(0, 3).map((rev, idx) => (
                          <div key={idx} className="bg-zinc-950/60 border border-zinc-800/70 p-3.5 rounded-xl">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-xs text-zinc-200">{rev.reviewerName}</span>
                              <div className="flex gap-0.5">{renderStars(rev.rating)}</div>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">"{rev.comment}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
