/**
 * Facts the legal pages rely on. Anything set to `null` has NOT been confirmed
 * by the business owner and renders as a visible "to be confirmed" marker —
 * never fill these with guesses.
 */
export const LEGAL = {
  /** Shown in the footer copyright and company records. */
  companyName: "GradPilot AI Ltd",
  /** Companies House registration number. */
  companyNumber: null as string | null,
  /** Registered office address. */
  registeredAddress: null as string | null,
  /**
   * Email that customers can use for privacy, billing and refund requests.
   * Note: gradpilotai.com currently has no MX (inbound mail) records, so no
   * @gradpilotai.com address can receive email yet.
   */
  contactEmail: null as string | null,
  /** ICO data protection fee registration number. */
  icoRegistration: null as string | null,
  /** Date shown as "Last updated" on every legal page. */
  lastUpdated: "4 November 2026",
  /** While true, every legal page shows a "draft for review" banner. */
  draft: true,
} as const;

export const LEGAL_PAGES = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/refunds", label: "Refunds & Cancellation" },
  { href: "/ai-disclaimer", label: "AI Disclaimer" },
] as const;
