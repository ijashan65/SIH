import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Calendar, Briefcase } from "lucide-react";

const Analytics = () => {
  // Example dataset - replace with API later
  const userGrowth = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 400 },
    { month: "Mar", users: 650 },
    { month: "Apr", users: 900 },
    { month: "May", users: 1200 },
    { month: "Jun", users: 1500 },
  ];

  const eventParticipation = [
    { name: "Tech Meetup", registrations: 120 },
    { name: "Career Fair", registrations: 200 },
    { name: "Reunion", registrations: 320 },
    { name: "Workshop", registrations: 90 },
  ];

  const alumniDistribution = [
    { name: "IT", value: 400 },
    { name: "Finance", value: 300 },
    { name: "Education", value: 250 },
    { name: "Other", value: 150 },
  ];

  const COLORS = ["#6366F1", "#EC4899", "#22C55E", "#F59E0B"];

  return (
    <div className="space-y-6">
      <Navigation />

      {/* Page Header */}
      <div className="gradient-card rounded-lg p-6 border border-border/50">
        <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Visual insights into alumni, events, and platform growth</p>
      </div>

      {/* Stat Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-xl font-bold">2,543</h2>
              <p className="text-sm text-muted-foreground">Total Alumni</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 flex items-center gap-3">
            <Calendar className="h-8 w-8 text-accent" />
            <div>
              <h2 className="text-xl font-bold">15</h2>
              <p className="text-sm text-muted-foreground">Active Events</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-xl font-bold">87</h2>
              <p className="text-sm text-muted-foreground">Job Opportunities</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-accent" />
            <div>
              <h2 className="text-xl font-bold">+18%</h2>
              <p className="text-sm text-muted-foreground">Platform Growth</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Line Chart */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly increase in alumni registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Event Participation Bar Chart */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Event Participation</CardTitle>
            <CardDescription>Registrations per event</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eventParticipation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="registrations" fill="#EC4899" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alumni Distribution Pie Chart */}
        <Card className="shadow-soft lg:col-span-2">
          <CardHeader>
            <CardTitle>Alumni Industry Distribution</CardTitle>
            <CardDescription>Breakdown of alumni by industry sector</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={alumniDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {alumniDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
