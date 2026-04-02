export default function Footer() {
  return (
    <footer className="glass border-t border-[rgba(123,97,255,0.16)] py-16">
      <div className="max-w-screen-2xl mx-auto px-8 text-center">
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="w-10 h-10 brand-gradient rounded-3xl flex items-center justify-center text-white text-4xl font-bold">B</div>
          <h1 className="logo-font text-4xl tracking-tighter text-[var(--color-text)]">BitBolt</h1>
        </div>
        <p className="text-[var(--color-muted)]">
          © 2026 BitBolt • Instant digital delivery • Glassmorphism UI
        </p>
        <p className="text-xs text-[var(--color-muted)] mt-8">
          Made with ❤️ in Phnom Penh • Telegram checkout enabled
        </p>
      </div>
    </footer>
  )
}