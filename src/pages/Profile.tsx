import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  Edit,
  Save,
  X,
  Upload,
} from "lucide-react";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user, profile, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    phone: profile?.phone || "",
    bio: profile?.bio || "",
    current_company: profile?.current_company || "",
    current_position: profile?.current_position || "",
    location: profile?.location || "",
    linkedin_url: profile?.linkedin_url || "",
    website_url: profile?.website_url || "",
    avatar_url: profile?.avatar_url || "",
  });

  const [preview, setPreview] = useState(formData.avatar_url || "");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      const { error } = await updateProfile(formData);
      if (error) throw error;
      setIsEditing(false);
      toast.success("Profile updated successfully 🎉");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Try again.");
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      phone: profile?.phone || "",
      bio: profile?.bio || "",
      current_company: profile?.current_company || "",
      current_position: profile?.current_position || "",
      location: profile?.location || "",
      linkedin_url: profile?.linkedin_url || "",
      website_url: profile?.website_url || "",
      avatar_url: profile?.avatar_url || "",
    });
    setPreview(profile?.avatar_url || "");
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFormData((prev) => ({ ...prev, avatar_url: url }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">My Profile</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage your account information and visibility
            </p>
          </div>
          {!isEditing ? (
            <Button className="w-full sm:w-auto" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-primary-foreground" />
                    </div>
                  )}
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer">
                      <Upload className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>
                <CardTitle className="text-lg sm:text-xl">
                  {profile?.first_name} {profile?.last_name}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {profile?.current_position && profile?.current_company ? (
                    <>{profile.current_position} at {profile.current_company}</>
                  ) : (
                    <span className="text-muted-foreground">No position added</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{user?.email}</span>
                </div>
                {profile?.phone && (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  <span>
                    {profile?.program || "Program N/A"} • Class of{" "}
                    {profile?.batch_year || "N/A"}
                  </span>
                </div>
                {profile?.is_verified && (
                  <div className="flex justify-center">
                    <Badge variant="default" className="flex items-center space-x-1">
                      <Award className="h-3 w-3" />
                      <span>Verified Alumni</span>
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Personal Information</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Update your basic profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, last_name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Professional Information</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Share your career details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label htmlFor="current_company">Company</Label>
                  <Input
                    id="current_company"
                    value={formData.current_company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, current_company: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="current_position">Position</Label>
                  <Input
                    id="current_position"
                    value={formData.current_position}
                    onChange={(e) => setFormData((prev) => ({ ...prev, current_position: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin_url">LinkedIn</Label>
                  <Input
                    id="linkedin_url"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, linkedin_url: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="website_url">Website</Label>
                  <Input
                    id="website_url"
                    placeholder="https://yourwebsite.com"
                    value={formData.website_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, website_url: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Skills & Expertise</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Showcase your skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                {profile?.skills && profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-6 text-sm sm:text-base">
                    No skills added yet. Contact admin to update your skills.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
