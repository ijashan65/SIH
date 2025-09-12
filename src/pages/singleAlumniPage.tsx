import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, MapPin, Building, GraduationCap, Award, ArrowLeft, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import { mockAlumni } from "./AlumniDirectory";

const SingleAlumniProfile = () => {
  const { id } = useParams();
  const alumni = mockAlumni.find((a) => a.id === parseInt(id!));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sentRequests, setSentRequests] = useState<number[]>([]);

  // Load sent requests from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sentRequests");
    if (saved) setSentRequests(JSON.parse(saved));
  }, []);

  // Save sent requests to localStorage
  useEffect(() => {
    localStorage.setItem("sentRequests", JSON.stringify(sentRequests));
  }, [sentRequests]);

  if (!alumni) return <p className="p-8">Alumni not found</p>;

  const earnedBadges = [
    { name: "Donor", icon: Award, color: "bg-yellow-100 text-yellow-700" },
    { name: "Mentor", icon: GraduationCap, color: "bg-blue-100 text-blue-700" },
    { name: "Event Attendee", icon: Building, color: "bg-green-100 text-green-700" },
  ];

  const handleConnect = () => {
    if (!sentRequests.includes(alumni.id)) {
      setSentRequests([...sentRequests, alumni.id]);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const isAlreadySent = sentRequests.includes(alumni.id);

  return (
    <div className="min-h-screen bg-background px-6 py-10 max-w-5xl mx-auto">
      <Navigation />
      <Link to="/directory">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Directory
        </Button>
      </Link>

      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-start space-x-6">
            <img
              src={alumni.profileImage}
              alt={alumni.name}
              className="w-28 h-28 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold">{alumni.name}</h1>
              <p className="text-muted-foreground">{alumni.position} @ {alumni.company}</p>
              <div className="flex items-center space-x-3 mt-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> <span>{alumni.location}</span>
                <GraduationCap className="h-4 w-4" /> <span>{alumni.program}, Class of {alumni.batch}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {alumni.skills.map((skill, i) => (
                <Badge key={i} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Earned Badges */}
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Achievements & Badges</h2>
            <div className="flex flex-wrap gap-3">
              {earnedBadges.map((badge, i) => (
                <div key={i} className={`px-3 py-2 rounded-lg flex items-center space-x-2 ${badge.color}`}>
                  <badge.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mt-8">
            <Button onClick={handleConnect} disabled={isAlreadySent} className={isAlreadySent ? "opacity-50 cursor-not-allowed" : ""}>
              <Mail className="h-4 w-4 mr-2" /> {isAlreadySent ? "Request Sent" : "Connect"}
            </Button>
            <Button variant="outline" onClick={() => window.open(`https://www.linkedin.com/in/${alumni.email.split('@')[0]}`, "_blank")}>
              <Linkedin className="h-4 w-4 mr-2" /> View LinkedIn
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 p-6 shadow-lg">
            <CardContent className="flex flex-col items-center space-y-4 text-center">
              <Check className="h-8 w-8 text-green-600" />
              <h2 className="text-xl font-bold">{isAlreadySent ? "Request Already Sent" : "Connection Request Sent!"}</h2>
              <p className="text-muted-foreground">
                {isAlreadySent
                  ? "You have already sent a request to this alumni."
                  : "Your request has been sent. They will respond once they accept it."}
              </p>
              <Button onClick={closeModal} className="mt-2 gradient-primary text-white w-full">
                OK
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SingleAlumniProfile;
