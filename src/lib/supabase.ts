import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  role: 'student' | 'alumni' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar_url?: string;
  batch_year?: string;
  program?: string;
  current_company?: string;
  current_position?: string;
  location?: string;
  bio?: string;
  skills: string[];
  linkedin_url?: string;
  website_url?: string;
  is_verified: boolean;
  is_mentor_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location?: string;
  is_virtual: boolean;
  meeting_link?: string;
  max_attendees?: number;
  registration_fee?: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  registration_date: string;
  status: 'registered' | 'waitlist' | 'cancelled';
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  job_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary_min?: number;
  salary_max?: number;
  requirements: string[];
  posted_by: string;
  application_deadline?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  applicant_id: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  cover_letter?: string;
  resume_url?: string;
  applied_date: string;
}

export interface MentorshipRequest {
  id: string;
  student_id: string;
  mentor_id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  request_message: string;
  response_message?: string;
  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: string;
  donor_id: string;
  amount: number;
  campaign_name?: string;
  message?: string;
  is_anonymous: boolean;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}