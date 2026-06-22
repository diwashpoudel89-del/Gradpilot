import type { Metadata } from "next";
import { getMentors } from "@/lib/queries";

export const revalidate = 3600;
export const metadata: Metadata = { title: "Mentors", description: "Learn from international graduates who built UK careers." };

export default async function MentorsPage() {
  const mentors = await getMentors();
  return (
    <div className="container-x py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight">Mentors who made the journey</h1>
        <p className="mt-2 text-slate-600">Real international graduates now working at top UK employers — learn how they did it.</p>
      </header>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((m) => (
          <div key={m.id} className="card p-6">
            <div className="flex items-center gap-3">
              {m.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photo_url} alt="" className="size-12 rounded-full bg-slate-200" />
              ) : (
                <span className="grid size-12 place-items-center rounded-full bg-brand-100 text-base font-semibold text-brand-700">{m.name.charAt(0)}</span>
              )}
              <div>
                <div className="font-semibold text-slate-900">{m.name}</div>
                <div className="text-xs text-slate-500">{m.current_position}{m.current_company ? ` · ${m.current_company}` : ""}</div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {m.country && <span className="badge bg-slate-100 text-slate-600">{m.country}</span>}
              {m.industry && <span className="badge bg-brand-50 text-brand-700">{m.industry}</span>}
            </div>
            {m.bio && <p className="mt-3 text-sm text-slate-600">{m.bio}</p>}
            {m.is_available && <p className="mt-3 text-xs font-medium text-emerald-600">● Available to mentor</p>}
          </div>
        ))}
        {mentors.length === 0 && <p className="text-slate-600">Mentors coming soon.</p>}
      </div>
    </div>
  );
}
