import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6">
          At <span className="font-semibold">AlumniHub</span>, 
          your privacy is our top priority. We are committed to protecting your personal information. 
          This Privacy Policy explains how we collect, use, and safeguard your data.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Personal details you provide (name, email, contact info).</li>
            <li>Information about your education, work experience, and skills.</li>
            <li>Data related to your activity on our platform.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>To connect alumni and students for networking and mentorship.</li>
            <li>To improve the platform and user experience.</li>
            <li>To send updates and notifications with your consent.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Data Sharing & Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We never sell your personal information. We may share data only as required by law. 
            We use industry-standard security measures to protect your data.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Rights</h2>
          <p className="text-gray-700 leading-relaxed">
            You can access, update, or request deletion of your personal data at any time. 
            Contact us at <span className="font-semibold">[contact email]</span> for any requests.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Policy Updates</h2>
          <p className="text-gray-700 leading-relaxed">
            This Privacy Policy may be updated occasionally. All changes will be posted here with the effective date.
          </p>
        </section>

        <p className="mt-8 text-gray-500 text-center">Effective Date: September 12, 2025</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
