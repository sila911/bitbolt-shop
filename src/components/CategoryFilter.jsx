export default function CategoryFilter({ selected, onSelect }) {
  const cats = ['All', 'Laptop', 'Phone', 'Tablet', 'Audio']
  return (
    <div className="flex gap-3 flex-wrap px-8 py-6">
      {cats.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`glass px-6 md:px-8 py-3 rounded-3xl text-sm font-medium whitespace-nowrap transition-all ${selected === cat ? 'brand-gradient text-white shadow-inner' : 'hover:bg-white/75 text-[var(--color-muted)]'}`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}