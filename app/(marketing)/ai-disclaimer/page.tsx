import type { Metadata } from "next";
import Link from "next/link";
import { ContactEmail, LegalPage, ToConfirm } from "@/components/legal";

export const metadata: Metadata = {
  title: "AI Disclaimer",
  description: "How GradPilot AI uses AI, what happens to what you enter, and the limits of AI-generated content.",
  alternates: { canonical: "/ai-disclaimer" },
};

export default function AiDisclaimerPage() {
  return (
    <LegalPage
      title="AI Disclaimer"
      current="/ai-disclaimer"
      summary="How AI features on GradPilot AI work, what happens to what you type or upload, and why AI output must always be checked."
    >
      <h2>1. Current status</h2>
      <p>
        <strong>AI features are not yet available on GradPilot AI.</strong> The live service does not
        currently send your information to any AI model. AI tools described on our pricing page — such
        as CV analysis and rewriting, cover letters, interview practice and an AI adviser — are in
        development <ToConfirm>launch timing and which plans include them</ToConfirm>. This page
        explains how they will work so you can decide whether to use them. We will update it, and our{" "}
        <Link href="/privacy">Privacy Policy</Link>, before they launch.
      </p>

      <h2>2. Which AI provider we will use</h2>
      <p>
        Our AI features will use large language models provided by <strong>Anthropic</strong> (the
        Claude models), accessed through Anthropic&apos;s commercial API. Anthropic will process the
        content you submit on our behalf in order to generate a response.
      </p>

      <h2>3. What happens to what you enter</h2>
      <ul>
        <li>
          When you use an AI feature, the content needed for that request — for example your CV text,
          a job description or your question, plus relevant details from your profile — is sent to
          Anthropic to produce the answer.
        </li>
        <li>
          We will store your requests and the AI&apos;s responses in your account (for example your
          CV versions or chat history) so you can come back to them. You can delete them by deleting
          your account.
        </li>
        <li>
          Under Anthropic&apos;s commercial terms, content sent through the API is not used to train
          its models by default.{" "}
          <ToConfirm>confirm against Anthropic&apos;s current commercial terms and data processing agreement, including how long Anthropic retains API inputs</ToConfirm>
        </li>
        <li>We do not sell your content or use it for advertising.</li>
      </ul>
      <p>
        <strong>Only include what&apos;s needed.</strong> Remove details you don&apos;t want processed —
        such as your home address, date of birth, passport or visa numbers, and health or other
        sensitive information — from your CV and messages before using AI tools.
      </p>

      <h2>4. Limits of AI output</h2>
      <ul>
        <li>
          AI can be <strong>wrong, out of date or incomplete</strong>, and can sound confident when it
          is mistaken. Always review and edit what it produces before you use it.
        </li>
        <li>
          AI output is <strong>not legal or immigration advice</strong>. For decisions about visas,
          check{" "}
          <a href="https://www.gov.uk/browse/visas-immigration" rel="noopener noreferrer" target="_blank">GOV.UK</a>{" "}
          and speak to a regulated immigration adviser or solicitor.
        </li>
        <li>
          AI cannot confirm whether an employer sponsors visas. Check the Home Office register of
          licensed sponsors and the employer directly.
        </li>
        <li>
          You are responsible for anything you send to employers. Make sure your CV and cover letters
          are accurate and truthful.
        </li>
        <li>
          No AI feature guarantees an interview, a job offer or a visa outcome.
        </li>
      </ul>

      <h2>5. No automated decisions about you</h2>
      <p>
        Our AI tools help you write and prepare. They do not make decisions about you that have legal
        or similarly significant effects, and they do not decide whether you can use GradPilot AI.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about how we use AI? Contact us at <ContactEmail />.
      </p>
    </LegalPage>
  );
}
