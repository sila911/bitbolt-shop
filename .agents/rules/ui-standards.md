---
description: Mandatory UI, typography, and anti-AI-slop design standards for BitBolt storefront components, modals, and navigation.
trigger: always_on
---

# BitBolt UI & Anti-AI-Slop Standards

All UI components in BitBolt must adhere to these standards to eliminate generic AI generated design patterns ("AI slop") and enforce a crisp, high-contrast, tactile primitive aesthetic.

## 1. Anti-AI-Slop Rules (STRICT)
- 🚫 **Forbidden Icons: Lucide `Sparkles` / Iconsax `MagicStar`**:
  - NEVER use the `Sparkles` or `MagicStar` icon.
  - Use clean, purposeful icons such as `ArrowRight`, `SearchNormal1`, `Bag2`, `Heart`, `ShieldTick`, `TruckFast`, etc.
- 🚫 **Forbidden Copy Clichés & Decorative Emojis**:
  - Never put decorative emojis in titles, headers, badges, or buttons (e.g. `✨`, `⚡`, `🎧`, `🔥`).
  - Avoid AI marketing slogans ("Elevate your lifestyle", "Crafted with love", "Unleash your potential", "Find your style").
  - Keep copy concise, sharp, and descriptive (e.g. "Mechanical Keyboards", "In Stock", "Free Shipping Over $50").
- 🚫 **No Muddy Rainbow / Pastel AI Gradients**:
  - Avoid generic `from-[#8b7df8] via-[#ba8cf9] to-[#f093b0]` pastel gradients.
  - Use deliberate, high-contrast dark tones: rich blacks (`bg-zinc-950`, `bg-[#0a0a0c]`), deep slate/zinc card backgrounds (`bg-zinc-900/90`, `border-zinc-800`), and crisp single-color accent highlights (e.g., electric indigo or clean white).

## 2. Backdrop Scrims & Modals (Modal Standards)
- 🚫 **No Heavy Gaussian Backdrop Blur on Scrims**:
  - Never use `backdrop-blur-*` on large fixed modal/drawer backdrop scrims (causes GPU lag on mobile/lower-end GPUs and smudges text).
  - Use clean dimming scrims: `bg-black/60` or `bg-black/50`.
- ✅ **Smooth Motion & AnimatePresence**:
  - Always wrap conditional modal and drawer renders inside `<AnimatePresence>`.
  - Provide both entrance (`initial`) and exit (`exit`) transitions so modals and drawers slide or fade out smoothly.
- **Copy Conciseness in Modals**:
  - Modal title: 2–4 words max ("Checkout Details", "Select Options").
  - Subtitle: 1 short sentence max.

## 3. Typography & Numbers (STRICT)
- 🚫 **NEVER use `font-mono` on prices, stats, ratings, or countdowns.**
  - Monospace fonts draw zeros with central dots/slashes and create uneven visual rhythm in e-commerce interfaces.
- ✅ **Clean Proportional Numbers**:
  - Use standard sans font with `tabular-nums` for prices and quantities (e.g. `font-sans font-semibold tabular-nums`).
  - Numbers must look modern, crisp, and open.

## 4. Buttons, Contrast & Interaction
- **Primary Buttons**: High-contrast solid fills (`bg-zinc-100 text-zinc-950 hover:bg-white font-medium` or `bg-indigo-600 hover:bg-indigo-500 text-white font-semibold`).
- **Destructive**: `bg-rose-600 hover:bg-rose-500 text-white`.
- **Secondary / Ghost**: `bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/60`.
- **Silent Interactions**: No synthetic audio click sounds on taps/buttons. Tactile visual states (`active:scale-[0.98] transition-transform`).
