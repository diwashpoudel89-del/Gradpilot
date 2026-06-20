import { GraduationCap, MapPin } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/auth-server";
import { MentorRequestButton } from "@/components/mentor-request-button";

export const dynamic = "force-dynamic";

type Mentor = {
  id: string;
  name: string;
  country: string | null;
  university: string | null;
  current_position: string | null;
  current_company: string | null;
  industry: string | null;
  visa_journey: string | null;
  bio: string | null;
  is_available: boolean | null;
};

export default async function MentorsPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("mentors")
    .select(
      "id, name, country, university, current_position, current_company, industry, visa_journey, bio, is_available"
    )
    .order("is_available", { ascending: false });

  const mentors = (data as Mentor[]) ?? [];

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Mentors</h1>
      <p className="mt-2 text-muted-foreground">
        Connect with international alumni who navigated the UK job market and landed the role.
      </p>

      {mentors.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">Mentors are loading — check back shortly.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((m) => (
            <div key={m.id} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h2 className="font-display text-lg font-semibold">{m.name}</h2>
              {(m.current_position || m.current_company) && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {[m.current_position, m.current_company].filter(Boolean).join(" · ")}
                </p>
              )}
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {m.country && (
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" /> {m.country}
                  </span>
                )}
                {m.university && (
                  <span className="flex items-center gap-1">
                    <GraduationCap className="size-3.5" /> {m.university}
                  </span>
                )}
              </div>
              {m.bio && <p className="mt-3 line-clamp-4 flex-1 text-sm text-muted-foreground">{m.bio}</p>}
              {m.industry && (
                <span className="mt-3 self-start rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-primary">
                  {m.industry}
                </span>
              )}
              <div className="mt-4">
                <MentorRequestButton mentorId={m.id} name={m.name.split(" ")[0]} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
