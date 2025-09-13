import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Link as LinkIcon } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

// Mock startup funding requests
const mockRequests = [
  {
    id: 1,
    studentName: "Rohit Sharma",
    email: "rohit@example.com",
    phone: "+1 555-1234",
    university: "ABC University",
    course: "B.Tech Computer Science",
    startupName: "EduTech Solutions",
    startupDescription: "A platform to provide affordable online courses to rural students using AI-driven personalized learning.",
    fundingGoal: 5000,
    website: "https://edutech.example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/rohit-sharma",
      twitter: "https://twitter.com/rohit_sharma"
    }
  },
  {
    id: 2,
    studentName: "Priya Singh",
    email: "priya@example.com",
    phone: "+1 555-5678",
    university: "XYZ Institute",
    course: "MBA Entrepreneurship",
    startupName: "GreenGrow",
    startupDescription: "A sustainable agriculture startup helping farmers optimize crop yield using IoT devices and smart analytics.",
    fundingGoal: 10000,
    website: "https://greengrow.example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/priya-singh",
      twitter: "https://twitter.com/priya_singh"
    }
  }
];

const StartupFunding = () => {

  const handleConnect = (student: typeof mockRequests[0]) => {
    // For now, show a toast. Later, this can be an email or form submission.
    toast.success(`You can contact ${student.studentName} at ${student.email}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Startup Fund Requests</h1>
        <p className="text-muted-foreground mb-8">
          Explore student startups seeking funding. Connect with them to support innovative ideas.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground mb-2">{request.startupName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Student Details */}
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2"><User className="h-4 w-4" /> {request.studentName}</div>
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {request.email}</div>
                  <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {request.phone}</div>
                  <div className="flex items-center gap-2"><LinkIcon className="h-4 w-4" /> <a href={request.website} target="_blank" className="underline">{request.website}</a></div>
                </div>

                {/* University & Course */}
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>University:</strong> {request.university}</div>
                  <div><strong>Course:</strong> {request.course}</div>
                </div>

                {/* Startup Description */}
                <div>
                  <h4 className="text-sm font-medium text-card-foreground mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{request.startupDescription}</p>
                </div>

                {/* Funding Goal */}
                <div>
                  <strong>Funding Goal:</strong> ${request.fundingGoal.toLocaleString()}
                </div>

                {/* Action */}
                <Button className="w-full mt-2" onClick={() => handleConnect(request)}>Connect</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartupFunding;
