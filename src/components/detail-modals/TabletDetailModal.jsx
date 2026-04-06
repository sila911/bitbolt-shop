import { MonitorSmartphone, Cpu, BatteryCharging, Sparkles, Boxes } from 'lucide-react'
import BaseProductDetailModal from './BaseProductDetailModal'

export default function TabletDetailModal(props) {
  const { product } = props
  const parts = (product?.description || '')
    .split('•')
    .map((item) => item.trim())
    .filter(Boolean)

  const specs = [
    { icon: MonitorSmartphone, text: parts[0] || 'Large immersive display for content and creation' },
    { icon: Cpu, text: parts[1] || 'Powerful chip for multitasking and creative apps' },
    { icon: Boxes, text: parts[2] || 'Generous storage for projects and media' },
    { icon: BatteryCharging, text: parts[3] || 'Reliable battery for work and entertainment' },
    { icon: Sparkles, text: 'Great for note-taking, drawing, and portable workflows' },
  ]

  return (
    <BaseProductDetailModal
      {...props}
      topLabel="Tablet Detail"
      optionLabels={['11"', '13"', '1TB']}
      specs={specs}
    />
  )
}
