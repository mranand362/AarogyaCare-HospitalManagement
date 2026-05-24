// frontend/src/pages/Terms.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-emerald-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: January 1, 2024</p>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto mt-4"></div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using AarogyaCare's website, mobile application, and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Medical Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              The information provided through our services is for general informational purposes only and is not a substitute for professional medical advice. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-yellow-800 text-sm">
                ⚠️ Emergency Warning: If you think you may have a medical emergency, call your doctor or emergency services immediately (911 or 102).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. User Accounts</h2>
            <p className="text-gray-600 mb-4">To access certain features, you must create an account. You agree to:</p>
            <ul className="space-y-2 text-gray-600 ml-6">
              <li>• Provide accurate and complete information</li>
              <li>• Maintain the security of your password</li>
              <li>• Accept responsibility for all activities under your account</li>
              <li>• Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Appointment Booking & Cancellation</h2>
            <p className="text-gray-600 mb-4">
              Our appointment booking system allows you to schedule consultations with healthcare providers. Please note:
            </p>
            <ul className="space-y-2 text-gray-600 ml-6">
              <li>• Appointments must be cancelled at least 2 hours in advance</li>
              <li>• Late cancellations may incur a fee</li>
              <li>• No-shows will be recorded and may affect future bookings</li>
              <li>• Emergency appointments take priority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Payments & Refunds</h2>
            <p className="text-gray-600 mb-4">
              All payments for services are processed securely. Refund policy:
            </p>
            <ul className="space-y-2 text-gray-600 ml-6">
              <li>• Full refund for cancellations made 24 hours before appointment</li>
              <li>• 50% refund for cancellations made 2-24 hours before</li>
              <li>• No refund for no-shows or last-minute cancellations</li>
              <li>• Refunds processed within 7-10 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Telemedicine Guidelines</h2>
            <p className="text-gray-600 mb-4">
              For video consultations, you agree to:
            </p>
            <ul className="space-y-2 text-gray-600 ml-6">
              <li>• Be in a private, well-lit environment</li>
              <li>• Have a stable internet connection</li>
              <li>• Provide accurate medical history</li>
              <li>• Not record the consultation without consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Prohibited Activities</h2>
            <p className="text-gray-600 mb-4">You agree not to:</p>
            <ul className="space-y-2 text-gray-600 ml-6">
              <li>• Use the service for any illegal purpose</li>
              <li>• Harass, abuse, or harm others</li>
              <li>• Impersonate any person or entity</li>
              <li>• Interfere with the security of the service</li>
              <li>• Attempt to gain unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600">
              AarogyaCare shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. Our total liability shall not exceed the amount paid by you for the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. We will notify users of material changes via email or through our platform. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Email: legal@aarogyacare.com</li>
              <li>• Phone: +91 1800 123 4567</li>
              <li>• Address: 123 Health Avenue, New Delhi - 110001</li>
            </ul>
          </section>

          <div className="bg-teal-50 rounded-lg p-6 text-center">
            <p className="text-teal-800">
              By using AarogyaCare, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
            <button className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">
              I Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;