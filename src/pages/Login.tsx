import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Mail, Lock, User } from "lucide-react";
import studentsImage from "@/assets/students-studying.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    uniqueId: "",
    password: "",
    role: "student",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const role = loginData.role;

    // Save role in localStorage
    localStorage.setItem("role", role);

    // Navigate to dashboard without full reload
    if (role === "student") navigate("/dashboard/student");
    else if (role === "alumni") navigate("/dashboard/alumni");
    else if (role === "admin") navigate("/dashboard/admin");

    console.log("Login attempt:", loginData);
  };

  const quickLogins = [
    { type: "Student", Id: "2320022", password: "Student@123", role: "student" },
    { type: "Alumni", Id: "220023", password: "Alumni@123", role: "alumni" },
    { type: "Admin", Id: "2322", password: "Admin@123", role: "admin" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent-light">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">

          {/* Left Side - Image */}
          <div className="hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={studentsImage} 
                alt="Students studying together" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-3xl font-bold mb-4">Welcome Back to AlumniConnect</h2>
                <p className="text-lg text-white/90 mb-6">
                  Connect with your network, discover opportunities, and build lifelong relationships.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span>10,000+ Alumni</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <span>500+ Companies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-7 w-7 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-primary">AlumniConnect</h1>
              </Link>
            </div>

            <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold text-primary">Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="uniqueId">Unique No.</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="uniqueId"
                        type="text"
                        placeholder="Enter your rollno./employee id"
                        value={loginData.uniqueId}
                        onChange={(e) => setLoginData(prev => ({ ...prev, uniqueId: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Login As</Label>
                    <Select 
                      value={loginData.role} 
                      onValueChange={(value) => setLoginData(prev => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="alumni">Alumni</SelectItem>
                        <SelectItem value="admin">Admin/Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" variant="hero" className="w-full">
                    Sign In
                  </Button>
                </form>

                <div className="space-y-3">
                  <p className="text-sm text-center text-muted-foreground">
                    Quick Access (Demo Accounts)
                  </p>
                  <div className="grid gap-2">
                    {quickLogins.map((account) => (
                      <Button
                        key={account.type}
                        variant="outline"
                        size="sm"
                        onClick={() => setLoginData({
                          uniqueId: account.Id,
                          password: account.password,
                          role: account.role,
                        })}
                        className="text-xs"
                      >
                        Demo {account.type} Account
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-hover">
                    Forgot your password?
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary hover:text-primary-hover font-medium">
                      Contact Admin
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
