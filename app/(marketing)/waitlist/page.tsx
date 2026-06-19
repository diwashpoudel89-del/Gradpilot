import type { Metadata } from "next";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = { title: "Join the waitlist", description: "Get early access and 3 months of Pro free." };

export default function WaitlistPage() {
  return (
    <div className="container-x py-16">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight">Join the waitlist</h1>
        <p className="mt-2 text-slate-600">Get early access and 3 months of Pro completely free when we launch.</p>
      </div>
      <div className="mx-auto mt-8 max-w-lg">
        <WaitlistForm />
      </div>
    </div>
  );
}
