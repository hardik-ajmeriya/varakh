export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      {/* diamond = a piece of kaju katli */}
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7">
        <path d="M16 2 30 16 16 30 2 16Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M16 8 24 16 16 24 8 16Z" fill="currentColor" opacity=".85" />
      </svg>
      <span className="font-display text-2xl tracking-[0.12em]">VARAKH</span>
    </span>
  );
}
