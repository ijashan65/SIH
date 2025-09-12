import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { 
  Users, 
  Calendar, 
  Briefcase, 
  Heart, 
  GraduationCap, 
  Award, 
  MapPin, 
  TrendingUp,
  ArrowRight,
  Network,
  HandHeart,
  Building
} from "lucide-react";
import heroCampus from "@/assets/hero-campus.jpg";
import alumniNetworking from "@/assets/alumni-networking.jpg";
import { link } from "fs";

const Home = () => {
  const stats = [
    { number: "10,000+", label: "Active Alumni", icon: Users },
    { number: "500+", label: "Partner Companies", icon: Building },
    { number: "2,000+", label: "Success Stories", icon: Award },
    { number: "50+", label: "Countries Reached", icon: MapPin },
  ];

  const features = [
    {
      icon: Users,
      title: "Alumni Directory",
      description: "Connect with alumni worldwide using advanced search and filtering by batch, industry, location, and expertise.",
      color: "bg-primary-light text-primary",
      link: "/alumni"
    },
    {
      icon: Calendar,
      title: "Events & Meetups",
      description: "Join exclusive alumni events, reunions, webinars, and networking sessions to build meaningful connections.",
      color: "bg-accent-light text-accent",
      link: "/events"
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description: "Access job openings, internships, and career guidance from industry leaders and successful alumni.",
      color: "bg-success/20 text-success",
      link: "/jobs"
    },
    {
      icon: HandHeart,
      title: "Mentorship & Networking",
      description: "Get mentored by experienced alumni or become a mentor to guide the next generation of graduates.",
      color: "bg-warning/20 text-warning",
      link: "/mentorship"
    },
    {
      icon: Heart,
      title: "Donation & Fundraising",
      description: "Support your alma mater through donations, scholarships, and contributing to institutional growth.",
      color: "bg-destructive/20 text-destructive",
      link : "/support"
    },
    {
      icon: Network,
      title: "Blogs",
      description: "Join batch-specific groups, professional networks, and interest-based communities for deeper engagement.",
      color: "bg-primary-light text-primary",
      link: "/blog"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroCampus}
            alt="Modern university campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-accent/40" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Building 
                  <span className="block bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                    Lifelong Networks..
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/90">
                  Connect with alumni, discover opportunities, and give back to your academic community through our centralized platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/alumni">
                    Explore Alumni Directory
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.number}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  );
                }
                )}
              </div>
            </div>

            <div className="hidden lg:block">
              <Card className="bg-card/95 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-6">Quick Access</h3>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-card-foreground">Student Login</h4>
                      <p className="text-sm text-muted-foreground">Access your profile, search alumni, and apply for mentorship opportunities.</p>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/login">Student Portal</Link>
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-card-foreground">Alumni Login</h4>
                      <p className="text-sm text-muted-foreground">Update your career details, mentor students, and engage with your network.</p>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/login">Alumni Portal</Link>
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-card-foreground">Admin Access</h4>
                      <p className="text-sm text-muted-foreground">Manage alumni verification, events, and platform analytics.</p>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/login">Admin Panel</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6">
              Everything You Need to Stay Connected
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform brings together students, alumni, and staff in one powerful ecosystem designed for lifelong engagement.
            </p>
          </div>

          
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {features.map((feature, index) => {
    const Icon = feature.icon;
    return (
      <Link to={feature.link} key={index} className="block">
        <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md cursor-pointer h-full">
          <CardContent className="p-8">
            <div
              className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
            >
              <Icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-4">
              {feature.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      </Link>
    );
  })}
</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={alumniNetworking}
                alt="Alumni networking event"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Ready to Connect?
                </h2>
                <p className="text-xl text-primary-foreground/90">
                  Join thousands of alumni who are already building meaningful connections, advancing their careers, and giving back to their community.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span>Track your professional growth</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Network className="h-5 w-5 text-accent" />
                  <span>Expand your professional network</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  <span>Contribute to future generations</span>
                </div>
              </div>
              <Button variant="accent" size="lg"><Link to="/login">
                Get Started Today</Link>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-3 group mb-6">
              <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-primary">AlumniConnect</h1>
            </Link>
            <p className="text-muted-foreground mb-6">
              Building lifelong networks • Empowering careers • Strengthening communities
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;