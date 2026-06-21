export type Job = {
  id: string;
  title: string;
  company: string;
  location: string | null;
  salary: string | null;
  salary_min: number | null;
  salary_max: number | null;
  description: string | null;
  requirements: string | null;
  industry: string | null;
  sponsors_graduate_route: boolean | null;
  sponsors_skilled_worker: boolean | null;
  visa_info: string | null;
  application_url: string | null;
  deadline: string | null;
  is_active: boolean | null;
  is_featured: boolean | null;
  job_type: string | null;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  category: string | null;
  author: string | null;
  meta_description: string | null;
  reading_time_minutes: number | null;
  tags: string[] | null;
  is_published: boolean | null;
  published_at: string | null;
};

export type Mentor = {
  id: string;
  name: string;
  country: string | null;
  university: string | null;
  current_position: string | null;
  current_company: string | null;
  industry: string | null;
  visa_journey: string | null;
  bio: string | null;
  linkedin_url: string | null;
  photo_url: string | null;
  degree_level: string | null;
  is_available: boolean | null;
};

export type EmployerInsight = {
  id: string;
  company: string;
  industry: string | null;
  sponsor_licence_status: string | null;
  sponsors_graduate_route: boolean | null;
  visa_process_duration: string | null;
  international_hires_percent: number | null;
  average_salary: string | null;
  glassdoor_rating: number | null;
  application_difficulty: string | null;
  insider_tips: string | null;
  hiring_timeline: string | null;
  graduate_programme_url: string | null;
  is_verified: boolean | null;
};

export type Testimonial = {
  id: string;
  name: string;
  content: string;
  course: string | null;
  university: string | null;
  outcome: string | null;
  rating: number | null;
  avatar_url: string | null;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
};

export type PricingPlan = {
  id: string;
  plan_name: string;
  monthly_price: number | null;
  annual_price: number | null;
  features: string[] | null;
  is_featured: boolean | null;
  badge_text: string | null;
  cta_text: string | null;
  tagline: string | null;
};

export const APPLICATION_STATUSES = [
  "saved",
  "applied",
  "interview_scheduled",
  "offer_received",
  "rejected",
  "withdrawn",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  interview_scheduled: "Interview",
  offer_received: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

export type SavedJob = {
  id: string;
  user_id: string;
  job_id: string | null;
  job_title: string | null;
  company: string | null;
  notes: string | null;
  saved_at: string | null;
};

export type Application = {
  id: string;
  user_id: string;
  job_id: string | null;
  job_title: string;
  company: string;
  status: ApplicationStatus | null;
  applied_at: string | null;
  interview_date: string | null;
  notes: string | null;
  next_action: string | null;
  next_action_due: string | null;
  sponsorship_status: string | null;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  university: string | null;
  degree_level: string | null;
  degree_subject: string | null;
  country_of_origin: string | null;
  visa_type: string | null;
  visa_expiry_date: string | null;
  graduation_date: string | null;
  target_industry: string | null;
  target_roles: string[] | null;
  linkedin_url: string | null;
  plan: string;
  onboarding_completed: boolean;
};
