// Banner.jsx
import React, { useState, useEffect } from 'react';
import doctorImage from '../assets/appointment_img.png';

const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide image on mobile (below 640px)
  const showImage = windowWidth >= 640;

  return (
    <div className="relative max-w-6xl mx-auto mt-0 sm:mt-6 md:mt-0 lg:mt-10 px-3 sm:px-4">
      {/* Main Banner Card */}
      <div className="bg-gradient-to-br from-teal-600 via-teal-500 to-teal-600 rounded-xl sm:rounded-2xl shadow-xl overflow-visible">
        <div className="relative">

          {/* Background Animated Glow */}
          <div className="absolute inset-0 opacity-10 rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="absolute -top-15 -right-20 w-40 h-40 sm:w-60 sm:h-60 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-white rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          </div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:20px_20px] rounded-xl sm:rounded-2xl"></div>

          {/* Content Section - Responsive padding */}
          <div className={`relative z-10 p-5 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 ${
            showImage ? 'pr-24 sm:pr-28 md:pr-36 lg:pr-44' : 'pr-5'
          }`}>
            
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-2.5 sm:px-3 py-1 mb-3 sm:mb-4 animate-fadeIn">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
              </span>
              <span className="text-white text-[10px] sm:text-xs font-semibold tracking-wider">
                LIMITED TIME OFFER
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 leading-tight animate-slideInLeft">
              Book Appointment
            </h1>

            <p className="text-teal-100 text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 animate-slideInLeft animation-delay-200">
              With 100+ Trusted Doctors
            </p>

            {/* Offer Badge with Animation */}
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg mb-3 sm:mb-4 shadow-lg animate-slideInLeft animation-delay-400">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Save 40% Today</span>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-1.5 sm:gap-2 mb-4 sm:mb-5 animate-slideInLeft animation-delay-600">
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
                <svg className="w-3 h-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white text-[10px] sm:text-xs font-medium">Free Consult</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
                <svg className="w-3 h-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white text-[10px] sm:text-xs font-medium">24/7 Available</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
                <svg className="w-3 h-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-white text-[10px] sm:text-xs font-medium">Video Call</span>
              </div>
            </div>

            {/* CTA Button with Icon */}
            <button
              className="group bg-white text-teal-600 font-bold py-1.5 sm:py-2 px-4 sm:px-5 md:px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 animate-fadeIn animation-delay-800"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span className="text-xs sm:text-sm font-semibold">Create Account</span>
              <svg 
                className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 animate-fadeIn animation-delay-1000">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-teal-100 text-[9px] sm:text-xs">No booking fees</span>
              </div>
              <div className="w-px h-3 bg-white/30"></div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-teal-100 text-[9px] sm:text-xs">Free cancellation</span>
              </div>
              <div className="w-px h-3 bg-white/30"></div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-teal-100 text-[9px] sm:text-xs">Secure payments</span>
              </div>
            </div>
          </div>

          {/* Top Overflow Image - Hidden on mobile (below 640px) */}
          {showImage && (
            <div
              className={`
                absolute 
                right-0 
                -top-8 sm:-top-5 md:-top-5 lg:-top-20
                w-[35%] sm:w-[35%] md:w-[25%] lg:w-[28%]
                h-[115%] sm:h-[130%]
                pointer-events-none
                animate-slideInRight
              `}
            >
              <div className="relative w-full h-full group">

                {/* Animated Glow behind image */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                
                {/* Rotating ring effect */}
                <div className="absolute -inset-1 sm:-inset-2 rounded-full border border-white/20 animate-spin-slow"></div>

                {/* Doctor Image */}
                <img
                  src={doctorImage}
                  alt="Doctor"
                  className="w-full h-full object-contain scale-110 sm:scale-125 drop-shadow-2xl transform transition-all duration-500 group-hover:scale-115 sm:group-hover:scale-130"
                />

                {/* Rating Badge - Professional */}
                <div className="absolute -left-4 sm:-left-5 top-1/3 bg-white rounded-xl shadow-lg p-1.5 sm:p-2 animate-float hidden sm:block">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-900">4.9 Rating</span>
                    <span className="text-[8px] text-gray-500">5k+ reviews</span>
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="absolute -right-3 sm:-right-4 bottom-16 sm:bottom-20 md:bottom-24 bg-white rounded-xl shadow-lg p-1.5 sm:p-2 animate-float animation-delay-1000 hidden md:block">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="bg-teal-100 rounded-lg p-1 sm:p-1.5">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[10px] text-gray-500">Experience</p>
                      <p className="text-[10px] sm:text-xs font-bold text-gray-900">15+ Years</p>
                    </div>
                  </div>
                </div>

                {/* Live Status Badge */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
                  <span className="relative flex h-1 w-1 sm:h-1.5 sm:w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 sm:h-1.5 sm:w-1.5 bg-white"></span>
                  </span>
                  <span>LIVE NOW</span>
                </div>

                {/* Patient Count Badge */}
                <div className="absolute -top-2 -right-2 bg-teal-500 rounded-full px-1.5 py-0.5 shadow-lg animate-bounce-slow hidden lg:block">
                  <p className="text-white text-[8px] font-bold">10k+ Patients</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Professional Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-5 md:mt-6">
        <div className="group bg-white rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 md:p-4 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-teal-600 mb-0.5 sm:mb-1">50K+</div>
          <div className="text-[10px] sm:text-xs text-gray-600">Happy Patients</div>
          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-500 to-teal-400 mx-auto transition-all duration-300 mt-1 sm:mt-2 rounded-full"></div>
        </div>
        <div className="group bg-white rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 md:p-4 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-teal-600 mb-0.5 sm:mb-1">100+</div>
          <div className="text-[10px] sm:text-xs text-gray-600">Expert Doctors</div>
          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-500 to-teal-400 mx-auto transition-all duration-300 mt-1 sm:mt-2 rounded-full"></div>
        </div>
        <div className="group bg-white rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 md:p-4 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-teal-600 mb-0.5 sm:mb-1">24/7</div>
          <div className="text-[10px] sm:text-xs text-gray-600">Emergency Care</div>
          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-500 to-teal-400 mx-auto transition-all duration-300 mt-1 sm:mt-2 rounded-full"></div>
        </div>
        <div className="group bg-white rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 md:p-4 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-teal-600 mb-0.5 sm:mb-1">98%</div>
          <div className="text-[10px] sm:text-xs text-gray-600">Satisfaction Rate</div>
          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-500 to-teal-400 mx-auto transition-all duration-300 mt-1 sm:mt-2 rounded-full"></div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.25;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        /* Custom breakpoint for extra small devices */
        @media (min-width: 480px) {
          .xs\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;