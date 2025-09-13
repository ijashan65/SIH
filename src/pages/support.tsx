import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "react-hot-toast";

const Donation = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [donorLevel, setDonorLevel] = useState("");

  const handleDonate = () => {
    const amount = parseFloat(donationAmount);
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid donation amount");
      setDonorLevel("");
      return;
    }

    // Determine donor level
    let level = "";
    if (amount >= 100000) level = "Gold";
    else if (amount >= 5000) level = "Silver";
    else if (amount >= 2000) level = "Bronze";
    else level = "Supporter";

    setDonorLevel(level);
    toast.success(`Thank you for donating ₹${amount}! You earned the ${level} badge!`);
    setDonationAmount("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Toaster position="top-right" />

      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-primary text-center">Support Our Alumni Network</h1>
        <p className="text-muted-foreground text-center">
          Your donation helps support alumni initiatives, networking events, and community programs.
        </p>

        <div className="flex flex-col gap-4">
          <Input
            type="number"
            placeholder="Enter donation amount in ₹"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />
          <Button className="w-full py-3 text-lg font-medium" onClick={handleDonate}>
            Donate Now
          </Button>
        </div>

        {/* Donor Badge */}
        {donorLevel && (
          <div className="text-center mt-6">
            <div className={`inline-block px-6 py-3 rounded-full text-white font-semibold ${
              donorLevel === "Gold" ? "bg-yellow-400" :
              donorLevel === "Silver" ? "bg-gray-400" :
              donorLevel === "Bronze" ? "bg-orange-500" :
              "bg-green-500"
            }`}>
              {donorLevel} Donor
            </div>
            <p className="text-muted-foreground mt-2">
              {donorLevel === "Supporter" 
                ? "Thank you for supporting our alumni network!" 
                : `Congratulations! You are a ${donorLevel} donor!`}
            </p>
          </div>
        )}

        {/* Donation Milestones Info */}
        <div className="mt-8 p-6 border rounded-lg bg-card text-card-foreground space-y-3">
          <h2 className="text-xl font-semibold">Donation Milestones</h2>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>₹2,000+ → Bronze Donor</li>
            <li>₹5,000+ → Silver Donor</li>
            <li>₹1,00,000+ → Gold Donor</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Donation;
