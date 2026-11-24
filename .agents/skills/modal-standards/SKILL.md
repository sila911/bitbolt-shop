---
name: modal-standards
description: Design, animation, backdrop blur, and layout standards for modals, bottom sheets, alert dialogs, and full-screen screens in SudoKH. Use when creating or updating modals, dialogs, sheets, and overlay navigation.
---

# Modal & Bottom Sheet Design Standards for SudoKH

This skill documents the design rules, motion patterns, backdrop blur constraints, and layout guidelines for all modals, sheets, and full-screen overlay screens in SudoKH. Follow these rules for consistent, premium iOS 26-grade UX.

## 1. Backdrop Blur & Dimming Rules (Native by Human UX)

**Rule**: Never use `backdrop-blur-*` on sheet, card, or modal backdrop overlays or cards. In native iOS/Android, backdrops are clean dimming scrims, not smudged Gaussian blur. Eliminating backdrop-blur prevents mobile Safari/Chrome GPU lag, battery drain, and text smudging.

### Standard Backdrop Overlay Classes
- **Preferred Backdrop**: `bg-black/50` (or `bg-black/45`)
- **Dismiss Interaction**: Always support tapping the backdrop (`onClick={onClose}`) with `(e) => e.stopPropagation()` on the modal card content.

### Modal Card & Sheet Surfaces (iOS 26 Optical Liquid Glass)
- **Preferred Standard**: Use `<LiquidGlassModalCard>` (centered floating modals) and `<LiquidGlassSheetCard>` (draggable iOS bottom sheets) from `@/components/ui/LiquidGlassModal`, powered by `@glass-sdk/liquid-glass` (`material="regular"`, untinted, `radius={32}`, `refraction={44}`).
- **Readable Glass Veil**: Soft luminous veil (`bg-white/48 dark:bg-slate-900/58` for modals, `bg-white/50 dark:bg-slate-900/60` for sheets) with subtle specular rim borders (`border border-white/60 dark:border-white/15`). Never apply heavy `tint` props on surfaces with dark/body typography.
- **No CSS `backdrop-blur-*` on Dimming Scrims**: Dimming scrims remain clean (`bg-black/40`–`bg-black/50`) without CSS blur smudging.
- **Automatic Fallback**: On devices/browsers without WebGPU, `<LiquidGlassModalCard>` and `<LiquidGlassSheetCard>` fall back cleanly to crisp solid `bg-white dark:bg-slate-900` with `border-slate-200/80 dark:border-slate-800`.
- **Nested Tab Sheets**: Wrap sheets rendered inside `<LiquidGlassContent>` (e.g., inside `HomePage`, `LearnPage`, `DailyPage`) in `<LiquidGlassPortal>` from `@/components/ui/LiquidGlass` so they escape the content SVG filter and refract the live page cleanly.

---

## 2. Animation & Framer Motion Structure (CRITICAL)

### Always Wrap Conditional Renders Inside `<AnimatePresence>`
**Fatal Bug to Avoid**: Placing `if (!isOpen) return null;` outside `<AnimatePresence>` unmounts the component instantly without running exit animations.

```tsx
// ❌ WRONG — Instant unmount, zero exit slide animation:
export const MyScreen = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div exit={{ x: '100%' }}>...</motion.div>
    </AnimatePresence>
  );
};

// ✅ CORRECT — Smooth enter AND exit animations:
export const MyScreen = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="my-screen-overlay"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          drag="x"
          dragDirectionLock
          dragConstraints={{ left: 0 }}
          dragElastic={{ right: 0.6 }}
          style={{ touchAction: 'pan-y' }}
          onDragEnd={(_e, { offset, velocity }) => {
            if (offset.x > 80 || velocity.x > 400) onClose();
          }}
        >
          ...
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

---

## 3. Modal Archetypes in SudoKH

### A. Full-Screen Push Pages (Leaderboard, Search, User Profile, Settings)
- **Transition**: Push/pop slide from right (`x: '100%'` -> `x: 0` -> `x: '100%'`).
- **Timing**: `transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}`.
- **Gesture**: Horizontal swipe-to-back (`drag="x"`, `dragConstraints={{ left: 0 }}`).
- **Z-Index Layering**:
  - `z-200`: Standard sheets
  - `z-250`: Leaderboard & Settings
  - `z-280`: Search Screen
  - `z-290`: User Profile Modal (layers cleanly over Search and Leaderboard)
  - `z-310`: Auth & Alert Dialogs

### B. Bottom Sheets (Auth, Mode Select, Lobby, Profile Edit, Reaction Drawer)
- **NO Top-Right Close Button**: Bottom sheets MUST NOT contain an `X` or close button in the top right or header. Users dismiss bottom sheets by dragging down the grab pill handle or tapping the backdrop overlay.
- **Card Transition (Slide Down on Exit)**:
  - Enter: Slide up from bottom: `initial={{ y: '100%' }} animate={{ y: 0 }}`
  - Exit: **Pure Slide Down**: `exit={{ y: '100%' }}` (NEVER add `opacity: 0` on card exit, ensuring the card visibly slides all the way off-screen).
  - Timing: `transition={{ type: 'spring', damping: 30, stiffness: 340 }}` (or `transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}`).
  - Swipe-down gesture:
    ```tsx
    drag="y"
    dragDirectionLock
    dragConstraints={{ top: 0 }}
    dragElastic={{ top: 0.05, bottom: 0.6 }}
    style={{ touchAction: 'pan-x' }}
    onDragEnd={(_e, { offset, velocity }) => {
      if (offset.y > 90 || velocity.y > 450) onClose();
    }}
    ```
- **Backdrop Overlay Coordination**:
  - The outer overlay MUST be a `<motion.div>` with `initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }}` so Framer Motion coordinates the card slide-down with the backdrop fade without cutting off.
- **Structure**: Rounded top corners `rounded-t-[36px] sm:rounded-[36px]`, centered grab pill handle `w-12 h-1.5 rounded-full bg-slate-300/80 dark:bg-white/20 mx-auto mt-3 mb-1`.
- **Max Height**: `max-h-[88dvh] overflow-hidden flex flex-col`.

### C. Centered Alert / Confirmation / Rematch Dialogs (Konsta UI iOS Dialog)
- **Standard Component**: Use Konsta UI `<Dialog>` and `<DialogButton>`.
- **Z-Index Layering**: Always set `className="z-350"` on `<Dialog>`. (Coordinated with backdrop at `z-340`).
- **Concise Copy Mandate**:
  - Title: Crisp, bold, maximum 2–4 words (e.g., `"Leave Duel?"`, `"Waiting for Rematch"`, `"Rematch Declined"`).
  - Subtitle / Content: Single concise sentence (e.g., `"Forfeit and lose 8 ELO?"`, `"Waiting for opponent to accept..."`).
  - **NEVER** write long multi-paragraph descriptions in alert dialogs.
- **Top Icon Badge**:
  - `w-12 h-12 rounded-full bg-<color>-500/10 dark:bg-<color>-500/20 text-<color>-500 flex items-center justify-center my-0.5`.
- **Button Contrast & Semantic Color System**:
  - **Destructive (Forfeit / Delete / Exit)**:
    `className="bg-rose-600! hover:bg-rose-500! active:bg-rose-700! text-white! font-bold"`
  - **Success / Affirmative (Rematch / Accept)**:
    `className="bg-emerald-600! hover:bg-emerald-500! active:bg-emerald-700! text-white! font-bold"`
  - **Primary Action (OK / Confirm / Done)**:
    `className="bg-brand-primary! hover:bg-blue-600! active:bg-blue-700! text-white! font-bold"`
  - **Secondary Action (Cancel / Keep Playing)**:
    `className="text-slate-700! dark:text-white! font-medium"`
  - 🚫 **STRICT FORBIDDEN PATTERN**: Never use colored text (e.g. `text-red-400`, `text-emerald-300`) on a bright blue button (`bg-brand-primary` / `bg-[#0071E3]`). Solid fill + clean white text or neutral tonal buttons only!
- **Haptic Integration**: Always trigger `triggerHaptic('tap')` on cancel, `triggerHaptic('success')` on affirmative, and `triggerHaptic('error')` on forfeit/destructive.

### D. Pre-Permission Bottom Sheets (Camera, Media, Notifications)
- **Never Show If Already Allowed**: Prior to opening the pre-permission sheet, ALWAYS verify if the user has already granted permission:
  1. Check `localStorage` for persisted consent flags.
  2. Query `navigator.permissions.query({ name: 'camera' as any })` for `'granted'` status.
  3. Verify `navigator.mediaDevices.enumerateDevices()` for non-empty device labels.
  - If permission is already granted, **bypass the sheet completely** and start the hardware feature directly.
- **Standalone 3D Icon (No Background Box)**:
  - Hero 3D icons MUST be rendered **standalone** with clean drop shadow (`size={80}` to `size={96}`).
  - **NEVER** wrap the 3D icon in a rounded square card, background gradient box, or corner badge dot.
- **Single-Word Action Buttons (`rounded-full h-12`)**:
  - Two buttons side-by-side at the bottom:
    - **Left (Secondary)**: One-word shortcut (e.g., **"Upload"** / **"រូបភាព"**) that skips intermediate flow and triggers native file picker directly.
    - **Right (Primary)**: One-word action (e.g., **"Enable"** / **"បើក"**) that persists consent to `localStorage` and triggers the native browser prompt.

### E. Player Lobby & Duo Bottom Sheets (`LobbySheet.tsx`)
- **No Redundant Header**: Bottom sheets must NOT contain redundant header banners with `X` buttons. Use the native iOS drag handle pill:
  `w-9 h-1 rounded-full bg-slate-300 dark:bg-white/20 mx-auto mt-2.5 mb-1 shrink-0`.
- **Circular Avatar Slots `(o)`**:
  - Player profile slots MUST use circular avatars: `w-16 h-16 rounded-full` (never squircle or rectangular boxes).
  - Host badge: `rounded-full px-2 py-0.5 text-3xs font-black`.
- **Concise Player Status**:
  - Use short status strings: `"Host"`, `"Ready"`, `"Picking..."`, `"Waiting for partner..."`.
- **Sheet Radius**: Use standard Tailwind v4 scale: `rounded-t-4xl sm:rounded-4xl`.

### F. Quick Reaction Dock & Dynamic Island Toasts (`ReactionDrawer.tsx`)
- **Tapback Dock Capsule**:
  - Rendered as an Apple iMessage-style floating pill capsule dock (`rounded-full` or `rounded-4xl`).
  - Contains 6 circular emoji reaction buttons `(o)` (`w-11 h-11 rounded-full`).
  - Haptic feedback on tap: `triggerHaptic('tap')`.
- **Dynamic Island Reaction Toasts**:
  - Live opponent emoji reactions float as iOS Dynamic Island pills:
    `rounded-full bg-slate-900/95 dark:bg-black/95 text-white border border-white/10 shadow-lg px-4 py-2 flex items-center gap-2.5`.

---

## 4. Icon Motion & Animation Standards

### A. Icon Spin Direction Rules
- **Counter-Clockwise Icons (`RotateCcw`)**:
  - Lucide's `RotateCcw` curves counter-clockwise.
  - Standard `animate-spin` rotates clockwise (positive degrees), causing the arrow to move backwards.
  - **Rule**: ALWAYS use `animate-spin-reverse origin-center` for `RotateCcw` and reverse-curving icons.
  - Defined in `index.css`:
    ```css
    @keyframes spin-reverse {
      to { transform: rotate(-360deg); }
    }
    .animate-spin-reverse {
      animation: spin-reverse 1.2s linear infinite;
      transform-origin: center;
      display: inline-block;
      will-change: transform;
    }
    ```
- **Stationary Clock Icons (`Clock`)**:
  - Timer badges (e.g. `{timeLeft}s`) must have **STATIC** `<Clock>` icons.
  - **NEVER** apply `animate-spin` to `<Clock>`! Clock faces spinning like propellers look broken.

---

## 5. Tailwind CSS v4 Syntax Rules (STRICT)

1. **Postfix `!` Important Modifier**:
   - In Tailwind CSS v4, the `!` important modifier MUST be placed at the **END** of the utility:
     - ✅ `bg-rose-600!`, `text-white!`, `hover:bg-rose-500!`, `active:bg-rose-700!`
     - ❌ `!bg-rose-600`, `!text-white`, `hover:!bg-rose-500` (Causes build warning: *"The class `!text-white` can be written as `text-white!`"*).
2. **Standard Radius Scales**:
   - Use standard Tailwind v4 `rounded-4xl` instead of arbitrary `rounded-[32px]`.
   - Use `text-2xs` instead of `text-[10px]`.

---

## 6. Mobile A11y & iOS Consistency Checklist
- Text inputs must be minimum `text-[16px]` to prevent iOS Safari auto-zoom.
- Include `style={{ touchAction: 'pan-y' }}` on horizontally draggable views.
- **3D Icons (Strict Standalone & Sizing Rule)**:
  - ALL 3D icons (in modal headers, cards, dialogs, and bottom sheets) MUST be rendered **standalone WITHOUT background wrapper divs**, rounded gradient cards (e.g., `w-16 h-16 rounded-2xl bg-emerald-50`, `border shadow-inner`), frosted glass boxes (`w-12 h-12 bg-white/90`), or circular badges.
  - 3D icons are rich, glossy clay assets that need room to breathe. Enclosing them in geometric boxes flattens their depth and ruins their organic silhouette.
  - Always float the 3D icon directly on the modal/card surface with a drop shadow (`drop-shadow-md` or `drop-shadow-[0_10px_20px_rgba(34,168,96,0.25)]`).
  - **Sizing standards**:
    - Modal / Sheet Hero Headers: `size={72}` to `size={88}`.
    - Card / Tip / Feature Accents: `size={48}` to `size={56}`.
    - Action Buttons & Chips: `size={22}` to `size={26}`.
    - Quick Action Bars & Toolbars: `size={28}` to `size={38}`.
