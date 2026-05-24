// Footer.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Add this import

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
      // You can also send this email to your backend
      console.log('Subscribed email:', email);
    }
  };

  // Navigation handlers
  // eslint-disable-next-line no-unused-vars
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Scroll to top when navigating
  };
  const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  return (
    <footer className="relative bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-800 text-white mt-16 sm:mt-20">
      
      {/* Top Decorative Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff_1px,transparent_1px),linear-gradient(-45deg,#ffffff_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Newsletter Section */}
       <div className="hidden lg:block border-b border-teal-600/30 pb-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-emerald-500/20 rounded-full">
                  <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  Subscribe to Newsletter
                </h3>
              </div>
              <p className="text-teal-100 text-sm sm:text-base ml-14">
                Get latest health tips, offers and updates directly in your inbox.
              </p>
            </div>
            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-teal-900/50 border border-teal-600 text-white placeholder-teal-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Subscribe
                </button>
              </form>
              {isSubscribed && (
                <p className="text-emerald-300 text-sm mt-2 animate-fadeIn flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Successfully subscribed!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1 - Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 cursor-pointer group">
               <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-teal-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
                AarogyaCare
              </span>
            </Link>
            <p className="text-teal-100 text-sm mb-4 leading-relaxed">
              Your trusted partner in healthcare. We provide quality medical services with compassion, expertise, and advanced technology.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-teal-800/50 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-110 group">
                <svg className="w-4 h-4 text-teal-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-teal-800/50 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-110 group">
                <svg className="w-4 h-4 text-teal-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.68-11.83c0-.21-.005-.424-.015-.636A9.936 9.936 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-teal-800/50 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-110 group">
                <svg className="w-4 h-4 text-teal-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-teal-800/50 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-110 group">
                <svg className="w-4 h-4 text-teal-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links (Working Links) */}
         
<div className="sm:col-span-2">
  <div className="grid grid-cols-2 gap-8">

    {/* Quick Links */}
    <div>
      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full"></div>
        Quick Links
      </h4>
      <ul className="space-y-2">
        <li><Link to="/about" className="text-teal-100 hover:text-emerald-300">About AarogyaCare</Link></li>
        <li><Link to="/doctors" className="text-teal-100 hover:text-emerald-300">Our Expert Doctors</Link></li>
        <li><Link to="/services" className="text-teal-100 hover:text-emerald-300">Medical Specialities</Link></li>
        <li><Link to="/health-packages" className="text-teal-100 hover:text-emerald-300">Health Packages</Link></li>
        <li><Link to="/appointment" className="text-teal-100 hover:text-emerald-300">Book Appointment</Link></li>
        <li><Link to="/careers" className="text-teal-100 hover:text-emerald-300">Career Opportunities</Link></li>
      </ul>
    </div>

    {/* Our Services */}
    <div>
      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full"></div>
        Our Services
      </h4>
      <ul className="space-y-2">
        <li><Link to="/services/emergency" className="text-teal-100 hover:text-emerald-300">Emergency Care</Link></li>
        <li><Link to="/services/video-consultation" className="text-teal-100 hover:text-emerald-300">Video Consultation</Link></li>
        <li><Link to="/services/home-care" className="text-teal-100 hover:text-emerald-300">Home Care</Link></li>
        <li><Link to="/services/diagnostics" className="text-teal-100 hover:text-emerald-300">Diagnostics</Link></li>
        <li><Link to="/services/health-checkup" className="text-teal-100 hover:text-emerald-300">Health Checkups</Link></li>
        <li><Link to="/services/pharmacy" className="text-teal-100 hover:text-emerald-300">Pharmacy Delivery</Link></li>
      </ul>
    </div>

  </div>
</div>
          {/* Column 4 - Contact & Working Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full"></div>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-3 text-teal-100 group">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">123 Health Avenue, Healing Tower, New Delhi - 110001</span>
              </li>
              <li className="flex gap-3 text-teal-100 group">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">+91 1800 123 4567 (Toll Free)</span>
              </li>
              <li className="flex gap-3 text-teal-100 group">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">care@aarogyacare.com</span>
              </li>
              <li className="flex gap-3 text-teal-100 group">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">24/7 Emergency Helpline: <span className="text-emerald-400 font-bold">102</span></span>
              </li>
            </ul>

            {/* Working Hours */}
            <div className="mt-6 pt-4 border-t border-teal-600/30">
              <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Working Hours
              </h5>
              <div className="space-y-1 text-sm text-teal-100">
                <p>Monday - Friday: 9:00 AM - 9:00 PM</p>
                <p>Saturday: 10:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 2:00 PM</p>
                <p className="text-emerald-400 text-xs mt-2">🚨 Emergency Services: 24/7 Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Payment Methods */}
        <div className="border-t border-teal-600/30 mt-10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-teal-200 text-sm text-center sm:text-left">
              © {currentYear} AarogyaCare. All rights reserved. | Designed with ❤️ for better healthcare
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-teal-300 text-xs">Secure Payments:</span>
              <div className="flex gap-2">
                <div className="bg-teal-800/50 hover:bg-emerald-500/20 rounded px-2 py-1 text-xs text-teal-100 transition-all">VISA</div>
                <div className="bg-teal-800/50 hover:bg-emerald-500/20 rounded px-2 py-1 text-xs text-teal-100 transition-all">MasterCard</div>
                <div className="bg-teal-800/50 hover:bg-emerald-500/20 rounded px-2 py-1 text-xs text-teal-100 transition-all">UPI</div>
                <div className="bg-teal-800/50 hover:bg-emerald-500/20 rounded px-2 py-1 text-xs text-teal-100 transition-all">PayTM</div>
              </div>
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center sm:justify-between gap-4 mt-4 pt-4 border-t border-teal-600/20">
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-teal-300 hover:text-emerald-300 text-xs transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-teal-300 hover:text-emerald-300 text-xs transition-colors">Terms of Service</Link>
              <Link to="/cookie-policy" className="text-teal-300 hover:text-emerald-300 text-xs transition-colors">Cookie Policy</Link>
            </div>
            <div className="flex gap-6">
              <Link to="/sitemap" className="text-teal-300 hover:text-emerald-300 text-xs transition-colors">Sitemap</Link>
              <Link to="/faqs" className="text-teal-300 hover:text-emerald-300 text-xs transition-colors">FAQs</Link>
              <Link to="/feedback" className="text-teal-300 hover:text-emerald-300 text-xs transition-colors">Feedback</Link>
            </div>
            <button
  onClick={scrollToTop}
  className="fixed bottom-6 right-6 bg-teal-700 hover:bg-teal-800 text-white p-3 rounded-full shadow-lg transition-all duration-300"
>
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 15l7-7 7 7"
    />
  </svg>
</button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style >{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;