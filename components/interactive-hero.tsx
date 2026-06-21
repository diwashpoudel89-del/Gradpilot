"use client";

import Link from "next/link";
import { useRef } from "react";

function Bar({ label, value, delay }: { label: string; value: number; delay: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] text-white/60">
        <span>{label}</span>
        <span className="font-semibold text-white/90">{value}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="bar-fill h-full rounded-full bg-gradient-to-r from-accent to-brand-300"
          style={{ width: `${value}%`, animationDelay: delay }}
        />
      </div>
    </div>
  );
}

export function InteractiveHero({ jobCount }: { jobCount: number }) {
  const tiltRef = useRef<HTMLDivElement>(null);

  function reduced() {
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = tiltRef.current;
    if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${px * 16}deg`);
    el.style.setProperty("--rx", `${-py * 16}deg`);
  }
  function onLeave() {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white">
      {/* Aurora background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora left-[-10%] top-[-20%] h-[420px] w-[420px] bg-brand-500" />
        <div className="aurora right-[-8%] top-[-10%] h-[360px] w-[360px] bg-accent" style={{ animationDelay: "-6s" }} />
        <div className="aurora bottom-[-30%] left-[30%] h-[440px] w-[440px] bg-brand-600" style={{ animationDelay: "-3s" }} />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
          }}
        />
      </div>

      <div className="container-x relative grid gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:items-center">
        {/* Copy */}
        <div>
          <span className="rise rise-1 badge bg-white/15 text-white">
            The AI Operating System for International Students
          </span>
          <h1 className="rise rise-2 mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
            Land the right UK job —{" "}
            <span className="bg-gradient-to-r from-accent to-brand-200 bg-clip-text text-transparent">
              before your visa clock runs out.
            </span>
          </h1>
          <p className="rise rise-3 mt-5 max-w-xl text-lg text-white/80">
            Visa-aware job matching, AI CV coaching, interview prep and Graduate Route guidance —
            built for international students, all in one place.
          </p>
          <div className="rise rise-4 mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link href="/signup" className="btn-primary h-12 px-7 text-base">Get started free</Link>
            <Link
              href="/jobs"
              className="btn h-12 border border-white/30 bg-white/10 px-7 text-base text-white backdrop-blur hover:bg-white/20"
            >
              Browse {jobCount > 0 ? `${jobCount} ` : ""}jobs
            </Link>
          </div>
          <p className="rise rise-4 mt-4 text-sm text-white/60">
            No credit card required · 3 months of Pro free for early members
          </p>
        </div>

        {/* 3D interactive dashboard */}
        <div className="scene rise rise-3 flex justify-center lg:justify-end">
          <div
            ref={tiltRef}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            className="tilt relative w-full max-w-md"
          >
            {/* Main GradScore card */}
            <div
              className="layer rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
              style={{ "--z": "40px" } as React.CSSProperties}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-white/60">Your GradScore™</p>
                  <p className="font-display text-5xl font-extrabold text-white">78</p>
                </div>
                <span className="badge bg-emerald-400/20 text-emerald-200">On track</span>
              </div>
              <div className="mt-5 space-y-3">
                <Bar label="Employability" value={82} delay="0.4s" />
                <Bar label="Sponsorship readiness" value={71} delay="0.55s" />
                <Bar label="Career readiness" value={80} delay="0.7s" />
              </div>
              <div className="mt-5 rounded-2xl bg-white/5 p-3 text-xs text-white/70">
                <span className="font-semibold text-white">GradPath™ next step:</span> apply to 3
                sponsoring employers and practise 2 interview questions this week.
              </div>
            </div>

            {/* Floating chip: job match (pops forward) */}
            <div
              className="floaty layer absolute -left-6 top-16 w-48 rounded-2xl border border-white/15 bg-brand-700/80 p-3 shadow-xl backdrop-blur-xl"
              style={{ "--z": "90px" } as React.CSSProperties}
            >
              <p className="text-[10px] uppercase tracking-wide text-white/50">Top match · Sponsors</p>
              <p className="mt-0.5 text-sm font-semibold text-white">Graduate Software Engineer</p>
              <p className="text-xs text-white/60">London · £45,000</p>
            </div>

            {/* Floating chip: CV score */}
            <div
              className="floaty-slow layer absolute -right-5 bottom-10 w-36 rounded-2xl border border-white/15 bg-white/10 p-3 text-center shadow-xl backdrop-blur-xl"
              style={{ "--z": "120px" } as React.CSSProperties}
            >
              <p className="text-[10px] uppercase tracking-wide text-white/50">CV · ATS</p>
              <p className="font-display text-3xl font-extrabold text-accent">A−</p>
              <p className="text-[11px] text-white/60">2 fixes suggested</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
