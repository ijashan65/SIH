import React, { useState } from "react";
import { Heart, Users, Target } from "lucide-react"; // icons

export default function DonationPage() {
  const [donor, setDonor] = useState({ name: "", email: "", amount: "", message: "" });
  const [donations, setDonations] = useState(2500);
  const [goal] = useState(10000);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonor({ ...donor, [name]: value });
  };

  const handleDonation = (e) => {
    e.preventDefault();
    if (!donor.name || !donor.email || !donor.amount) {
      alert("Please fill all required fields!");
      return;
    }
    setDonations(donations + parseInt(donor.amount));
    setSubmitted(true);
    setDonor({ name: "", email: "", amount: "", message: "" });
  };

  const progressPercent = Math.min((donations / goal) * 100, 100);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {!submitted ? (
          <div style={styles.grid}>
            {/* Left Section */}
            <div style={styles.left}>
              <h2 style={styles.heading}>Support Alumni Initiatives ❤️</h2>
              <p style={styles.subtext}>
                Your donations fund scholarships, mentorship programs, and alumni events.
              </p>

              {/* Progress */}
              <div style={styles.progressWrapper}>
                <div style={styles.progressTrack}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${progressPercent}%`,
                    }}
                  ></div>
                </div>
                <p style={styles.progressText}>
                  <b>${donations.toLocaleString()}</b> raised of ₹{goal.toLocaleString()} goal
                </p>
              </div>

              {/* Stats */}
              <div style={styles.stats}>
                <div style={styles.statCard}>
                  <Heart size={22} color="#dc2626" />
                  <p><b>${donations}</b><br />Donated</p>
                </div>
                <div style={styles.statCard}>
                  <Target size={22} color="#2563eb" />
                  <p><b>${goal}</b><br />Goal</p>
                </div>
                <div style={styles.statCard}>
                  <Users size={22} color="#16a34a" />
                  <p><b>145+</b><br />Supporters</p>
                </div>
              </div>

              {/* Tiered Options */}
              <div style={styles.tierWrapper}>
                <div style={{ ...styles.tierCard, borderLeft: "4px solid gold" }}>
                  <h4>🥇 Gold Supporter</h4>
                  <p>₹20000+ contribution</p>
                </div>
                <div style={{ ...styles.tierCard, borderLeft: "4px solid silver" }}>
                  <h4>🥈 Silver Supporter</h4>
                  <p>₹10000+ contribution</p>
                </div>
                <div style={{ ...styles.tierCard, borderLeft: "4px solid #cd7f32" }}>
                  <h4>🥉 Bronze Supporter</h4>
                  <p>₹500+ contribution</p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div style={styles.right}>
              <h3 style={styles.formHeading}>Make a Donation</h3>
              <form style={styles.form} onSubmit={handleDonation}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={donor.name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={donor.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter Amount ($)"
                  value={donor.amount}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message (optional)"
                  value={donor.message}
                  onChange={handleChange}
                  style={styles.textarea}
                ></textarea>

                <button type="submit" style={styles.donateBtn}>
                  💙 Donate Now
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div style={styles.thankYou}>
            <h3>🎉 Thank You for Your Support!</h3>
            <p>Your contribution makes a big difference in alumni initiatives.</p>
            <button onClick={() => setSubmitted(false)} style={styles.donateBtn}>
              Make Another Donation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  container: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "1100px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
  },
  left: {
    borderRight: "1px solid #e5e7eb",
    paddingRight: "20px",
  },
  right: {
    paddingLeft: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#111827",
  },
  subtext: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "20px",
  },
  progressWrapper: {
    marginBottom: "20px",
  },
  progressTrack: {
    height: "16px",
    background: "#e5e7eb",
    borderRadius: "8px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(to right, #2563eb, #3b82f6)",
  },
  progressText: {
    fontSize: "13px",
    marginTop: "6px",
    color: "#374151",
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  statCard: {
    background: "#f3f4f6",
    padding: "12px 16px",
    borderRadius: "8px",
    textAlign: "center",
    flex: "1",
    margin: "0 5px",
    fontSize: "13px",
    fontWeight: "500",
  },
  tierWrapper: {
    display: "grid",
    gap: "12px",
  },
  tierCard: {
    background: "#f9fafb",
    padding: "12px 16px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  formHeading: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#111827",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  textarea: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    minHeight: "80px",
  },
  donateBtn: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "15px",
    transition: "0.3s",
  },
  thankYou: {
    textAlign: "center",
  },
};
