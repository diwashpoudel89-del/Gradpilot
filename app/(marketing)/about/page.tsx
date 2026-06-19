import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About", description: "Why GradPilot AI exists." };

export default function AboutPage() {
  return (
    <div className="container-x py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight">We&apos;re not just building for international students. We are international students.</h1>
        <div className="mt-6 space-y-4 text-slate-700">
          <p>
            GradPilot AI was founded by an international student who faced every challenge this platform solves —
            confusing visa rules, rejected CVs, missed deadlines, and a job market that wasn&apos;t built for them.
          </p>
          <p>
            Our mission is simple: help every international graduate in the UK land the right job, faster — regardless
            of their background, university, or visa status.
          </p>
          <p>GradPilot AI exists because we needed it and it didn&apos;t exist. Now it does.</p>
        </div>
        <div className="mt-8">
          <Link href="/signup" className="btn-primary h-11 px-6 text-sm">Join GradPilot AI</Link>
        </div>
      </div>
    </div>
  );
}
