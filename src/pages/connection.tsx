import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Check } from "lucide-react";

const ConnectModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Button onClick={handleConnect} className="gradient-primary text-white px-6 py-2">
        <Mail className="h-4 w-4 mr-2" /> Connect to Alumni
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 p-6 shadow-lg">
            <CardContent className="flex flex-col items-center space-y-4 text-center">
              <Check className="h-8 w-8 text-green-600" />
              <h2 className="text-xl font-bold">Connection Request Sent!</h2>
              <p className="text-muted-foreground">
                Your request has been sent to the alumni. They will respond once they accept it.
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

export default ConnectModal;
