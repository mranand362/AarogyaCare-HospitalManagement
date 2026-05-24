// frontend/src/pages/CookiePolicy.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    performance: false,
    functional: false,
    targeting: false,
  });

  // 🔥 Load saved preferences
  useEffect(() => {
    const saved = localStorage.getItem("cookieConsent");

    if (!saved) {
      setShowBanner(true);
    } else {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  // ✅ Accept All
  const acceptAll = () => {
    const consent = {
      essential: true,
      performance: true,
      functional: true,
      targeting: true,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setPreferences(consent);
    setShowBanner(false);
  };

  // ❌ Reject Non-Essential
  const rejectNonEssential = () => {
    const consent = {
      essential: true,
      performance: false,
      functional: false,
      targeting: false,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setPreferences(consent);
    setShowBanner(false);
  };

  // 🎯 Toggle preferences
  const togglePreference = (key) => {
    const updated = { ...preferences, [key]: !preferences[key] };
    localStorage.setItem("cookieConsent", JSON.stringify(updated));
    setPreferences(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-emerald-50 py-16">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Cookie Policy</h1>
          <p className="text-gray-600">Last updated: January 1, 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">

          <section>
            <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
            <p className="text-gray-600">
              Cookies are small text files stored on your device to improve your experience.
            </p>
          </section>

          {/* Preferences UI */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Manage Preferences</h2>

            {Object.keys(preferences).map((key) => (
              <div key={key} className="flex justify-between items-center border p-4 rounded mb-2">
                <span className="capitalize">{key} Cookies</span>

                <input
                  type="checkbox"
                  checked={preferences[key]}
                  disabled={key === "essential"}
                  onChange={() => togglePreference(key)}
                />
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-gray-600">
              Contact us at privacy@aarogyacare.com
            </p>
          </section>

        </div>
      </div>

      {/* 🍪 COOKIE BANNER */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

            <p className="text-sm">
              We use cookies to improve your experience.
            </p>

            <div className="flex gap-3">
              <button
                onClick={acceptAll}
                className="bg-teal-600 px-4 py-2 rounded"
              >
                Accept All
              </button>

              <button
                onClick={rejectNonEssential}
                className="bg-gray-700 px-4 py-2 rounded"
              >
                Reject
              </button>

              <Link
                to="/cookie-policy"
                className="border px-4 py-2 rounded"
              >
                Learn More
              </Link>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default CookiePolicy;