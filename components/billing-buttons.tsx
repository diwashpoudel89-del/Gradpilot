"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { btnOutline, btnPrimary, cn, sizeMd } from "@/lib/ui";

async function post(url: string, body?: object) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res;
}

export function UpgradeButton({ plan, label }: { plan: "pro" | "premium"; label: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function go() {
    setLoading(true);
    setError("");
    try {
      const res = await post("/api/stripe/checkout", { plan });
      const data = await res.json();
      if (res.status === 401) {
        window.location.href = "/signup?next=/app/settings";
        return;
      }
      if (!res.ok || !data.url) {
        setError(data.error || "Could not start checkout.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={go} disabled={loading} className={cn(btnPrimary, sizeMd)}>
        {loading && <Loader2 className="size-4 animate-spin" />}
        {label}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function ManageBillingButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function go() {
    setLoading(true);
    setError("");
    try {
      const res = await post("/api/stripe/portal");
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "Could not open billing portal.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={go} disabled={loading} className={cn(btnOutline, sizeMd)}>
        {loading && <Loader2 className="size-4 animate-spin" />}
        Manage billing
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
