// src/components/ActiveSessions.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Dummy data for active sessions
const dummySessions = [
  {
    id: 1,
    title: "React Mentoring Session",
    host: "John Doe (Alumni)",
    time: "2025-09-14 3:00 PM",
    link: "/mentoring-session/1",
    active: true,
  },
  {
    id: 2,
    title: "AI & ML Workshop",
    host: "Admin",
    time: "2025-09-15 5:00 PM",
    link: "/mentoring-session/2",
    active: false,
  },
];

export default function LectureRoom() {
  const [sessions, setSessions] = useState(dummySessions);

  const handleJoin = (title: string) => {
    toast.success(`You joined "${title}"!`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Active Mentoring Sessions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <Card
            key={session.id}
            className={`shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-accent/20 ${
              session.active ? "border-green-400" : "border-gray-200 opacity-70"
            }`}
          >
            <CardHeader className="flex flex-col items-center gap-2">
              <CardTitle className="text-lg">{session.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground flex items-center gap-1">
                <User size={16} /> {session.host}
              </CardDescription>
              <CardDescription className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar size={16} /> {session.time}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center mt-4">
              {session.active ? (
                <Link to={session.link}>
                  <Button onClick={() => handleJoin(session.title)}>Join Now</Button>
                </Link>
              ) : (
                <Button disabled>Not Started</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
