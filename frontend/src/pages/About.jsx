// About.jsx
import React, { useState, useEffect } from 'react';
// About us medical image
import aboutDoctorImg from '../assets/appointment_img.png';

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide image on mobile (below 640px)
  const showImage = windowWidth >= 640;

  // Mission & Vision Data
  const missionPoints = [
    {
      title: "Our Mission",
      description: "To provide accessible, compassionate, and high-quality healthcare to every patient who walks through our doors.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Our Vision",
      description: "To become the most trusted healthcare provider, setting new standards in patient care and medical excellence.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    }
  ];

  // Core Values Data
  const coreValues = [
    {
      title: "Compassion",
      description: "Treating every patient with empathy, dignity, and respect",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Excellence",
      description: "Delivering the highest standard of medical care",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Innovation",
      description: "Embracing cutting-edge medical technology and treatments",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Integrity",
      description: "Upholding the highest ethical standards in healthcare",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Collaboration",
      description: "Working together for better patient outcomes",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Accessibility",
      description: "Making quality healthcare available to all",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h2.582c.357 0 .7.092 1.007.268l1.735 1.027c.307.176.65.268 1.007.268h2.14c.357 0 .7-.092 1.007-.268l1.735-1.027c.307-.176.65-.268 1.007-.268H21M8 12V6a2 2 0 012-2h4a2 2 0 012 2v6m-8 0h8" />
        </svg>
      )
    }
  ];

  // Leadership Team Data
  const leadershipTeam = [
    {
      name: "Dr. Sarah Johnson",
      title: "Chief Medical Officer",
      specialty: "Cardiology",
      experience: "20+ years",
      image: null, // Would use actual image in production
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      name: "Dr. Michael Chen",
      title: "Director of Surgery",
      specialty: "General Surgery",
      experience: "18+ years",
      image: null,
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      name: "Dr. Emily Rodriguez",
      title: "Head of Pediatrics",
      specialty: "Pediatric Medicine",
      experience: "15+ years",
      image: null,
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      name: "Dr. James Wilson",
      title: "Emergency Department Chief",
      specialty: "Emergency Medicine",
      experience: "22+ years",
      image: null,
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  // Milestones Data
  const milestones = [
    {
      year: "2010",
      title: "Founded",
      description: "Started with 5 dedicated doctors",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      year: "2015",
      title: "Expansion",
      description: "Opened 3 new medical centers",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      year: "2018",
      title: "Technology",
      description: "Launched telemedicine platform",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      year: "2023",
      title: "100+ Doctors",
      description: "Reached milestone of 100+ specialists",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative max-w-6xl mx-auto mt-4 sm:mt-6 md:mt-0 lg:mt-10 px-3 sm:px-4 pb-8 sm:pb-10 md:pb-12">
      {/* Main About Banner Card */}
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
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-2.5 sm:px-3 py-1 mb-5 sm:mb-4 animate-fadeIn">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
              </span>
              <span className="text-white text-[10px] sm:text-xs font-semibold tracking-wider">
                WELCOME TO OUR HOSPITAL
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 leading-tight animate-slideInLeft">
              About Us
            </h1>

            <p className="text-teal-100 text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 animate-slideInLeft animation-delay-200">
              Providing Excellence in Healthcare Since 2010
            </p>

            {/* Description */}
            <p className="text-white/90 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 animate-slideInLeft animation-delay-400 max-w-md">
              We are committed to delivering compassionate, patient-centered care 
              with cutting-edge medical technology and a team of world-class healthcare professionals.
            </p>

            {/* CTA Button */}
            <button
              className="group bg-white text-teal-600 font-bold py-1.5 sm:py-2 px-4 sm:px-5 md:px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 animate-fadeIn animation-delay-800"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs sm:text-sm font-semibold">Learn More</span>
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
                <span className="text-teal-100 text-[9px] sm:text-xs">NABH Accredited</span>
              </div>
              <div className="w-px h-3 bg-white/30"></div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-teal-100 text-[9px] sm:text-xs">ISO Certified</span>
              </div>
              <div className="w-px h-3 bg-white/30"></div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-teal-100 text-[9px] sm:text-xs">Top Teaching Hospital</span>
              </div>
            </div>
          </div>

          {/* Top Overflow Image - Hidden on mobile */}
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
                  src={aboutDoctorImg}
                  alt="Medical Team"
                  className="w-full h-full object-contain scale-110 sm:scale-125 drop-shadow-2xl transform transition-all duration-500 group-hover:scale-115 sm:group-hover:scale-130"
                />

                {/* Years of Excellence Badge */}
                <div className="absolute -left-4 sm:-left-5 top-1/3 bg-white rounded-xl shadow-lg p-1.5 sm:p-2 animate-float hidden sm:block">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="text-teal-600 font-bold text-lg sm:text-xl">14+</div>
                    <span className="text-[8px] text-gray-500">Years of Excellence</span>
                  </div>
                </div>

                {/* Patient Care Badge */}
                <div className="absolute -right-3 sm:-right-4 bottom-16 sm:bottom-20 md:bottom-24 bg-white rounded-xl shadow-lg p-1.5 sm:p-2 animate-float animation-delay-1000 hidden md:block">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="bg-teal-100 rounded-lg p-1 sm:p-1.5">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[10px] text-gray-500">Patient Satisfaction</p>
                      <p className="text-[10px] sm:text-xs font-bold text-gray-900">98% Rating</p>
                    </div>
                  </div>
                </div>

                {/* Live Support Badge */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
                  <span className="relative flex h-1 w-1 sm:h-1.5 sm:w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 sm:h-1.5 sm:w-1.5 bg-white"></span>
                  </span>
                  <span>24/7 PATIENT SUPPORT</span>
                </div>

                {/* Multi-Specialty Badge */}
                <div className="absolute -top-2 -right-2 bg-teal-500 rounded-full px-1.5 py-0.5 shadow-lg animate-bounce-slow hidden lg:block">
                  <p className="text-white text-[8px] font-bold">50+ Specialties</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
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
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-teal-600 mb-0.5 sm:mb-1">50+</div>
          <div className="text-[10px] sm:text-xs text-gray-600">Medical Specialties</div>
          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-500 to-teal-400 mx-auto transition-all duration-300 mt-1 sm:mt-2 rounded-full"></div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-8 sm:mt-10 md:mt-12">
        {missionPoints.map((point, index) => (
          <div 
            key={index}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-5 sm:p-6"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                {point.icon}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                  {point.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Core Values Section */}
      <div className="mt-10 sm:mt-12 md:mt-14">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Our Core Values</h2>
          <p className="text-gray-600 text-sm sm:text-base">The principles that guide everything we do</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {coreValues.map((value, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-4 sm:p-5 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-teal-50 rounded-lg text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
                  {value.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm pl-1">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Journey Milestones */}
      <div className="mt-10 sm:mt-12 md:mt-14 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Our Journey</h2>
          <p className="text-gray-600 text-sm sm:text-base">Key milestones in our healthcare journey</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {milestones.map((milestone, index) => (
            <div 
              key={index}
              className="text-center group cursor-pointer"
            >
              <div className="bg-white rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center text-teal-600 shadow-md group-hover:shadow-xl group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 mb-3">
                {milestone.icon}
              </div>
              <p className="text-teal-600 font-bold text-lg sm:text-xl group-hover:text-teal-700">
                {milestone.year}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 mt-1">
                {milestone.title}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className="mt-10 sm:mt-12 md:mt-14">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Leadership Team</h2>
          <p className="text-gray-600 text-sm sm:text-base">Meet our dedicated medical leadership</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {leadershipTeam.map((leader, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-4 sm:p-5 text-center"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                {leader.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">{leader.name}</h3>
              <p className="text-teal-600 text-xs sm:text-sm font-semibold mt-1">{leader.title}</p>
              <p className="text-gray-500 text-xs mt-1">{leader.specialty}</p>
              <p className="text-gray-400 text-[10px] sm:text-xs mt-1">{leader.experience}</p>
            </div>
          ))}
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
        
        @media (min-width: 480px) {
          .xs\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default About;