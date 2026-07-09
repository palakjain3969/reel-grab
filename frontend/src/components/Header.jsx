export default function Header() {
  return (
    <header className="max-w-3xl mx-auto px-6 pt-10 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
        <span className="font-display font-semibold text-lg tracking-tight text-cream-100">
          ReelGrab
        </span>
      </div>
      <nav className="flex items-center gap-6 text-sm text-cream-500 font-medium">
        <a href="#how" className="hover:text-cream-100 transition-colors">How it works</a>
      </nav>
    </header>
  )
}