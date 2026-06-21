import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { InterviewPrep, type Question } from "@/components/interview-prep";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Interview Prep" };

export default async function InterviewPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("interview_questions")
    .select("id, question, category, difficulty, tips_for_international")
    .limit(40);
  const questions = ((data as Question[]) ?? []).sort(() => Math.random() - 0.5);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold tracking-tight">Interview prep</h1>
      <p className="mt-1 text-slate-600">
        Practise real UK graduate interview questions and get scored AI feedback — powered by Claude Opus 4.8.
      </p>
      <div className="mt-8"><InterviewPrep questions={questions} /></div>
    </div>
  );
}
