import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Users } from "lucide-react";

const Meetup = () => {
  const [meetups, setMeetups] = useState([
    {
      id: 1,
      title: "Batch 2022 Reunion",
      description: "Reconnect with your batchmates and share memories.",
      date: "2025-09-20",
      location: "CGC Landran Auditorium",
      attendees: 15,
    },
    {
      id: 2,
      title: "Tech Enthusiasts Meetup",
      description: "Discuss AI, Blockchain, and emerging technologies.",
      date: "2025-10-05",
      location: "Online (Google Meet)",
      attendees: 22,
    },
  ]);

  const [newMeetup, setNewMeetup] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleCreateMeetup = () => {
    if (!newMeetup.title || !newMeetup.date || !newMeetup.location) {
      alert("Please fill in all required fields.");
      return;
    }
    setMeetups([
      ...meetups,
      {
        id: meetups.length + 1,
        ...newMeetup,
        attendees: 0,
      },
    ]);
    setNewMeetup({ title: "", description: "", date: "", location: "" });
  };

  const handleJoin = (id: number) => {
    setMeetups(
      meetups.map((meetup) =>
        meetup.id === id
          ? { ...meetup, attendees: meetup.attendees + 1 }
          : meetup
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Alumni Meetups
      </h1>

      {/* Create Meetup Section */}
      <Card className="max-w-3xl mx-auto mb-10 shadow-lg rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Create a Meetup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Meetup Title"
            value={newMeetup.title}
            onChange={(e) =>
              setNewMeetup({ ...newMeetup, title: e.target.value })
            }
          />
          <Textarea
            placeholder="Description"
            value={newMeetup.description}
            onChange={(e) =>
              setNewMeetup({ ...newMeetup, description: e.target.value })
            }
          />
          <Input
            type="date"
            value={newMeetup.date}
            onChange={(e) =>
              setNewMeetup({ ...newMeetup, date: e.target.value })
            }
          />
          <Input
            placeholder="Location"
            value={newMeetup.location}
            onChange={(e) =>
              setNewMeetup({ ...newMeetup, location: e.target.value })
            }
          />
          <Button
            onClick={handleCreateMeetup}
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Create Meetup
          </Button>
        </CardContent>
      </Card>

      {/* Meetup List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {meetups.map((meetup) => (
          <Card
            key={meetup.id}
            className="shadow-lg rounded-2xl border-0 hover:shadow-xl transition"
          >
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                {meetup.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700">{meetup.description}</p>
              <div className="flex items-center text-gray-600 space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{meetup.date}</span>
              </div>
              <div className="flex items-center text-gray-600 space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{meetup.location}</span>
              </div>
              <div className="flex items-center text-gray-600 space-x-2">
                <Users className="h-4 w-4" />
                <span>{meetup.attendees} attending</span>
              </div>
              <Button
                onClick={() => handleJoin(meetup.id)}
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                Join Meetup
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Meetup;
