export default function Hero() {
  return (
    <header className="relative min-h-screen flex items-center overflow-hidden">
      {/* floating glass orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[rgba(123,97,255,0.14)] backdrop-blur-3xl rounded-full -rotate-12"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-[rgba(255,143,203,0.16)] backdrop-blur-3xl rounded-full rotate-12"></div>

      <div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 glass px-8 py-3 rounded-3xl text-sm">
            <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full animate-pulse"></div>
            NEW DROP — INSTANT DIGITAL DELIVERY
          </div>
          <h1 className="text-7xl md:text-8xl font-bold leading-none tracking-tighter logo-font text-[var(--color-text)]">
            Premium Tech.<br />
            <span className="text-[var(--color-primary)]">Glass-smooth.</span>
          </h1>
          <p className="text-2xl text-[var(--color-muted)]">Laptops, phones &amp; digital gear delivered instantly.</p>
          <button className="brand-gradient text-white hover:opacity-90 px-12 py-6 rounded-3xl text-xl font-semibold flex items-center gap-4 transition-opacity">
            SHOP NOW
          </button>
        </div>

        <div className="relative">
          <div className="glass rounded-3xl p-4 shadow-2xl">
            <img src="https://picsum.photos/id/1015/800/600" className="rounded-3xl" alt="MacBook" />
          </div>
        </div>
      </div>
    </header>
  )
}