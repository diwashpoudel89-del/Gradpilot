import { createSupabaseServerClient } from "@/lib/auth-server";
import { InterviewPrep, type Question } from "@/components/interview-prep";

export const dynamic = "force-dynamic";

export default async function InterviewPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("interview_questions")
    .select("id, question, category, difficulty, tips_for_international")
    .limit(40);

  // Light shuffle so practice varies between visits.
  const questions = ((data as Question[]) ?? []).sort(() => Math.random() - 0.5);

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Interview prep</h1>
      <p className="mt-2 text-muted-foreground">
        Practise real UK graduate interview questions and get scored AI feedback — behavioural,
        technical, and visa-related. Powered by Claude Opus 4.8.
      </p>
      <div className="mt-8">
        <InterviewPrep questions={questions} />
      </div>
    </div>
  );
}
