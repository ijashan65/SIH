import { supabase, Profile, Event, Job, MentorshipRequest, Donation } from './supabase';

// Alumni Directory API
export const alumniApi = {
  // Get all alumni with filters
  getAlumni: async (filters?: {
    batch_year?: string;
    program?: string;
    location?: string;
    company?: string;
    skills?: string[];
    search?: string;
  }) => {
    let query = supabase
      .from('profiles')
      .select(`
        *,
        users!inner(role)
      `)
      .eq('users.role', 'alumni')
      .eq('is_verified', true);

    if (filters?.batch_year) {
      query = query.eq('batch_year', filters.batch_year);
    }

    if (filters?.program) {
      query = query.eq('program', filters.program);
    }

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters?.company) {
      query = query.ilike('current_company', `%${filters.company}%`);
    }

    if (filters?.search) {
      query = query.or(`
        first_name.ilike.%${filters.search}%,
        last_name.ilike.%${filters.search}%,
        current_company.ilike.%${filters.search}%,
        current_position.ilike.%${filters.search}%
      `);
    }

    return query.order('first_name', { ascending: true });
  },

  // Get single alumni profile
  getAlumniById: async (id: string) => {
    return supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
  },

  // Verify alumni (admin only)
  verifyAlumni: async (profileId: string) => {
    return supabase
      .from('profiles')
      .update({ is_verified: true })
      .eq('id', profileId);
  },
};

// Events API
export const eventsApi = {
  // Get all events
  getEvents: async (upcoming_only = false) => {
    let query = supabase
      .from('events')
      .select(`
        *,
        creator:profiles!events_created_by_fkey(first_name, last_name),
        registrations:event_registrations(count)
      `);

    if (upcoming_only) {
      query = query.gte('event_date', new Date().toISOString());
    }

    return query.order('event_date', { ascending: true });
  },

  // Create event
  createEvent: async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    return supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();
  },

  // Register for event
  registerForEvent: async (eventId: string, userId: string) => {
    return supabase
      .from('event_registrations')
      .insert([{
        event_id: eventId,
        user_id: userId,
        status: 'registered'
      }])
      .select()
      .single();
  },

  // Get user's event registrations
  getUserRegistrations: async (userId: string) => {
    return supabase
      .from('event_registrations')
      .select(`
        *,
        event:events(*)
      `)
      .eq('user_id', userId);
  },
};

// Jobs API
export const jobsApi = {
  // Get all active jobs
  getJobs: async (filters?: {
    job_type?: string;
    location?: string;
    search?: string;
  }) => {
    let query = supabase
      .from('jobs')
      .select(`
        *,
        poster:profiles!jobs_posted_by_fkey(first_name, last_name, current_company),
        applications:job_applications(count)
      `)
      .eq('is_active', true);

    if (filters?.job_type) {
      query = query.eq('job_type', filters.job_type);
    }

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters?.search) {
      query = query.or(`
        title.ilike.%${filters.search}%,
        company.ilike.%${filters.search}%,
        description.ilike.%${filters.search}%
      `);
    }

    return query.order('created_at', { ascending: false });
  },

  // Create job posting
  createJob: async (jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>) => {
    return supabase
      .from('jobs')
      .insert([jobData])
      .select()
      .single();
  },

  // Apply for job
  applyForJob: async (jobId: string, applicantId: string, applicationData: {
    cover_letter?: string;
    resume_url?: string;
  }) => {
    return supabase
      .from('job_applications')
      .insert([{
        job_id: jobId,
        applicant_id: applicantId,
        ...applicationData,
        status: 'pending'
      }])
      .select()
      .single();
  },

  // Get user's job applications
  getUserApplications: async (userId: string) => {
    return supabase
      .from('job_applications')
      .select(`
        *,
        job:jobs(*)
      `)
      .eq('applicant_id', userId);
  },
};

// Mentorship API
export const mentorshipApi = {
  // Get available mentors
  getMentors: async (filters?: {
    program?: string;
    skills?: string[];
    location?: string;
  }) => {
    let query = supabase
      .from('profiles')
      .select('*')
      .eq('is_mentor_available', true)
      .eq('is_verified', true);

    if (filters?.program) {
      query = query.eq('program', filters.program);
    }

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    return query.order('first_name', { ascending: true });
  },

  // Send mentorship request
  requestMentorship: async (studentId: string, mentorId: string, message: string) => {
    return supabase
      .from('mentorship_requests')
      .insert([{
        student_id: studentId,
        mentor_id: mentorId,
        request_message: message,
        status: 'pending'
      }])
      .select()
      .single();
  },

  // Respond to mentorship request
  respondToRequest: async (requestId: string, status: 'accepted' | 'rejected', responseMessage?: string) => {
    return supabase
      .from('mentorship_requests')
      .update({
        status,
        response_message: responseMessage
      })
      .eq('id', requestId);
  },

  // Get mentorship requests (for mentors)
  getMentorshipRequests: async (mentorId: string) => {
    return supabase
      .from('mentorship_requests')
      .select(`
        *,
        student:profiles!mentorship_requests_student_id_fkey(*)
      `)
      .eq('mentor_id', mentorId);
  },

  // Get user's mentorship status (for students)
  getUserMentorships: async (studentId: string) => {
    return supabase
      .from('mentorship_requests')
      .select(`
        *,
        mentor:profiles!mentorship_requests_mentor_id_fkey(*)
      `)
      .eq('student_id', studentId);
  },
};

// Donations API
export const donationsApi = {
  // Create donation
  createDonation: async (donationData: Omit<Donation, 'id' | 'created_at'>) => {
    return supabase
      .from('donations')
      .insert([donationData])
      .select()
      .single();
  },

  // Get donation statistics
  getDonationStats: async () => {
    return supabase
      .from('donations')
      .select('amount, created_at')
      .eq('status', 'completed');
  },

  // Get user's donation history
  getUserDonations: async (userId: string) => {
    return supabase
      .from('donations')
      .select('*')
      .eq('donor_id', userId)
      .order('created_at', { ascending: false });
  },
};

// Analytics API (for admin dashboard)
export const analyticsApi = {
  // Get platform statistics
  getPlatformStats: async () => {
    const [usersCount, alumniCount, eventsCount, jobsCount] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('is_verified', true),
      supabase.from('events').select('id', { count: 'exact', head: true }),
      supabase.from('jobs').select('id', { count: 'exact', head: true }).eq('is_active', true),
    ]);

    return {
      totalUsers: usersCount.count || 0,
      verifiedAlumni: alumniCount.count || 0,
      activeEvents: eventsCount.count || 0,
      activeJobs: jobsCount.count || 0,
    };
  },

  // Get user growth over time
  getUserGrowth: async (days = 30) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return supabase
      .from('profiles')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });
  },
};