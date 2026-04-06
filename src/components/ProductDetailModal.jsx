import LaptopDetailModal from './detail-modals/LaptopDetailModal'
import PhoneDetailModal from './detail-modals/PhoneDetailModal'
import TabletDetailModal from './detail-modals/TabletDetailModal'
import AudioDetailModal from './detail-modals/AudioDetailModal'

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart, onToggleFavorite, isFavorite }) {
  if (!isOpen || !product) return null

  const sharedProps = { product, isOpen, onClose, onAddToCart, onToggleFavorite, isFavorite }

  if (product.category === 'Laptop') {
    return <LaptopDetailModal {...sharedProps} />
  }

  if (product.category === 'Phone') {
    return <PhoneDetailModal {...sharedProps} />
  }

  if (product.category === 'Tablet') {
    return <TabletDetailModal {...sharedProps} />
  }

  if (product.category === 'Audio') {
    return <AudioDetailModal {...sharedProps} />
  }

  return <LaptopDetailModal {...sharedProps} />
}