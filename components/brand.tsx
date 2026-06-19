import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="GradPilot AI — home" className={`shrink-0 ${className}`}>
      <span className="inline-flex items-center gap-2.5">
        <span
          className="relative inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-soft"
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="-rotate-12">
            <polygon points="3 11 22 2 13 21 11 13 3 11" className="fill-white/90" />
          </svg>
        </span>
        <span className="font-display text-lg font-bold tracking-tight text-slate-900">
          GradPilot<span className="text-brand-500"> AI</span>
        </span>
      </span>
    </Link>
  );
}
