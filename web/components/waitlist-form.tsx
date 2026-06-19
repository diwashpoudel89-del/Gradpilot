"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { Loader2 } from "lucide-react";
import { supabase, supabaseEnabled } from "@/lib/supabase";
import { btnPrimary, cn, sizeLg } from "@/lib/ui";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter your name and a valid email.");
      return;
    }
    setStatus("loading");

    try {
      if (supabaseEnabled && supabase) {
        const { error } = await supabase
          .from("waitlist_submissions")
          .insert({ full_name: name.trim(), email: email.trim().toLowerCase() });
        if (error) throw error;
      } else {
        // No Supabase env configured yet — succeed gracefully in dev.
        await new Promise((r) => setTimeout(r, 500));
      }
      track("waitlist_signup", { source: "waitlist_page" });
      setStatus("success");
      setMessage("You're on the list! We'll email you with early access.");
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again, or email hello@gradpilotai.com.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card/70 p-6 text-center">
        <p className="font-display text-lg font-semibold">Thank you 🎉</p>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="text"
        required
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-12 w-full rounded-full border border-border bg-card px-5 text-[0.95rem] outline-none focus:border-primary focus:ring-2 focus:ring-[var(--primary)]/30"
      />
      <input
        type="email"
        required
        placeholder="you@university.ac.uk"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 w-full rounded-full border border-border bg-card px-5 text-[0.95rem] outline-none focus:border-primary focus:ring-2 focus:ring-[var(--primary)]/30"
      />
      <button type="submit" disabled={status === "loading"} className={cn(btnPrimary, sizeLg, "w-full")}>
        {status === "loading" && <Loader2 className="size-4 animate-spin" />}
        Join the waitlist
      </button>
      {status === "error" && <p className="text-sm text-red-600">{message}</p>}
      <p className="text-center text-xs text-muted-foreground">
        Free to join · Early members get 3 months of Pro free at launch.
      </p>
    </form>
  );
}
