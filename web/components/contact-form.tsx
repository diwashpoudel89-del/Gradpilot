"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { btnPrimary, cn, sizeLg } from "@/lib/ui";

const field =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-[var(--primary)]/30";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`GradPilot enquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:hello@gradpilotai.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className={field} type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <textarea
        className={cn(field, "min-h-[140px]")}
        placeholder="How can we help?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit" className={cn(btnPrimary, sizeLg, "w-full")}>
        <Send className="size-4" /> Send message
      </button>
    </form>
  );
}
