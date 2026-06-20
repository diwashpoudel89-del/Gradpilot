"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/auth-browser";
import { btnOutline, cn, sizeMd } from "@/lib/ui";

export function SaveJobButton({
  jobId,
  title,
  company,
}: {
  jobId: string;
  title: string;
  company: string;
}) {
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");

  async function save() {
    if (state !== "idle") return;
    setState("saving");
    const supabase = createSupabaseBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/signup?next=/jobs";
      return;
    }

    const { error } = await supabase.from("saved_jobs").insert({
      user_id: user.id,
      job_id: jobId,
      job_title: title,
      company,
    });
    setState(error ? "idle" : "saved");
  }

  return (
    <button type="button" onClick={save} disabled={state !== "idle"} className={cn(btnOutline, sizeMd)}>
      {state === "saving" ? (
        <Loader2 className="size-4 animate-spin" />
      ) : state === "saved" ? (
        <BookmarkCheck className="size-4" />
      ) : (
        <Bookmark className="size-4" />
      )}
      {state === "saved" ? "Saved" : "Save"}
    </button>
  );
}
