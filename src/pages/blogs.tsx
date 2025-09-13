import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const blogs = [
  {
    id: 1,
    title: "The Power of Alumni Networks",
    author: {
      name: "Rohit Sharma",
      gradYear: 2018,
      branch: "Computer Science",
      profilePic: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    date: "Sept 10, 2025",
    category: "Networking",
    content:
      "Alumni communities play a crucial role in guiding students and strengthening institutions. They provide mentorship, job opportunities, and lasting connections. Engaging with alumni helps students gain career insights and build strong professional networks...",
  },
  {
    id: 2,
    title: "Career Guidance for Students",
    author: {
      name: "Neha Verma",
      gradYear: 2019,
      branch: "Electronics & Communication",
      profilePic: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    date: "Sept 05, 2025",
    category: "Career",
    content:
      "One of the most valuable aspects of alumni engagement is career mentorship. Sharing experiences, tips, and insights helps students navigate their future effectively. Alumni provide guidance on job interviews, higher studies, and career transitions...",
  },
  {
    id: 3,
    title: "Fundraising and Development",
    author: {
      name: "Amit Patel",
      gradYear: 2017,
      branch: "Mechanical Engineering",
      profilePic: "https://randomuser.me/api/portraits/men/56.jpg"
    },
    date: "Aug 28, 2025",
    category: "Fundraising",
    content:
      "Fundraising through alumni networks allows institutions to grow, innovate, and support students in need. Together, we can make education more accessible. Alumni contributions enable scholarships, infrastructure improvements, and mentorship programs...",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">📝 Alumni Blog</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link to={`/blog/${blog.id}`} key={blog.id}>
              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md cursor-pointer">
                <CardHeader className="flex flex-col gap-3">
                  <CardTitle className="text-xl font-bold">{blog.title}</CardTitle>
                  <div className="flex items-center gap-3">
                    <img 
                      src={blog.author.profilePic} 
                      alt={blog.author.name} 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                    <div>
                      <p className="text-sm font-medium">{blog.author.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {blog.author.branch}, Class of {blog.author.gradYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{blog.date}</span>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">{blog.category}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-4">
                    {blog.content}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
