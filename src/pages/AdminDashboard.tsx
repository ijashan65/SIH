import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom"; // ✅ Added for linking
import {
  Users,
  Calendar,
  TrendingUp,
  UserCheck,
  AlertTriangle,
  BarChart3,
  Upload,
  Settings,
  Shield,
  Mail
} from "lucide-react";

interface AdminDashboardProps {
  userName: string;
}

const AdminDashboard = ({ userName }: AdminDashboardProps) => {
  const systemStats = [
    { icon: Users, label: "Total Alumni", value: "6", color: "text-primary", change: "+12%" },
    { icon: UserCheck, label: "Pending Verifications", value: "23", color: "text-accent", change: "-5%" },
    { icon: Calendar, label: "Active Events", value: "8", color: "text-primary", change: "+3%" },
    { icon: TrendingUp, label: "Platform Growth", value: "18%", color: "text-accent", change: "+2%" },
  ];

  const pendingVerifications = [
    { name: "Sarah Mitchell", email: "sarah.m@alumni.clg.com", company: "Apple Inc.", role: "Senior Engineer", status: "pending" },
    { name: "David Park", email: "david.p@alumni.clg.com", company: "Goldman Sachs", role: "VP Finance", status: "pending" },
    { name: "Lisa Chen", email: "lisa.c@alumni.clg.com", company: "Meta", role: "Product Manager", status: "pending" },
  ];

  const recentEvents = [
    { title: "Tech Alumni Meetup", date: "March 15", status: "Active", registrations: 45 },
    { title: "Career Fair 2024", date: "March 28", status: "Planning", registrations: 120 },
    { title: "Alumni Reunion", date: "April 15", status: "Active", registrations: 200 },
  ];

  const systemAlerts = [
    { type: "warning", message: "Server maintenance scheduled for this weekend", priority: "Medium" },
    { type: "info", message: "New user registration spike detected", priority: "Low" },
    { type: "error", message: "Email service experiencing delays", priority: "High" },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-accent" />;
      default: return <AlertTriangle className="h-4 w-4 text-primary" />;
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Navigation />
      {/* Admin Header */}
      <div className="gradient-card rounded-lg p-6 border border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {userName}. Here's your platform overview.
            </p>
          </div>
          <Badge className="gradient-primary text-primary-foreground">
            <Shield className="h-3 w-3 mr-1" />
            System Administrator
          </Badge>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
                <div className="text-right">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  <div className="text-xs text-accent font-medium mt-1">{stat.change}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Verifications */}
{/* Add New Alumni */}
<Card className="shadow-soft">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <UserCheck className="h-5 w-5 text-primary" />
      Add New Alumni
    </CardTitle>
    <CardDescription>Admin can manually add alumni to the platform</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
      />
      <input
        type="text"
        placeholder="LinkedIn ID / URL"
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
      />
      <input
        type="text"
        placeholder="Company / Organization"
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
      />
      <input
        type="text"
        placeholder="Position / Title"
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
      />
      <input
        type="text"
        placeholder="Program / Course"
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
      />
      <input
        type="text"
        placeholder="Batch (e.g., 2018)"
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
      />
      <input
        type="text"
        placeholder="Skills (comma separated)"
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
      />
      <input
        type="file"
        accept="image/*"
        className="w-full text-sm text-muted-foreground"
      />
    </div>

    <Button className="w-full gradient-primary text-white mt-2">
      Add Alumni
    </Button>
  </CardContent>
</Card>



        {/* Event Management */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Event Management
            </CardTitle>
            <CardDescription>Manage alumni events and activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEvents.map((event, index) => (
              <div key={index} className="p-3 rounded-lg border border-border/50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium">{event.title}</h4>
                  <Badge 
                    variant={event.status === 'Active' ? 'default' : 'secondary'} 
                    className="text-xs"
                  >
                    {event.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{event.date}</p>
                <p className="text-xs text-accent font-medium">{event.registrations} registrations</p>
              </div>
            ))}

            {/* ✅ Manage Events button now links to /manage-events */}
            <Link to="/manage-events">
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Manage All Events
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              System Alerts
            </CardTitle>
            <CardDescription>Important notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="p-3 rounded-lg border border-border/50">
                <div className="flex items-start gap-2 mb-2">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                  </div>
                  <Badge variant={getAlertColor(alert.priority) as any} className="text-xs">
                    {alert.priority}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <AlertTriangle className="h-4 w-4 mr-2" />
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tools */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
  <Link to="/analytics" className="block">
    <Card className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-primary/20">
      <CardContent className="p-6 text-center">
        <BarChart3 className="h-8 w-8 mx-auto mb-3 text-primary" />
        <h3 className="font-semibold mb-2">Analytics</h3>
        <p className="text-sm text-muted-foreground">View detailed platform analytics</p>
      </CardContent>
    </Card>
  </Link>

        {/* Bulk Import */}
  <Link to="/bulk-import" className="block">
    <Card className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-accent/20">
      <CardContent className="p-6 text-center">
        <Upload className="h-8 w-8 mx-auto mb-3 text-accent" />
        <h3 className="font-semibold mb-2">Bulk Import</h3>
        <p className="text-sm text-muted-foreground">Import student and alumni data</p>
      </CardContent>
    </Card>
  </Link>

  {/* Communications */}
  <Link to="/communications" className="block">
    <Card className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-primary/20">
      <CardContent className="p-6 text-center">
        <Mail className="h-8 w-8 mx-auto mb-3 text-primary" />
        <h3 className="font-semibold mb-2">Communications</h3>
        <p className="text-sm text-muted-foreground">Send announcements and updates</p>
      </CardContent>
    </Card>
  </Link>

  {/* System Settings */}
  <Link to="/settings" className="block">
    <Card className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-accent/20">
      <CardContent className="p-6 text-center">
        <Settings className="h-8 w-8 mx-auto mb-3 text-accent" />
        <h3 className="font-semibold mb-2">System Settings</h3>
        <p className="text-sm text-muted-foreground">Configure platform settings</p>
      </CardContent>
    </Card>
  </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
