// GradScore™ — deterministic readiness scoring from profile + activity.
// Three sub-scores feed one overall number, plus targeted next steps.

export type GradScoreInput = {
  profile: Record<string, unknown> | null;
  bestCvScore: number | null;
  applicationsCount: number;
  savedCount: number;
  interviewCount: number;
  interviewAvg: number | null;
};

export type GradScore = {
  overall: number;
  employability: number;
  sponsorship: number;
  career: number;
  completeness: number;
  tips: string[];
};

const EXPERIENCE_SCORE: Record<string, number> = {
  "No UK experience": 40,
  "Internship / placement": 65,
  "1-2 years": 85,
  "3+ years": 100,
};

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function computeGradScore(input: GradScoreInput): GradScore {
  const p = input.profile ?? {};
  const str = (k: string) => (typeof p[k] === "string" ? (p[k] as string).trim() : "");
  const hasRoles = Array.isArray(p.target_roles) && (p.target_roles as unknown[]).length > 0;

  const profileFields = [
    str("full_name"),
    str("university"),
    str("degree_level"),
    str("degree_subject"),
    str("country_of_origin"),
    str("visa_type"),
    str("visa_expiry_date"),
    str("target_industry"),
    hasRoles ? "x" : "",
    str("experience_level"),
    str("linkedin_url"),
  ];
  const filled = profileFields.filter(Boolean).length;
  const completeness = clamp((filled / profileFields.length) * 100);

  const expScore = EXPERIENCE_SCORE[str("experience_level")] ?? 30;
  const cv = input.bestCvScore ?? 0;

  const employability = clamp(0.35 * completeness + 0.45 * cv + 0.2 * expScore);

  const visaScore = (str("visa_type") ? 50 : 0) + (str("visa_expiry_date") ? 50 : 0);
  const targetScore = (str("target_industry") ? 50 : 0) + (hasRoles ? 50 : 0);
  const appProgress = Math.min(input.applicationsCount / 5, 1) * 100;
  const sponsorship = clamp(0.4 * visaScore + 0.3 * appProgress + 0.3 * targetScore);

  const interviewSignal =
    input.interviewAvg != null ? input.interviewAvg : input.interviewCount > 0 ? 60 : 0;
  const engagement = Math.min((input.applicationsCount + input.savedCount) / 6, 1) * 100;
  const career = clamp(0.4 * interviewSignal + 0.3 * engagement + 0.3 * targetScore);

  const overall = clamp((employability + sponsorship + career) / 3);

  const tips: string[] = [];
  if (completeness < 80) tips.push("Complete your profile to sharpen every score and your job matches.");
  if (input.bestCvScore == null) tips.push("Run the AI CV Coach to get your ATS score and a fix-list.");
  if (!str("visa_expiry_date")) tips.push("Add your visa expiry date to track your Graduate Route window.");
  if (input.interviewCount === 0) tips.push("Practise one interview question to start building your score.");
  if (input.applicationsCount === 0) tips.push("Browse sponsoring jobs and track your first application.");

  return { overall, employability, sponsorship, career, completeness, tips: tips.slice(0, 4) };
}
