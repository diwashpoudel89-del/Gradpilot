import Link from "next/link";
import { Navigation } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" aria-label="GradPilot AI — home" className="shrink-0">
      <span className="inline-flex items-center gap-2.5">
        <span
          className="relative inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-soft"
          aria-hidden="true"
        >
          <Navigation className="size-[18px] -rotate-12 fill-white/90" strokeWidth={1.5} />
        </span>
        <span className="font-display text-lg font-bold tracking-tight">
          GradPilot<span className="text-primary"> AI</span>
        </span>
      </span>
    </Link>
  );
}
