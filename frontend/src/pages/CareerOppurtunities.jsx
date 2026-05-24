// CareerOpportunities.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import doctorCareerImg from '../assets/appointment_img.png';

const CareerOpportunities = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide image on mobile (below 640px)
  const showImage = windowWidth >= 640;

  // Medical Job Openings Data
  const jobOpenings = [
    {
      title: "Senior Cardiologist",
      department: "Cardiology",
      location: "New York, NY",
      type: "Full-time",
      experience: "8+ years",
      salary: "$250k - $350k",
      urgency: "Urgent Hiring",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Registered Nurse (RN)",
      department: "Emergency Care",
      location: "Los Angeles, CA",
      type: "Full-time",
      experience: "3+ years",
      salary: "$80k - $110k",
      urgency: "Immediate Joining",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Pediatrician",
      department: "Pediatrics",
      location: "Chicago, IL",
      type: "Full-time",
      experience: "5+ years",
      salary: "$180k - $240k",
      urgency: "",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Radiology Technician",
      department: "Diagnostic Imaging",
      location: "Houston, TX",
      type: "Full-time",
      experience: "2+ years",
      salary: "$65k - $85k",
      urgency: "",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm3 8h8M8 11v6m8-6v6" />
        </svg>
      )
    },
    {
      title: "Medical Lab Technologist",
      department: "Pathology",
      location: "Phoenix, AZ",
      type: "Full-time",
      experience: "3+ years",
      salary: "$70k - $90k",
      urgency: "",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Physical Therapist",
      department: "Rehabilitation",
      location: "Miami, FL",
      type: "Part-time",
      experience: "4+ years",
      salary: "$85k - $105k",
      urgency: "",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  // Medical Benefits Data
  const medicalBenefits = [
    {
      title: "Health Insurance",
      description: "Full medical, dental & vision coverage",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "401(k) Matching",
      description: "4% company match",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "CME Allowance",
      description: "$5,000/year for education",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Paid Time Off",
      description: "4 weeks vacation + holidays",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Wellness Program",
      description: "Gym membership & mental health support",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: "Malpractice Insurance",
      description: "Full coverage included",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative max-w-6xl mx-auto mt-4 sm:mt-6 md:mt-0 lg:mt-10 px-3 sm:px-4">
      {/* Main Career Banner Card - Matching teal theme from Banner.jsx */}
      <div className="bg-gradient-to-br from-teal-600 via-teal-500 to-teal-600 rounded-xl sm:rounded-2xl shadow-xl overflow-visible">
        <div className="relative">
          {/* Background Animated Glow */}
          <div className="absolute inset-0 opacity-10 rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="absolute -top-15 -right-20 w-40 h-40 sm:w-60 sm:h-60 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-white rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          </div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:20px_20px] rounded-xl sm:rounded-2xl"></div>

          {/* Content Section */}
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
                JOIN OUR MEDICAL TEAM
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 leading-tight animate-slideInLeft">
              Healthcare Careers
            </h1>

            <p className="text-teal-100 text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 animate-slideInLeft animation-delay-200">
              Join Our Team of 100+ Trusted Doctors & Medical Professionals
            </p>

            {/* Position Count Badge */}
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg mb-3 sm:mb-4 shadow-lg animate-slideInLeft animation-delay-400">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>{jobOpenings.length}+ Medical Positions Available</span>
            </div>

            {/* Department Filters */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 animate-slideInLeft animation-delay-600">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-white text-[10px] sm:text-xs font-medium">Cardiology</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-white text-[10px] sm:text-xs font-medium">Emergency</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-white text-[10px] sm:text-xs font-medium">Pediatrics</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-white text-[10px] sm:text-xs font-medium">Radiology</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-white text-[10px] sm:text-xs font-medium">Surgery</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              className="group bg-white text-teal-600 font-bold py-1.5 sm:py-2 px-4 sm:px-5 md:px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 animate-fadeIn animation-delay-800"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs sm:text-sm font-semibold">View All Jobs</span>
              <svg 
                className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Trust Indicators - Healthcare specific */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 animate-fadeIn animation-delay-1000">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-teal-100 text-[9px] sm:text-xs">Top Hospital Network</span>
              </div>
              <div className="w-px h-3 bg-white/30"></div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-teal-100 text-[9px] sm:text-xs">Magnet Recognized</span>
              </div>
              <div className="w-px h-3 bg-white/30"></div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-teal-100 text-[9px] sm:text-xs">Great Place to Work®</span>
              </div>
            </div>
          </div>

          {/* Top Overflow Doctor Image - Hidden on mobile */}
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
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute -inset-1 sm:-inset-2 rounded-full border border-white/20 animate-spin-slow"></div>
                
                <img
                  src={doctorCareerImg}
                  alt="Medical Professional"
                  className="w-full h-full object-contain scale-110 sm:scale-125 drop-shadow-2xl transform transition-all duration-500 group-hover:scale-115 sm:group-hover:scale-130"
                />

                {/* Patient Care Badge */}
                <div className="absolute -left-4 sm:-left-5 top-1/3 bg-white rounded-xl shadow-lg p-1.5 sm:p-2 animate-float hidden sm:block">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-900">Patient Care</span>
                    <span className="text-[8px] text-gray-500">98% Satisfaction</span>
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
                      <p className="text-[8px] sm:text-[10px] text-gray-500">Combined Experience</p>
                      <p className="text-[10px] sm:text-xs font-bold text-gray-900">200+ Years</p>
                    </div>
                  </div>
                </div>

                {/* Live Hiring Badge */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
                  <span className="relative flex h-1 w-1 sm:h-1.5 sm:w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 sm:h-1.5 sm:w-1.5 bg-white"></span>
                  </span>
                  <span>ACTIVELY HIRING</span>
                </div>

                {/* Specialty Badge */}
                <div className="absolute -top-2 -right-2 bg-teal-500 rounded-full px-1.5 py-0.5 shadow-lg animate-bounce-slow hidden lg:block">
                  <p className="text-white text-[8px] font-bold">50+ Specialties</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hospital Stats Section - Matching Banner stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-5 md:mt-6">
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
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-teal-600 mb-0.5 sm:mb-1">50K+</div>
          <div className="text-[10px] sm:text-xs text-gray-600">Happy Patients</div>
          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-500 to-teal-400 mx-auto transition-all duration-300 mt-1 sm:mt-2 rounded-full"></div>
        </div>
        <div className="group bg-white rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 md:p-4 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-teal-600 mb-0.5 sm:mb-1">98%</div>
          <div className="text-[10px] sm:text-xs text-gray-600">Patient Satisfaction</div>
          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-500 to-teal-400 mx-auto transition-all duration-300 mt-1 sm:mt-2 rounded-full"></div>
        </div>
      </div>

      {/* Medical Job Openings Section */}
      <div className="mt-8 sm:mt-10 md:mt-12">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Current Medical Openings</h2>
          <p className="text-gray-600 text-sm sm:text-base">Join our team of dedicated healthcare professionals</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {jobOpenings.map((job, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer border border-gray-100"
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-50 rounded-lg text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                      {job.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                        {job.title}
                      </h3>
                      <p className="text-xs text-gray-500">{job.department}</p>
                    </div>
                  </div>
                  {job.urgency && (
                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                      {job.urgency}
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{job.salary}</span>
                  </div>
                </div>
                
                {/* ✅ LINK ADDED HERE - Apply Now button with Link */}
                <Link to="/apply-now" state={{ jobTitle: job.title }}>
                  <button className="w-full mt-2 bg-gray-50 text-teal-600 font-medium py-2 rounded-lg hover:bg-teal-600 hover:text-white transition-all duration-300 text-sm">
                    Apply Now →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Benefits Section */}
      <div className="mt-10 sm:mt-12 md:mt-14 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Medical Benefits & Perks</h2>
          <p className="text-gray-600 text-sm sm:text-base">Competitive compensation and comprehensive benefits package</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {medicalBenefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center group cursor-pointer"
            >
              <div className="bg-white rounded-full w-12 h-12 sm:w-14 sm:h-14 mx-auto flex items-center justify-center text-teal-600 shadow-md group-hover:shadow-xl group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                {benefit.icon}
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-gray-700 mt-2 group-hover:text-teal-600 transition-colors">
                {benefit.title}
              </p>
              <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5 hidden sm:block">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations - Same as Banner.jsx */}
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
        
        @media (min-width: 480px) {
          .xs\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default CareerOpportunities;