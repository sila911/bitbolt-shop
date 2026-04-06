import { Sparkles, BatteryCharging, Boxes, Cpu, MonitorSmartphone } from 'lucide-react'
import BaseProductDetailModal from './BaseProductDetailModal'

export default function AudioDetailModal(props) {
  const { product } = props
  const parts = (product?.description || '')
    .split('•')
    .map((item) => item.trim())
    .filter(Boolean)

  const specs = [
    { icon: Sparkles, text: parts[0] || 'Premium sound tuning for rich audio detail' },
    { icon: BatteryCharging, text: parts[1] || 'Extended listening time with quick charging' },
    { icon: Cpu, text: parts[2] || 'Intelligent noise control and adaptive processing' },
    { icon: MonitorSmartphone, text: parts[3] || 'Stable multi-device connectivity and controls' },
    { icon: Boxes, text: 'Built for commuting, focus sessions, and travel' },
  ]

  return (
    <BaseProductDetailModal
      {...props}
      topLabel="Audio Detail"
      optionLabels={['Standard', 'Pro', 'Max']}
      specs={specs}
    />
  )
}
