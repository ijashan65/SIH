import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar, PlusCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const ManageEvents = () => {
  const [events, setEvents] = useState([
    { title: "Tech Alumni Meetup", date: "March 15, 2025", status: "Active", registrations: 45 },
    { title: "Career Fair 2025", date: "April 2, 2025", status: "Planning", registrations: 120 },
    { title: "Alumni Reunion", date: "April 15, 2025", status: "Completed", registrations: 200 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", status: "Planning" });

  // Handle form submission
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([...events, { ...newEvent, registrations: 0 }]);
      setNewEvent({ title: "", date: "", status: "Planning" });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <Navigation />

      {/* Page Header */}
      <div className="gradient-card rounded-lg p-6 border border-border/50">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Manage Events</h1>
            <p className="text-muted-foreground">
              Add, edit, and manage all alumni events.
            </p>
          </div>
          <Button
            className="gradient-primary flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircle className="h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Events List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {event.title}
                <Badge
                  variant={
                    event.status === "Active"
                      ? "default"
                      : event.status === "Planning"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {event.status}
                </Badge>
              </CardTitle>
              <CardDescription>{event.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-accent font-medium mb-4">
                {event.registrations} Registrations
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                <Button size="sm" variant="destructive" className="flex-1">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Event Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <Input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <select
              className="w-full border rounded-md p-2"
              value={newEvent.status}
              onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
            >
              <option value="Planning">Planning</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageEvents;
