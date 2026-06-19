import Link from "next/link";
import { Logo } from "@/components/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-x grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-slate-600">
            The career co-pilot for international students in the UK.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/jobs" className="hover:text-slate-900">Jobs board</Link></li>
            <li><Link href="/employer-insights" className="hover:text-slate-900">Employer insights</Link></li>
            <li><Link href="/mentors" className="hover:text-slate-900">Mentors</Link></li>
            <li><Link href="/pricing" className="hover:text-slate-900">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/blog" className="hover:text-slate-900">Blog</Link></li>
            <li><Link href="/faq" className="hover:text-slate-900">FAQ</Link></li>
            <li><Link href="/about" className="hover:text-slate-900">About</Link></li>
            <li><Link href="/waitlist" className="hover:text-slate-900">Join waitlist</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Get started</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/signup" className="hover:text-slate-900">Create account</Link></li>
            <li><Link href="/login" className="hover:text-slate-900">Sign in</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 GradPilot AI Ltd. All rights reserved.</p>
          <p>Built by international students, for international students.</p>
        </div>
      </div>
    </footer>
  );
}
