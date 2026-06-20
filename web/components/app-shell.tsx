import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  ClipboardList,
  FileText,
  MessageSquareText,
  Users,
  Sparkles,
  UserCog,
  ShieldCheck,
  Map as MapIcon,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/logo";

const APP_NAV = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/app/saved", label: "Saved", icon: Bookmark },
  { href: "/app/applications", label: "Applications", icon: ClipboardList },
  { href: "/app/cv", label: "CV Coach", icon: FileText },
  { href: "/app/interview", label: "Interview", icon: MessageSquareText },
  { href: "/app/gradshield", label: "GradShield", icon: ShieldCheck },
  { href: "/app/gradpath", label: "GradPath", icon: MapIcon },
  { href: "/app/mentors", label: "Mentors", icon: Users },
  { href: "/adviser", label: "Adviser", icon: Sparkles },
  { href: "/app/profile", label: "Profile", icon: UserCog },
];

export function AppShell({ email, children }: { email?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Logo />
          <div className="flex items-center gap-3">
            {email && (
              <span className="hidden max-w-[180px] truncate text-sm text-muted-foreground sm:inline">
                {email}
              </span>
            )}
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        </div>
        <nav className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-3 pb-2 sm:px-6 lg:px-8">
          {APP_NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <l.icon className="size-4" />
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
