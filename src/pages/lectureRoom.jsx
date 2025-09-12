import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Mic } from "lucide-react";

const LectureRoom = () => {
  const [lectureMode, setLectureMode] = useState("video"); // video or voice
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDescription, setLectureDescription] = useState("");
  const [started, setStarted] = useState(false);

  const handleStartLecture = () => {
    if (!lectureTitle) {
      alert("Please enter a lecture title");
      return;
    }
    setStarted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Start a Lecture</h1>

      <Card className="w-full max-w-3xl shadow-lg rounded-2xl border-0">
        <CardContent className="p-8 space-y-6">
          {!started ? (
            <>
              {/* Lecture Details */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Lecture Title</label>
                <input
                  type="text"
                  value={lectureTitle}
                  onChange={(e) => setLectureTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter lecture title"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Description</label>
                <textarea
                  value={lectureDescription}
                  onChange={(e) => setLectureDescription(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Brief description"
                />
              </div>

              {/* Mode Selection */}
              <div className="flex items-center space-x-4">
                <Button
                  variant={lectureMode === "video" ? "default" : "outline"}
                  onClick={() => setLectureMode("video")}
                  className="flex items-center space-x-2"
                >
                  <Video className="h-4 w-4" /> Video
                </Button>
                <Button
                  variant={lectureMode === "voice" ? "default" : "outline"}
                  onClick={() => setLectureMode("voice")}
                  className="flex items-center space-x-2"
                >
                  <Mic className="h-4 w-4" /> Voice
                </Button>
              </div>

              <Button
                onClick={handleStartLecture}
                className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300"
              >
                Start Lecture
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Lecture in Progress</h2>
              <p className="text-gray-700">
                Mode: <span className="font-medium">{lectureMode.toUpperCase()}</span>
              </p>
              <p className="text-gray-700">
                Title: <span className="font-medium">{lectureTitle}</span>
              </p>
              <p className="text-gray-700">
                Description: <span className="font-medium">{lectureDescription || "N/A"}</span>
              </p>

              <div className="flex justify-center space-x-4 mt-6">
                <Button
                  className="bg-red-600 text-white hover:bg-red-700 transition duration-300"
                  onClick={() => setStarted(false)}
                >
                  End Lecture
                </Button>
              </div>

              {/* Placeholder for Video / Voice Call */}
              <div className="mt-8 w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                {lectureMode === "video" ? "🎥 Video Call Placeholder" : "🎤 Voice Call Placeholder"}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LectureRoom;
