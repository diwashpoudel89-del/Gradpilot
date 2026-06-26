import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="GradPilot AI — home" className={`shrink-0 ${className}`}>
      <span className="inline-flex items-center gap-2.5">
        <Image
          src="/logo.jpg"
          alt=""
          width={36}
          height={36}
          className="size-9 rounded-xl object-cover"
          priority
        />
        <span className="font-display text-lg font-bold tracking-tight text-slate-900">
          GradPilot<span className="text-brand-500"> AI</span>
        </span>
      </span>
    </Link>
  );
}
