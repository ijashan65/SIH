import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AlumniDirectory from "./pages/AlumniDirectory";
import StudentDashboard from "./pages/StudentDashboard";
import AlumniDashboard from "./pages/AlumniDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Events from "./pages/Events";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import Mentorship from "./pages/Mentorship";
import NotFound from "./pages/NotFound";
import ManageEvents from "./pages/ManageEvents";
import AnalyticsPage from "./pages/analytics";
import BulkImport from "./pages/bulkExport";
import CommunicationsPage from "./pages/communicationPage";
import SettingsPage from "./pages/settingAdmin";
import Blog from "./pages/blogs";
import BlogDetail from "./pages/blogsDetail";
import SingleAlumniProfile from "./pages/singleAlumniPage";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/alumni" element={<AlumniDirectory />} />
            <Route path="/events" element={<Events />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/mentorship" element={<Mentorship/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/alumni" element={<AlumniDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/manage-events" element={<ManageEvents />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/bulk-import" element={<BulkImport />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/alumni/:id" element={<SingleAlumniProfile />} />
            <Route path="/communications" element={<CommunicationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
