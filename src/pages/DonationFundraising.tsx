import { useState } from "react";
import { Link } from "react-router-dom"; // <--- import Link
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "react-hot-toast";

const DonationFundraising = () => {
  const [fundraisingGoal, setFundraisingGoal] = useState("");

  const handleFundraise = () => {
    if (!fundraisingGoal || parseFloat(fundraisingGoal) <= 0) {
      toast.error("Please enter a valid fundraising goal");
      return;
    }
    toast.success(`Your fundraising goal of $${fundraisingGoal} has been created!`);
    setFundraisingGoal("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Support Our Alumni Network</h1>
        <p className="text-muted-foreground text-center mb-8">
          You can either donate directly or start your own fundraising campaign to help the alumni community.
        </p>

        <div className="flex flex-col sm:flex-row gap-8 w-full justify-center">
          {/* Navigate to Donation Page */}
          <Link to="/support" className="w-full sm:w-60">
            <Button className="w-full py-6 text-lg">Donate</Button>
          </Link>

          {/* Fundraise Button */}
          <Link to="/StartupFunding" className="w-full sm:w-60">
              <Button className="w-full sm:w-60 py-6 text-lg" variant="outline">Start Fundraising</Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationFundraising;
