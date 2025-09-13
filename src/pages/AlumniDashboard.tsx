import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  Heart,
  MessageSquare,
  Award,
  Target,
  TrendingUp,
  UserCheck
} from "lucide-react";

interface AlumniDashboardProps {
  userName: string;
}

const AlumniDashboard = ({ userName }: AlumniDashboardProps) => {
  const impactStats = [
    { icon: Users, label: "Students Mentored", value: "12", color: "text-primary" },
    { icon: Heart, label: "Donations Made", value: "₹2,500", color: "text-accent" },
    { icon: Calendar, label: "Events Attended", value: "8", color: "text-primary" },
    { icon: MessageSquare, label: "Community Posts", value: "24", color: "text-accent" },
  ];

  const mentorshipRequests = [
    { name: "Alex Rodriguez", field: "Software Engineering", year: "Final Year", message: "Looking for guidance in backend development" },
    { name: "Priya Sharma", field: "Data Science", year: "3rd Year", message: "Need help with machine learning projects" },
    { name: "James Wilson", field: "Product Management", year: "Final Year", message: "Seeking advice on PM career transition" },
  ];

  const upcomingEvents = [
    { title: "Alumni Reunion 2024", date: "April 15", participants: "150+ attending", type: "Reunion" },
    { title: "Entrepreneurship Workshop", date: "March 28", participants: "45+ attending", type: "Workshop" },
    { title: "Industry Panel Discussion", date: "April 5", participants: "80+ attending", type: "Panel" },
  ];

  const achievements = [
    { title: "Mentor Excellence Award", description: "Recognized for outstanding mentorship", date: "2024" },
    { title: "Top Contributor Badge", description: "Active community participation", date: "2023" },
    { title: "Donation Champion", description: "Generous support to scholarship fund", date: "2023" },
  ];

  return (
    <div className="space-y-6">
       <Navigation />
      {/* Welcome Header */}
      <div className="gradient-card rounded-lg p-6 border border-border/50">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground">
          Continue making a difference in the lives of current students and fellow alumni.
        </p>
        <div className="flex gap-3 mt-4">
          <Badge className="gradient-primary text-primary-foreground">
            <Award className="h-3 w-3 mr-1" />
            Verified Alumni
          </Badge>
          <Badge variant="secondary">
            <UserCheck className="h-3 w-3 mr-1" />
            Active Mentor
          </Badge>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {impactStats.map((stat, index) => (
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
        {/* Mentorship Requests */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Mentorship Requests
            </CardTitle>
            <CardDescription>Students seeking your guidance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mentorshipRequests.map((request, index) => (
              <div key={index} className="p-3 rounded-lg border border-border/50 space-y-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="gradient-primary text-primary-foreground text-xs">
                      {request.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{request.name}</p>
                    <p className="text-xs text-muted-foreground">{request.field} • {request.year}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">{request.message}</p>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="gradient-primary text-xs">Accept</Button>
                  <Button size="sm" variant="outline" className="text-xs">Decline</Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
             <Target className="h-4 w-4 mr-2" />
               View All Requests
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Alumni Events
            </CardTitle>
            <CardDescription>Connect with your community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-3 rounded-lg border border-border/50 hover:bg-secondary/30 transition-smooth">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium">{event.title}</h4>
                  <Badge variant="secondary" className="text-xs">{event.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{event.date}</p>
                <p className="text-xs text-accent">{event.participants}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Browse All Events
            </Button>
          </CardContent>
        </Card>

        {/* Achievements & Recognition */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Achievements
            </CardTitle>
            <CardDescription>Your contributions recognized</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-3 rounded-lg gradient-card border border-border/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium">{achievement.title}</h4>
                  <Badge className="text-xs">{achievement.date}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Award className="h-4 w-4 mr-2" />
              View All Achievements
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-primary/20">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Make a Donation</h3>
            <p className="text-sm text-muted-foreground">Support current students and programs</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-accent/20">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-3 text-accent" />
            <h3 className="font-semibold mb-2">Host an Event</h3>
            <p className="text-sm text-muted-foreground">Organize networking or learning sessions</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-primary/20">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Alumni Directory</h3>
            <p className="text-sm text-muted-foreground">Connect with fellow graduates</p>
          </CardContent>
        </Card>
        <Link to="/Session" className="block">
      <Card className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-accent/20">
        <CardContent className="p-6 text-center">
          <TrendingUp className="h-8 w-8 mx-auto mb-3 text-accent" />
          <h3 className="font-semibold mb-2">Mentoring Session</h3>
          <p className="text-sm text-muted-foreground">
            Share your latest achievements
          </p>
        </CardContent>
      </Card>
    </Link>
      </div>
    </div>
  );
};

export default AlumniDashboard;