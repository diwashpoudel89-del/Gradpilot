// Shared class strings so buttons/links look consistent across the site.
export const btnBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export const btnPrimary = `${btnBase} bg-primary text-primary-foreground shadow-soft hover:bg-brand-600 hover:shadow-lift active:translate-y-px`;
export const btnOutline = `${btnBase} border border-border bg-card/70 text-foreground backdrop-blur hover:bg-secondary`;

export const sizeLg = "h-12 px-7 text-[0.95rem]";
export const sizeMd = "h-9 px-4 text-sm";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
