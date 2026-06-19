import Link from "next/link";
import { Logo } from "@/components/brand";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="text-center">
        <div className="flex justify-center"><Logo /></div>
        <p className="mt-10 font-display text-7xl font-extrabold tracking-tight text-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold">Page not found</h1>
        <p className="mx-auto mt-2 max-w-sm text-slate-600">That route drifted off course. Let&apos;s get you back on track.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary h-12 px-7">Back home</Link>
          <Link href="/jobs" className="btn-outline h-12 px-7">Browse jobs</Link>
        </div>
      </div>
    </main>
  );
}
