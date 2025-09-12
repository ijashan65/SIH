import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { AlignJustify } from "lucide-react";
const blogs = [
  {
    id: 1,
    title: "The Power of Alumni Networks",
    author: "Admin",
    date: "Sept 10, 2025",
    content:
      "Alumni communities play a crucial role in guiding students and strengthening institutions. They provide mentorship, job opportunities, and lasting connections.",
  },
  {
    id: 2,
    title: "Career Guidance for Students",
    author: "Admin",
    date: "Sept 05, 2025",
    content:
      "One of the most valuable aspects of alumni engagement is career mentorship. Sharing experiences, tips, and insights helps students navigate their future effectively.",
  },
  {
    id: 3,
    title: "Fundraising and Development",
    author: "Admin",
    date: "Aug 28, 2025",
    content:
      "Fundraising through alumni networks allows institutions to grow, innovate, and support students in need. Together, we can make education more accessible.",
  },
];

export default function Blog() {
  return (
    <div className="p-8">
    <Navigation />
      <h1 className="text-3xl font-bold mb-6 " >📝 Alumni Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md cursor-pointer">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  By {blog.author} • {blog.date}
                </p>
                <p className="text-muted-foreground line-clamp-3">
                  {blog.content}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
