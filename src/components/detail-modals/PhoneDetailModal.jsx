import { Camera, Cpu, BatteryCharging, Sparkles, Boxes } from 'lucide-react'
import BaseProductDetailModal from './BaseProductDetailModal'

export default function PhoneDetailModal(props) {
  const { product } = props
  const parts = (product?.description || '')
    .split('•')
    .map((item) => item.trim())
    .filter(Boolean)

  const specs = [
    { icon: Camera, text: parts[0] || 'Advanced camera system for pro-level shots' },
    { icon: Cpu, text: parts[1] || 'Flagship chipset optimized for speed and efficiency' },
    { icon: Boxes, text: parts[2] || 'Multiple storage options for photos and apps' },
    { icon: BatteryCharging, text: parts[3] || 'Long battery life with fast top-up charging' },
    { icon: Sparkles, text: 'Smart features designed for daily productivity' },
  ]

  return (
    <BaseProductDetailModal
      {...props}
      topLabel="Phone Detail"
      optionLabels={['128GB', '256GB', '512GB']}
      specs={specs}
    />
  )
}
