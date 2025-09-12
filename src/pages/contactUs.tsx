import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send formData to your backend API
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Contact Us
        </h1>

        <p className="text-gray-700 mb-6 text-center">
          Have questions or suggestions? We'd love to hear from you. Fill out the form below and we’ll get back to you shortly.
        </p>

        {submitted && (
          <div className="mb-6 text-green-600 font-semibold text-center">
            Thank you! Your message has been submitted.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-10 text-center text-gray-500">
          <p>Email: <span className="font-medium text-gray-700">ijashan65@gmail.com</span></p>
          <p>Phone: <span className="font-medium text-gray-700">+91 7707867580</span></p>
          <p>Address: <span className="font-medium text-gray-700">cgc College , landran, India</span></p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
