"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const fullName = String(form.get("fullName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const university = String(form.get("university") ?? "").trim();

    try {
      const supabase = createClient();
      const { error } = await supabase.from("waitlist_submissions").insert({
        full_name: fullName,
        email,
        university: university || null,
      });
      if (error) throw error;
      setStatus("done");
      setMessage("You're on the list! We'll be in touch soon. 🎉");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please check your details and try again.");
    }
  }

  if (status === "done") {
    return <div className="card p-6 text-center text-emerald-700">{message}</div>;
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6">
      <div>
        <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium">Full name</label>
        <input id="fullName" name="fullName" required className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200" placeholder="Jane Doe" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
        <input id="email" name="email" type="email" required className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200" placeholder="jane@university.ac.uk" />
      </div>
      <div>
        <label htmlFor="university" className="mb-1.5 block text-sm font-medium">University <span className="text-slate-400">(optional)</span></label>
        <input id="university" name="university" className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200" placeholder="University of Manchester" />
      </div>
      {status === "error" && <p className="text-sm text-red-600">{message}</p>}
      <button type="submit" disabled={status === "loading"} className="btn-primary h-12 w-full px-5 text-sm">
        {status === "loading" ? "Joining…" : "Join the waitlist"}
      </button>
    </form>
  );
}
