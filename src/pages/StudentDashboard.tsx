import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  Briefcase,
  MessageSquare,
  BookOpen,
  Target,
  TrendingUp,
  Bell
} from "lucide-react";

interface StudentDashboardProps {
  userName: string;
}

const StudentDashboard = ({ userName }: StudentDashboardProps) => {
  const quickStats = [
    { icon: Users, label: "Alumni Connections", value: "24", color: "text-primary" },
    { icon: MessageSquare, label: "Mentorship Requests", value: "2", color: "text-accent" },
    { icon: Briefcase, label: "Job Applications", value: "8", color: "text-primary" },
    { icon: Calendar, label: "Upcoming Events", value: "3", color: "text-accent" },
  ];

  const recentAlumni = [
    { name: "Sarah Johnson", role: "Software Engineer", company: "Google", batch: "2019" },
    { name: "Michael Chen", role: "Product Manager", company: "Microsoft", batch: "2018" },
    { name: "Emma Davis", role: "Data Scientist", company: "Netflix", batch: "2020" },
  ];

  const upcomingEvents = [
    { title: "Tech Career Fair", date: "March 15", time: "2:00 PM", type: "Career" },
    { title: "Alumni Networking Night", date: "March 20", time: "6:00 PM", type: "Networking" },
    { title: "Resume Workshop", date: "March 25", time: "3:00 PM", type: "Workshop" },
  ];

  const jobOpportunities = [
    { title: "Software Developer Intern", company: "TechCorp", location: "San Francisco", type: "Internship" },
    { title: "Marketing Associate", company: "StartupXYZ", location: "New York", type: "Full-time" },
    { title: "Data Analyst Intern", company: "DataFlow", location: "Remote", type: "Internship" },
  ];

  return (
    <div className="space-y-6">
      <Navigation />
      {/* Welcome Header */}
      <div className="gradient-card rounded-lg p-6 border border-border/50">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground">
          Continue building your network and exploring career opportunities.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Alumni Connections */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Recent Alumni
            </CardTitle>
            <CardDescription>Connect with graduates in your field</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlumni.map((alumni, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="gradient-primary text-primary-foreground text-sm">
                    {alumni.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{alumni.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{alumni.role} at {alumni.company}</p>
                  <Badge variant="outline" className="text-xs mt-1">Class of {alumni.batch}</Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Browse Alumni Directory
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Don't miss these opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-3 rounded-lg border border-border/50 hover:bg-secondary/30 transition-smooth">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium">{event.title}</h4>
                  <Badge variant="secondary" className="text-xs">{event.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {event.date} at {event.time}
                </p>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              View All Events
            </Button>
          </CardContent>
        </Card>

        {/* Job Opportunities */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Job Opportunities
            </CardTitle>
            <CardDescription>Latest openings for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {jobOpportunities.map((job, index) => (
              <div key={index} className="p-3 rounded-lg border border-border/50 hover:bg-secondary/30 transition-smooth">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium">{job.title}</h4>
                  <Badge variant={job.type === 'Internship' ? 'secondary' : 'default'} className="text-xs">
                    {job.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {job.company} • {job.location}
                </p>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Briefcase className="h-4 w-4 mr-2" />
              View All Jobs
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"><Link to="/alumni">
        <Card className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-primary/20">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Find a Mentor</h3>
            <p className="text-sm text-muted-foreground">Get guidance from experienced professionals</p>
          </CardContent>
        </Card></Link>

        <Card className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-accent/20">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-3 text-accent" />
            <h3 className="font-semibold mb-2">Skill Development</h3>
            <p className="text-sm text-muted-foreground">Access learning resources and courses</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-primary/20">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Career Insights</h3>
            <p className="text-sm text-muted-foreground">Industry trends and career advice</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-accent/20">
          <CardContent className="p-6 text-center">
            <Bell className="h-8 w-8 mx-auto mb-3 text-accent" />
            <h3 className="font-semibold mb-2">Notifications</h3>
            <p className="text-sm text-muted-foreground">Stay updated with latest opportunities</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;