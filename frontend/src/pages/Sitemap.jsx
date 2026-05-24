// frontend/src/pages/Sitemap.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sitemap = () => {
  const sections = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Doctors", path: "/doctors" },
        { name: "Services", path: "/services" },
        { name: "Contact", path: "/contact" },
        { name: "Login", path: "/login" }
      ]
    },
    {
      title: "Patient Services",
      links: [
        { name: "Book Appointment", path: "/appointment" },
        { name: "My Appointments", path: "/my-appointments" },
        { name: "My Profile", path: "/profile" },
        { name: "Health Packages", path: "/health-packages" },
        { name: "Video Consultation", path: "/services/video-consultation" },
        { name: "Lab Tests", path: "/services/diagnostics" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "FAQs", path: "/faqs" },
        { name: "Blog", path: "/blog" },
        { name: "Health Tips", path: "/health-tips" },
        { name: "Patient Stories", path: "/stories" },
        { name: "Testimonials", path: "/testimonials" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookie-policy" },
        { name: "Refund Policy", path: "/refund-policy" }
      ]
    },
    {
      title: "Corporate",
      links: [
        { name: "Careers", path: "/careers" },
        { name: "Partner with Us", path: "/partners" },
        { name: "Media Kit", path: "/media-kit" },
        { name: "Press Releases", path: "/press" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-emerald-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Sitemap</h1>
          <p className="text-xl text-gray-600">Navigate through all pages of AarogyaCare</p>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto mt-4"></div>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-teal-600 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-teal-400 rounded-full group-hover:scale-150 transition-transform"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Search Box */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Can't find what you're looking for?</h3>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pages..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;