import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users } from "lucide-react";
import { Link } from "react-router-dom";

const EventsMeetup = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
        Events & Meetups
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Events Button */}
        <Card className="shadow-lg rounded-2xl border-0 hover:shadow-xl transition transform hover:-translate-y-1">
          <CardContent className="flex flex-col items-center justify-center p-10 space-y-6">
            <CalendarDays className="h-12 w-12 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Events</h2>
            <p className="text-gray-600 text-center">
              Explore upcoming alumni events, workshops, and conferences.
            </p>
            <Link to="/events" className="w-full">
              <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                Go to Events
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Meetups Button */}
        <Card className="shadow-lg rounded-2xl border-0 hover:shadow-xl transition transform hover:-translate-y-1">
          <CardContent className="flex flex-col items-center justify-center p-10 space-y-6">
            <Users className="h-12 w-12 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Meetups</h2>
            <p className="text-gray-600 text-center">
              Connect with your batchmates and join alumni meetups.
            </p>
            <Link to="/meetup" className="w-full">
              <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                Go to Meetups
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventsMeetup;
