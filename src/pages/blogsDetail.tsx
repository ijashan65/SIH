import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

// Same blog data (later this can come from API/backend)
const blogs = [
  {
    id: 1,
    title: "The Power of Alumni Networks",
    author: "Admin",
    date: "Sept 10, 2025",
    content:
      "Alumni communities play a crucial role in guiding students and strengthening institutions. They provide mentorship, job opportunities, and lasting connections. In this article, we explore how alumni can continue to make an impact long after graduation...",
  },
  {
    id: 2,
    title: "Career Guidance for Students",
    author: "Admin",
    date: "Sept 05, 2025",
    content:
      "One of the most valuable aspects of alumni engagement is career mentorship. Sharing experiences, tips, and insights helps students navigate their future effectively. Alumni provide real-world perspectives and opportunities for growth...",
  },
  {
    id: 3,
    title: "Fundraising and Development",
    author: "Admin",
    date: "Aug 28, 2025",
    content:
      "Fundraising through alumni networks allows institutions to grow, innovate, and support students in need. Together, we can make education more accessible and improve infrastructure, research, and scholarships...",
  },
];

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Blog not found</h1>
        <Link to="/blog" className="text-primary hover:underline">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <p className="text-sm text-muted-foreground mb-6">
            By {blog.author} • {blog.date}
          </p>
          <p className="text-base leading-relaxed">{blog.content}</p>
          <Link
            to="/blog"
            className="mt-6 inline-block text-primary hover:underline"
          >
            ← Back to Blogs
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
