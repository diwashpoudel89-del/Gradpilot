import type { Metadata } from "next";
import { getEmployerInsights } from "@/lib/queries";

export const revalidate = 3600;
export const metadata: Metadata = { title: "Employer insights", description: "Which UK employers sponsor international graduates — with timelines and insider tips." };

export default async function EmployerInsightsPage() {
  const employers = await getEmployerInsights();
  return (
    <div className="container-x py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight">Employer insights</h1>
        <p className="mt-2 text-slate-600">Know which employers truly sponsor international graduates — before you apply.</p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {employers.map((e) => (
          <div key={e.id} className="card p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{e.company}</h2>
                {e.industry && <p className="text-sm text-slate-500">{e.industry}</p>}
              </div>
              {e.sponsors_graduate_route && <span className="badge bg-emerald-100 text-emerald-700">Sponsors</span>}
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {e.average_salary && (<div><dt className="text-slate-500">Avg salary</dt><dd className="font-medium text-slate-900">{e.average_salary}</dd></div>)}
              {e.glassdoor_rating != null && (<div><dt className="text-slate-500">Glassdoor</dt><dd className="font-medium text-slate-900">{e.glassdoor_rating} ★</dd></div>)}
              {e.application_difficulty && (<div><dt className="text-slate-500">Difficulty</dt><dd className="font-medium capitalize text-slate-900">{e.application_difficulty.replace(/_/g, " ")}</dd></div>)}
              {e.visa_process_duration && (<div><dt className="text-slate-500">Visa process</dt><dd className="font-medium text-slate-900">{e.visa_process_duration}</dd></div>)}
            </dl>
            {e.insider_tips && <p className="mt-4 text-sm text-slate-600"><span className="font-medium text-slate-800">Insider tip: </span>{e.insider_tips}</p>}
          </div>
        ))}
        {employers.length === 0 && <p className="text-slate-600">Employer insights coming soon.</p>}
      </div>
    </div>
  );
}
