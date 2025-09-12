-- Alumni Data Management Platform Database Schema
-- This file contains all the SQL commands to set up the database structure

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'alumni', 'admin');
CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract', 'internship');
CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'accepted', 'rejected');
CREATE TYPE mentorship_status AS ENUM ('pending', 'accepted', 'rejected', 'completed');
CREATE TYPE registration_status AS ENUM ('registered', 'waitlist', 'cancelled');
CREATE TYPE donation_status AS ENUM ('pending', 'completed', 'failed');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  batch_year VARCHAR(4),
  program VARCHAR(100),
  current_company VARCHAR(100),
  current_position VARCHAR(100),
  location VARCHAR(200),
  bio TEXT,
  skills TEXT[] DEFAULT '{}',
  linkedin_url TEXT,
  website_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_mentor_available BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location VARCHAR(200),
  is_virtual BOOLEAN DEFAULT FALSE,
  meeting_link TEXT,
  max_attendees INTEGER,
  registration_fee DECIMAL(10,2) DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event registrations table
CREATE TABLE event_registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status registration_status DEFAULT 'registered',
  UNIQUE(event_id, user_id)
);

-- Jobs table
CREATE TABLE jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  company VARCHAR(100) NOT NULL,
  location VARCHAR(200) NOT NULL,
  job_type job_type NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  requirements TEXT[] DEFAULT '{}',
  posted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  application_deadline TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job applications table
CREATE TABLE job_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  applicant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status application_status DEFAULT 'pending',
  cover_letter TEXT,
  resume_url TEXT,
  applied_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, applicant_id)
);

-- Mentorship requests table
CREATE TABLE mentorship_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mentor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status mentorship_status DEFAULT 'pending',
  request_message TEXT NOT NULL,
  response_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table
CREATE TABLE donations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  donor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  campaign_name VARCHAR(200),
  message TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  status donation_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_batch_year ON profiles(batch_year);
CREATE INDEX idx_profiles_program ON profiles(program);
CREATE INDEX idx_profiles_is_verified ON profiles(is_verified);
CREATE INDEX idx_profiles_is_mentor_available ON profiles(is_mentor_available);
CREATE INDEX idx_profiles_skills ON profiles USING GIN(skills);

CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_created_by ON events(created_by);

CREATE INDEX idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_user_id ON event_registrations(user_id);

CREATE INDEX idx_jobs_posted_by ON jobs(posted_by);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_jobs_created_at ON jobs(created_at);

CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_applicant_id ON job_applications(applicant_id);

CREATE INDEX idx_mentorship_student_id ON mentorship_requests(student_id);
CREATE INDEX idx_mentorship_mentor_id ON mentorship_requests(mentor_id);
CREATE INDEX idx_mentorship_status ON mentorship_requests(status);

CREATE INDEX idx_donations_donor_id ON donations(donor_id);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_created_at ON donations(created_at);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (is_verified = true);

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins can update any profile" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Events policies
CREATE POLICY "Everyone can view events" ON events FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create events" ON events
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Event creators can update their events" ON events
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Admins can manage all events" ON events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Event registrations policies
CREATE POLICY "Users can view own registrations" ON event_registrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events" ON event_registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own registrations" ON event_registrations
  FOR UPDATE USING (auth.uid() = user_id);

-- Jobs policies
CREATE POLICY "Everyone can view active jobs" ON jobs
  FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "Authenticated users can create jobs" ON jobs
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Job posters can update their jobs" ON jobs
  FOR UPDATE USING (auth.uid() = posted_by);

CREATE POLICY "Admins can manage all jobs" ON jobs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Job applications policies
CREATE POLICY "Applicants can view own applications" ON job_applications
  FOR SELECT USING (auth.uid() = applicant_id);

CREATE POLICY "Job posters can view applications for their jobs" ON job_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM jobs 
      WHERE jobs.id = job_applications.job_id 
      AND jobs.posted_by = auth.uid()
    )
  );

CREATE POLICY "Users can apply for jobs" ON job_applications
  FOR INSERT WITH CHECK (auth.uid() = applicant_id);

-- Mentorship policies
CREATE POLICY "Students can view own requests" ON mentorship_requests
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Mentors can view requests sent to them" ON mentorship_requests
  FOR SELECT USING (auth.uid() = mentor_id);

CREATE POLICY "Students can create mentorship requests" ON mentorship_requests
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Mentors can respond to their requests" ON mentorship_requests
  FOR UPDATE USING (auth.uid() = mentor_id);

-- Donations policies
CREATE POLICY "Users can view own donations" ON donations
  FOR SELECT USING (auth.uid() = donor_id);

CREATE POLICY "Admins can view all donations" ON donations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Users can create donations" ON donations
  FOR INSERT WITH CHECK (auth.uid() = donor_id);

-- Functions

-- Function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mentorship_requests_updated_at
  BEFORE UPDATE ON mentorship_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional - for development/testing)
-- This will be commented out in production
/*
-- Sample admin user (you'll need to create this in Supabase Auth first)
-- INSERT INTO profiles (user_id, first_name, last_name, is_verified) 
-- VALUES ('your-admin-user-id', 'Admin', 'User', true);

-- Sample events
INSERT INTO events (title, description, event_date, location, created_by) VALUES
('Alumni Networking Night', 'Join us for an evening of networking with fellow alumni in the tech industry.', '2024-03-15 18:00:00+00', 'San Francisco, CA', 'your-admin-user-id'),
('Career Development Workshop', 'Learn about the latest trends in your field and develop your professional skills.', '2024-03-20 14:00:00+00', 'Virtual', 'your-admin-user-id'),
('Annual Alumni Gala', 'Our biggest event of the year celebrating our alumni community.', '2024-04-10 19:00:00+00', 'New York, NY', 'your-admin-user-id');

-- Sample jobs
INSERT INTO jobs (title, description, company, location, job_type, posted_by) VALUES
('Senior Software Engineer', 'We are looking for an experienced software engineer to join our growing team.', 'Tech Corp', 'San Francisco, CA', 'full-time', 'your-admin-user-id'),
('Product Manager', 'Lead product development initiatives and work with cross-functional teams.', 'Innovation Inc', 'Remote', 'full-time', 'your-admin-user-id'),
('Data Science Intern', 'Gain hands-on experience in data analysis and machine learning.', 'Data Solutions', 'New York, NY', 'internship', 'your-admin-user-id');
*/