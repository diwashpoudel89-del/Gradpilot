import Link from "next/link";
import { Logo } from "@/components/brand";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-600 to-brand-900 p-12 text-white lg:flex">
        <Logo className="[&_span]:text-white" />
        <div>
          <h1 className="font-display text-3xl font-bold leading-tight">Your career co-pilot for the UK.</h1>
          <ul className="mt-8 space-y-3 text-white/90">
            <li>✓ Visa-aware jobs matched to your profile</li>
            <li>✓ AI CV coaching built for UK employers</li>
            <li>✓ Your data, protected under UK GDPR</li>
          </ul>
        </div>
        <p className="text-sm text-white/60">Built by international students, for international students.</p>
      </div>
      <div className="flex flex-col">
        <div className="p-6 lg:hidden">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        <p className="px-6 pb-6 text-center text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-800">← Back to gradpilotai.com</Link>
        </p>
      </div>
    </div>
  );
}
