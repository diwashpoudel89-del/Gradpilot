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
