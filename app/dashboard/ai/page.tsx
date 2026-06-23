import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { aiConfigured } from "@/lib/ai";
import { AiTool } from "@/components/ai-tool";
import { reviewCv, askAdviser, generateInterviewQuestions } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "AI tools" };

export default async function AiToolsPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">AI tools</h1>
        <p className="mt-1 text-slate-600">
          Your CV coach, career adviser and interview prep — tuned for international students in the UK.
        </p>
      </div>

      {!aiConfigured && (
        <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900">
          ✨ AI tools are coming soon. The interface is ready — they&apos;ll switch on automatically once the
          team enables them. You can still explore what each tool does below.
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AiTool
          title="📄 CV coach"
          description="Paste your CV and get a UK/ATS-focused score with concrete improvements."
          submitLabel="Review my CV"
          disabled={!aiConfigured}
          fields={[
            { name: "targetRole", label: "Target role (optional)", placeholder: "e.g. Software Engineer" },
            { name: "cv", label: "Your CV", type: "textarea", placeholder: "Paste your CV here…", required: true },
          ]}
          action={async (v) => {
            "use server";
            return reviewCv({ cv: v.cv ?? "", targetRole: v.targetRole });
          }}
        />

        <AiTool
          title="💬 Career adviser"
          description="Plain-English answers on visas, applications and switching to Skilled Worker."
          submitLabel="Ask"
          disabled={!aiConfigured}
          fields={[
            {
              name: "question",
              label: "Your question",
              type: "textarea",
              placeholder: "e.g. How long does the Graduate Route give me to find a sponsor?",
              required: true,
            },
          ]}
          action={async (v) => {
            "use server";
            return askAdviser({ question: v.question ?? "" });
          }}
        />

        <AiTool
          title="🎤 Interview prep"
          description="Get realistic, tailored practice questions with tips on strong answers."
          submitLabel="Generate questions"
          disabled={!aiConfigured}
          fields={[
            { name: "role", label: "Target role", placeholder: "e.g. Data Analyst", required: true },
            { name: "company", label: "Company (optional)", placeholder: "e.g. Deloitte" },
          ]}
          action={async (v) => {
            "use server";
            return generateInterviewQuestions({ role: v.role ?? "", company: v.company });
          }}
        />
      </div>
    </>
  );
}
