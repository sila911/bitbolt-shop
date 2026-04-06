import { Cpu, MonitorSmartphone, BatteryCharging, Boxes, Sparkles } from 'lucide-react'
import BaseProductDetailModal from './BaseProductDetailModal'

export default function LaptopDetailModal(props) {
  const { product } = props
  const parts = (product?.description || '')
    .split('•')
    .map((item) => item.trim())
    .filter(Boolean)

  const specs = [
    { icon: Cpu, text: parts[0] || 'Desktop-class performance with efficient thermals' },
    { icon: MonitorSmartphone, text: parts[1] || 'Color-accurate display built for pro workloads' },
    { icon: Boxes, text: parts[2] || 'Flexible memory and storage configurations' },
    { icon: BatteryCharging, text: parts[3] || 'All-day battery with fast charging support' },
    { icon: Sparkles, text: 'Ideal for coding, editing, and AI-accelerated tasks' },
  ]

  return (
    <BaseProductDetailModal
      {...props}
      topLabel="Laptop Detail"
      optionLabels={['13"', '14"', '16"']}
      specs={specs}
    />
  )
}
