export default function Logo({ className = '' }: { className?: string }) {
  return (
    <a
      href="#home"
      aria-label="PAYLUME home"
      className={`group flex shrink-0 items-center gap-3 no-underline ${className}`}
    >
      <span className="font-logo text-[1.28rem] leading-none tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-mint">
        PAYLUME
      </span>
      <span className="hidden h-5 w-px bg-mint/30 sm:block" aria-hidden="true" />
      <span className="hidden font-mono text-[0.66rem] tracking-[0.16em] text-white/50 uppercase sm:block">
        Business Payments
      </span>
    </a>
  )
}
