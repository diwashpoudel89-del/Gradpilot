import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getApplications } from "@/lib/queries";
import { APPLICATION_STATUSES, STATUS_LABELS, type ApplicationStatus } from "@/lib/types";
import { AddApplicationForm } from "@/components/add-application-form";
import { ApplicationStatusSelect } from "@/components/application-status-select";
import { NotesEditor } from "@/components/notes-editor";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Applications" };

export default async function ApplicationsPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  const applications = await getApplications(data.user.id);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Application tracker</h1>
          <p className="mt-1 text-slate-600">Keep every application, deadline and status in one place.</p>
        </div>
        <Link href="/jobs" className="btn-outline h-10 px-5 text-sm">Browse jobs</Link>
      </div>

      <div className="mt-6 card p-5">
        <h2 className="text-sm font-semibold text-slate-900">Add an application</h2>
        <div className="mt-3">
          <AddApplicationForm />
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="mt-6 card p-10 text-center">
          <p className="text-slate-600">No applications yet. Add your first above, or save jobs from the board.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {APPLICATION_STATUSES.map((status) => {
            const group = applications.filter((a) => (a.status ?? "saved") === status);
            if (group.length === 0) return null;
            return (
              <section key={status}>
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {STATUS_LABELS[status]} · {group.length}
                </h2>
                <div className="card divide-y divide-slate-100">
                  {group.map((a) => (
                    <div key={a.id} className="p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-medium text-slate-900">
                            {a.job_id ? (
                              <Link href={`/jobs/${a.job_id}`} className="hover:text-brand-600">{a.job_title}</Link>
                            ) : (
                              a.job_title
                            )}
                          </div>
                          <div className="text-sm text-slate-500">
                            {a.company}
                            {a.applied_at ? ` · applied ${a.applied_at}` : ""}
                          </div>
                        </div>
                        <ApplicationStatusSelect id={a.id} status={(a.status ?? "saved") as ApplicationStatus} />
                      </div>
                      <div className="mt-2">
                        <NotesEditor kind="application" id={a.id} initialNotes={a.notes} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}
