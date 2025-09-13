import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Users,
  Award,
  GraduationCap
} from "lucide-react";

// ✅ Mock alumni data (single array)
export const mockAlumni = [
  {
    id: 1,
    name: "Sarah Johnson",
    batch: "2018",
    program: "Computer Science",
    company: "Google",
    position: "Senior Software Engineer",
    location: "San Francisco, CA",
    skills: ["JavaScript", "React", "Node.js", "AI/ML"],
    isVerified: true,
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    email: "sarah.johnson@alumni.clg.com"
  },
  {
    id: 2,
    name: "Michael Chen",
    batch: "2016",
    program: "Business Administration",
    company: "Microsoft",
    position: "Product Manager",
    location: "Seattle, WA",
    skills: ["Product Strategy", "Analytics", "Leadership", "Design Thinking"],
    isVerified: true,
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    email: "michael.chen@alumni.clg.com"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    batch: "2019",
    program: "Marketing",
    company: "Tesla",
    position: "Marketing Director",
    location: "Austin, TX",
    skills: ["Digital Marketing", "Brand Strategy", "Content Creation", "Analytics"],
    isVerified: true,
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    email: "emily.rodriguez@alumni.clg.com"
  },
  {
    id: 4,
    name: "Rahul Mehta",
    batch: "2020",
    program: "Mechanical Engineering",
    company: "GE",
    position: "Project Engineer",
    location: "Bangalore, India",
    skills: ["CAD", "Project Management", "Thermodynamics"],
    isVerified: false,
    profileImage: "https://randomuser.me/api/portraits/men/52.jpg",
    email: "rahul.mehta@alumni.clg.com"
  },
  {
    id: 5,
    name: "Sophia Lee",
    batch: "2017",
    program: "Finance",
    company: "Goldman Sachs",
    position: "Investment Analyst",
    location: "New York, NY",
    skills: ["Financial Modeling", "Excel", "Portfolio Management"],
    isVerified: true,
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "sophia.lee@alumni.clg.com"
  },
  {
    id: 6,
    name: "Arjun Sharma",
    batch: "2016",
    program: "Civil Engineering",
    company: "Larsen & Toubro",
    position: "Site Engineer",
    location: "Mumbai, India",
    skills: ["AutoCAD", "Project Planning", "Construction Management"],
    isVerified: true,
    profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
    email: "arjun.sharma@alumni.clg.com"
  },
  {
    id: 7,
    name: "Olivia Brown",
    batch: "2018",
    program: "Human Resources",
    company: "Google",
    position: "HR Manager",
    location: "Mountain View, CA",
    skills: ["Recruitment", "Employee Relations", "Talent Management"],
    isVerified: false,
    profileImage: "https://randomuser.me/api/portraits/women/12.jpg",
    email: "olivia.brown@alumni.clg.com"
  },
  {
    id: 8,
    name: "Vikram Singh",
    batch: "2019",
    program: "Electrical Engineering",
    company: "Siemens",
    position: "Electrical Engineer",
    location: "Hyderabad, India",
    skills: ["Circuit Design", "PLC", "Power Systems"],
    isVerified: true,
    profileImage: "https://randomuser.me/api/portraits/men/30.jpg",
    email: "vikram.singh@alumni.clg.com"
  },
  {
    id: 9,
    name: "Maya Patel",
    batch: "2020",
    program: "Marketing",
    company: "Amazon",
    position: "Marketing Specialist",
    location: "Seattle, WA",
    skills: ["SEO", "Social Media Marketing", "Content Strategy"],
    isVerified: true,
    profileImage: "https://randomuser.me/api/portraits/women/33.jpg",
    email: "maya.patel@alumni.clg.com"
  },
  {
    id: 10,
    name: "Ankit Verma",
    batch: "2017",
    program: "Computer Science",
    company: "Microsoft",
    position: "Backend Developer",
    location: "Redmond, WA",
    skills: ["Node.js", "SQL", "API Development"],
    isVerified: true,
    profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
    email: "ankit.verma@alumni.clg.com"
  },
  {
    id: 11,
    name: "Isabella Martinez",
    batch: "2018",
    program: "Design",
    company: "Adobe",
    position: "UI/UX Designer",
    location: "San Jose, CA",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    isVerified: false,
    profileImage: "https://randomuser.me/api/portraits/women/25.jpg",
    email: "isabella.martinez@alumni.clg.com"
  },
  {
    id: 12,
    name: "Rohit Gupta",
    batch: "2016",
    program: "Information Technology",
    company: "Infosys",
    position: "Software Engineer",
    location: "Pune, India",
    skills: ["Java", "Spring Boot", "Microservices"],
    isVerified: true,
    profileImage: "https://randomuser.me/api/portraits/men/40.jpg",
    email: "rohit.gupta@alumni.clg.com"
  },
  {
    id: 13,
    name: "Aanya Desai",
    batch: "2019",
    program: "Economics",
    company: "World Bank",
    position: "Economic Analyst",
    location: "Washington, D.C.",
    skills: ["Data Analysis", "Statistics", "Economic Research"],
    isVerified: true,
    profileImage: "https://randomuser.me/api/portraits/women/30.jpg",
    email: "aanya.desai@alumni.clg.com"
  },
  // ... add all the rest of the 20 alumni here
];

const AlumniDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredAlumni, setFilteredAlumni] = useState(mockAlumni);

  const batches = ["2015", "2016", "2017", "2018", "2019", "2020"];
  const programs = ["Computer Science", "Business Administration", "Engineering", "Marketing"];
  const locations = ["San Francisco, CA", "Seattle, WA", "New York, NY", "Austin, TX"];

  const handleSearch = () => {
    let filtered = mockAlumni;

    if (searchTerm) {
      filtered = filtered.filter(alumni => 
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedBatch) filtered = filtered.filter(alumni => alumni.batch === selectedBatch);
    if (selectedProgram) filtered = filtered.filter(alumni => alumni.program === selectedProgram);
    if (selectedLocation) filtered = filtered.filter(alumni => alumni.location === selectedLocation);

    setFilteredAlumni(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedBatch("");
    setSelectedProgram("");
    setSelectedLocation("");
    setFilteredAlumni(mockAlumni);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">Alumni Directory</h1>
            <p className="text-muted-foreground">
              Connect with {mockAlumni.length}+ verified alumni worldwide.<br/>Find alumni by batch, program, or location and grow your professional network
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-primary" />
              <span>Search & Filter Alumni</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, company, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-3 gap-4">
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger>
                  <SelectValue placeholder="All Batches" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map(batch => (
                    <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger>
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" /> Search Alumni
              </Button>
              <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
            </div>
          </CardContent>
        </Card>

        {/* Alumni Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map(alumni => (
            <Link key={alumni.id} to={`/alumni/${alumni.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={alumni.profileImage}
                        alt={alumni.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {alumni.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                          <Award className="h-3 w-3 text-success-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-card-foreground truncate">{alumni.name}</h3>
                      <p className="text-sm text-muted-foreground">{alumni.position}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Building className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{alumni.company}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      {alumni.program} • Class of {alumni.batch}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {alumni.skills.slice(0, 2).map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniDirectory;
