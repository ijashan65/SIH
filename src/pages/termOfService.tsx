import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Terms of Service
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6">
          Welcome to <span className="font-semibold">[Your College Alumni Portal]</span>. By using our platform, you agree to these Terms of Service. 
          Please read them carefully to understand your rights and obligations.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Use of Our Platform</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>You must be a verified student or alumni to access certain features.</li>
            <li>You agree to provide accurate and truthful information.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Prohibited Activities</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Harassment, bullying, or inappropriate behavior towards other users is strictly prohibited.</li>
            <li>Unauthorized access, hacking, or distribution of malware is forbidden.</li>
            <li>Using the platform for commercial purposes without prior approval is not allowed.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed">
            All content on the platform, including text, graphics, and logos, is owned by <span className="font-semibold">[Your College Alumni Portal]</span> or its licensors. 
            You may not reproduce, distribute, or use this content without permission.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            We are not liable for any direct or indirect damages arising from your use of the platform. 
            All information provided is "as-is" and should not be relied upon as professional advice.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update these Terms of Service occasionally. Updated terms will be posted on this page with the effective date.
          </p>
        </section>

        <p className="mt-8 text-gray-500 text-center">Effective Date: September 12, 2025</p>
      </div>
    </div>
  );
};

export default TermsOfService;
