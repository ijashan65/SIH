import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import enj1 from "../assets/enj1.jpeg";
import enj2 from "../assets/enj2.jpeg";
import enj3 from "../assets/enj3.jpeg";
import enj4 from "../assets/enj4.jpeg";

const images = [enj1, enj2, enj3, enj4];
import { 
  Calendar, 
  MapPin, 
  Users, 
  Video,
  DollarSign,
  UserCheck,
  Plus,
  Search
} from "lucide-react";
import { eventsApi } from "@/lib/api";
import { toast } from "sonner";

// Calendar lib
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
    is_virtual: false,
    meeting_link: "",
    max_attendees: "",
    registration_fee: ""
  });

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, filterType]);

  const loadEvents = async () => {
    try {
      const { data, error } = await eventsApi.getEvents();
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error loading events:", error);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = [...events];
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterType === "upcoming") {
      filtered = filtered.filter(event => new Date(event.event_date) > new Date());
    } else if (filterType === "virtual") {
      filtered = filtered.filter(event => event.is_virtual);
    } else if (filterType === "in-person") {
      filtered = filtered.filter(event => !event.is_virtual);
    }
    setFilteredEvents(filtered);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to create events");
      return;
    }

    try {
      const eventData = {
        ...newEvent,
        created_by: user.id,
        max_attendees: newEvent.max_attendees ? parseInt(newEvent.max_attendees) : null,
        registration_fee: newEvent.registration_fee ? parseFloat(newEvent.registration_fee) : 0
      };

      const { error } = await eventsApi.createEvent(eventData);
      if (error) throw error;

      toast.success("Event created successfully!");
      setCreateDialogOpen(false);
      setNewEvent({
        title: "",
        description: "",
        event_date: "",
        location: "",
        is_virtual: false,
        meeting_link: "",
        max_attendees: "",
        registration_fee: ""
      });
      loadEvents();
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event");
    }
  };

  const handleRegisterForEvent = async (eventId: string) => {
    if (!user) {
      toast.error("Please sign in to register for events");
      return;
    }
    try {
      const { error } = await eventsApi.registerForEvent(eventId, user.id);
      if (error) throw error;
      toast.success("Successfully registered for event!");
      loadEvents();
    } catch (error) {
      console.error("Error registering for event:", error);
      toast.error("Failed to register for event");
    }
  };

  const canCreateEvents = user && (user.user_metadata?.role === "admin" || user.user_metadata?.role === "alumni");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Events & Networking</h1>
            <p className="text-muted-foreground">Connect, learn, and grow with the alumni community</p>
          </div>
          {canCreateEvents && (
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>Organize a networking event, workshop, or social gathering.</DialogDescription>
                </DialogHeader>
                {/* Create Event Form */}
                <form onSubmit={handleCreateEvent} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input id="title" value={newEvent.title} onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))} required />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" value={newEvent.description} onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))} rows={3} required />
                    </div>
                    <div>
                      <Label htmlFor="event_date">Date & Time</Label>
                      <Input id="event_date" type="datetime-local" value={newEvent.event_date} onChange={(e) => setNewEvent(prev => ({ ...prev, event_date: e.target.value }))} required />
                    </div>
                    <div>
                      <Label>Event Type</Label>
                      <Select value={newEvent.is_virtual ? "virtual" : "in-person"} onValueChange={(value) => setNewEvent(prev => ({ ...prev, is_virtual: value === "virtual" }))}>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-person">In-Person</SelectItem>
                          <SelectItem value="virtual">Virtual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">{newEvent.is_virtual ? "Meeting Link" : "Location"}</Label>
                      <Input id="location" value={newEvent.is_virtual ? newEvent.meeting_link : newEvent.location} onChange={(e) => setNewEvent(prev => newEvent.is_virtual ? ({ ...prev, meeting_link: e.target.value }) : ({ ...prev, location: e.target.value }))} placeholder={newEvent.is_virtual ? "https://zoom.us/..." : "Event venue"} required />
                    </div>
                    <div>
                      <Label htmlFor="max_attendees">Max Attendees</Label>
                      <Input id="max_attendees" type="number" value={newEvent.max_attendees} onChange={(e) => setNewEvent(prev => ({ ...prev, max_attendees: e.target.value }))} placeholder="Leave empty for unlimited" />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">Create Event</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Page Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Events */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Event List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading events...</p>
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                        <Badge variant={event.is_virtual ? "secondary" : "outline"}>
                          {event.is_virtual ? (
                            <><Video className="h-3 w-3 mr-1" />Virtual</>
                          ) : (
                            <><MapPin className="h-3 w-3 mr-1" />In-Person</>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(event.event_date).toLocaleString()}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          {event.is_virtual ? (
                            <><Video className="h-4 w-4 mr-2" />Virtual Event</>
                          ) : (
                            <><MapPin className="h-4 w-4 mr-2" />{event.location}</>
                          )}
                        </div>
                        {event.max_attendees && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-2" />Max {event.max_attendees} attendees
                          </div>
                        )}
                        {event.registration_fee > 0 && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <DollarSign className="h-4 w-4 mr-2" />${event.registration_fee}
                          </div>
                        )}
                      </div>
                      <div className="pt-4 border-t">
                        <Button onClick={() => handleRegisterForEvent(event.id)} disabled={!user} className="w-full">
                          <UserCheck className="h-4 w-4 mr-2" />
                          {user ? "Register Now" : "Sign In to Register"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">No Events Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || filterType !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "No events have been created yet"}
                  </p>
                  {canCreateEvents && (
                    <Button onClick={() => setCreateDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create the First Event
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right: Calendar + Memories */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  events={events.map(ev => ({
                    title: ev.title,
                    date: ev.event_date
                  }))}
                  height="auto"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Memories</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="grid grid-cols-2 gap-3">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`memory-${i}`}
          className="rounded-lg shadow-md hover:scale-105 transition-transform"
        />
      ))}
    </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
