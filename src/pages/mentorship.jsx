import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function Mentorship() {
  // Dummy mentorship requests (you can fetch from API later)
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Alex Rodriguez",
      course: "Software Engineering - Final Year",
      request: "Looking for guidance in backend development",
    },
    {
      id: 2,
      name: "Priya Sharma",
      course: "Data Science - 3rd Year",
      request: "Need help with machine learning projects",
    },
    {
      id: 3,
      name: "Rahul Mehta",
      course: "MBA - 2nd Year",
      request: "Seeking mentorship for career in management consulting",
    },
  ]);

  const handleAction = (id, action) => {
    alert(`${action} request of student with ID: ${id}`);
    setRequests(requests.filter((req) => req.id !== id)); // remove after action
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Mentorship Requests
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {requests.map((req) => (
          <Card
            key={req.id}
            className="hover:shadow-lg transition-all duration-300 border-0 shadow-md"
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{req.name}</h2>
                  <p className="text-sm text-muted-foreground">{req.course}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{req.request}</p>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50"
                  onClick={() => handleAction(req.id, "Declined")}
                >
                  Decline
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleAction(req.id, "Accepted")}
                >
                  Accept
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
