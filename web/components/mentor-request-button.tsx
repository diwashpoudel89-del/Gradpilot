"use client";

import { useState } from "react";
import { Check, Loader2, UserPlus } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/auth-browser";
import { btnPrimary, cn, sizeMd } from "@/lib/ui";

export function MentorRequestButton({ mentorId, name }: { mentorId: string; name: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  async function request() {
    if (state !== "idle") return;
    setState("sending");
    const supabase = createSupabaseBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/signup?next=/app/mentors";
      return;
    }
    const { error } = await supabase.from("mentor_requests").insert({
      user_id: user.id,
      mentor_id: mentorId,
      message: `Hi ${name}, I'd love your guidance on navigating the UK job market as an international student.`,
      status: "pending",
    });
    setState(error ? "idle" : "sent");
  }

  return (
    <button type="button" onClick={request} disabled={state !== "idle"} className={cn(btnPrimary, sizeMd, "w-full")}>
      {state === "sending" ? (
        <Loader2 className="size-4 animate-spin" />
      ) : state === "sent" ? (
        <Check className="size-4" />
      ) : (
        <UserPlus className="size-4" />
      )}
      {state === "sent" ? "Request sent" : "Request mentorship"}
    </button>
  );
}
