import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Search, 
  Filter,
  Building,
  Calendar
} from "lucide-react";

const Jobs = () => {
  // Mock job data - replace with actual API calls
  const mockJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      job_type: "full-time",
      salary_min: 150000,
      salary_max: 200000,
      posted_date: "2024-01-10",
      description: "Join our world-class engineering team building next-generation products.",
      requirements: ["React", "Node.js", "TypeScript", "AWS"]
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      job_type: "full-time",
      salary_min: 120000,
      salary_max: 160000,
      posted_date: "2024-01-08",
      description: "Lead product strategy and execution for enterprise solutions.",
      requirements: ["Product Strategy", "Analytics", "Leadership", "B2B"]
    },
    {
      id: 3,
      title: "Marketing Intern",
      company: "Tesla",
      location: "Austin, TX",
      job_type: "internship",
      posted_date: "2024-01-12",
      description: "Gain hands-on experience in digital marketing and brand strategy.",
      requirements: ["Digital Marketing", "Social Media", "Content Creation"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Career Opportunities</h1>
          <p className="text-muted-foreground">
            Discover job openings and internships from our alumni network
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs by title, company, or skills..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:flex gap-4">
                <Select>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="san-francisco">San Francisco</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="seattle">Seattle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-card-foreground">
            {mockJobs.length} Opportunities Found
          </h2>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {mockJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-card-foreground mb-2">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {job.company}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(job.posted_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={job.job_type === 'full-time' ? 'default' : 
                              job.job_type === 'internship' ? 'secondary' : 'outline'}
                    >
                      {job.job_type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                    {job.salary_min && (
                      <Badge variant="outline">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {job.salary_min.toLocaleString()}-{job.salary_max?.toLocaleString()}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                  
                  <div>
                    <h4 className="text-sm font-medium text-card-foreground mb-2">
                      Required Skills & Experience
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((requirement, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {requirement}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button className="flex-1">
                      Apply Now
                    </Button>
                    <Button variant="outline">
                      Save Job
                    </Button>
                    <Button variant="outline">
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results state */}
        {mockJobs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">No Jobs Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria to find more opportunities.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Jobs;