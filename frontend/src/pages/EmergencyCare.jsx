// frontend/src/pages/EmergencyCare.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmergencyCare = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeDoctors, setActiveDoctors] = useState(12);
  const [availableBeds, setAvailableBeds] = useState(8);
  const [waitTime, setWaitTime] = useState('15-20');

  // Live time update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDoctors(10 + Math.floor(Math.random() * 8));
      setAvailableBeds(5 + Math.floor(Math.random() * 10));
      setWaitTime((10 + Math.floor(Math.random() * 20)).toString());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const emergencyServices = [
    {
      icon: '🚑',
      title: 'Ambulance Service',
      description: 'GPS-tracked ambulances with paramedics, reaching you within 15 minutes',
      responseTime: '10-15 min',
      number: '102'
    },
    {
      icon: '🩺',
      title: 'Trauma Care',
      description: '24/7 specialized trauma team for accident and injury management',
      responseTime: 'Immediate',
      number: '108'
    },
    {
      icon: '❤️',
      title: 'Cardiac Emergency',
      description: 'Dedicated heart attack response team with cath lab facility',
      responseTime: 'Immediate',
      number: '108'
    },
    {
      icon: '🧠',
      title: 'Stroke Management',
      description: 'Rapid response stroke team with CT/MRI facility',
      responseTime: 'Immediate',
      number: '108'
    },
    {
      icon: '👶',
      title: 'Pediatric Emergency',
      description: 'Specialized emergency care for children and infants',
      responseTime: 'Immediate',
      number: '108'
    },
    {
      icon: '🤰',
      title: 'Obstetric Emergency',
      description: '24/7 maternity emergency with NICU support',
      responseTime: 'Immediate',
      number: '108'
    }
  ];

  const locations = [
    { name: 'Main Hospital - Downtown', address: '123 Healthcare Ave, Downtown', distance: '0.5 km', eta: '5 mins' },
    { name: 'Medical Center - North', address: '456 Wellness Blvd, North Zone', distance: '2.3 km', eta: '10 mins' },
    { name: 'Emergency Hub - South', address: '789 Life Care Rd, South Zone', distance: '3.1 km', eta: '12 mins' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Hero Section - Enhanced */}
      <div className="relative bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
        
        {/* Pulse Animation Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
          <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-ping-slow"></div>
          <div className="absolute inset-8 border-2 border-white/20 rounded-full animate-ping-slower"></div>
          <div className="absolute inset-16 border-2 border-white/10 rounded-full animate-ping-slowest"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wide">LIVE EMERGENCY SERVICES ACTIVE</span>
          </div>

          <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <svg className="w-12 h-12 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            24/7 Emergency Care
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-red-100 max-w-2xl mx-auto mb-6">
            Immediate medical attention when you need it most. Our emergency department is always ready to serve you.
          </p>

          {/* Live Stats Dashboard */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <div className="text-xs text-red-200">Current Time</div>
              <div className="text-lg font-mono font-bold">{formatTime(currentTime)}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <div className="text-xs text-red-200">Doctors On Duty</div>
              <div className="text-lg font-bold">{activeDoctors}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <div className="text-xs text-red-200">Available Beds</div>
              <div className="text-lg font-bold">{availableBeds}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <div className="text-xs text-red-200">Wait Time</div>
              <div className="text-lg font-bold">{waitTime} mins</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="tel:102" 
              className="group bg-white text-red-600 px-6 md:px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:scale-105"
            >
              <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Emergency: 102
            </a>
            <button className="border-2 border-white text-white px-6 md:px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Find Nearest ER
            </button>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-red-50" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="currentColor">
            <path d="M0 22L60 25.5C120 29 240 36 360 36C480 36 600 29 720 27.5C840 26 960 29 1080 32C1200 35 1320 38 1380 39.5L1440 41V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z"/>
          </svg>
        </div>
      </div>

      {/* Emergency Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Emergency Services We Provide</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Specialized emergency care for every critical situation</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {emergencyServices.map((service, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6 border border-gray-100">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{service.description}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">⏱️ {service.responseTime}</span>
                <a href={`tel:${service.number}`} className="text-red-600 font-semibold text-sm hover:text-red-700">
                  Call {service.number} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Numbers Section - Enhanced */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="p-8 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-yellow-300 text-lg">🚨</span>
              <span className="text-sm font-semibold">SAVE THESE NUMBERS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">In Case of Emergency</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition">
                <p className="text-sm opacity-90 mb-1">🚑 Emergency Helpline</p>
                <a href="tel:102" className="text-3xl md:text-4xl font-bold hover:text-yellow-300 transition">102</a>
                <p className="text-xs opacity-75 mt-1">Toll Free • 24/7</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition">
                <p className="text-sm opacity-90 mb-1">🚑 Ambulance</p>
                <a href="tel:108" className="text-3xl md:text-4xl font-bold hover:text-yellow-300 transition">108</a>
                <p className="text-xs opacity-75 mt-1">Free Service • 24/7</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition">
                <p className="text-sm opacity-90 mb-1">📞 Hospital Direct</p>
                <a href="tel:+9118001234567" className="text-xl md:text-2xl font-bold hover:text-yellow-300 transition">+91 1800 123 4567</a>
                <p className="text-xs opacity-75 mt-1">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Find Nearest ER Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">📍 Find Nearest Emergency Room</h2>
              <p className="text-gray-600">Get directions to the closest emergency facility</p>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Use My Location
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {locations.map((location, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{location.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{location.address}</p>
                    <div className="flex gap-3 mt-2 text-xs">
                      <span className="text-gray-600">📏 {location.distance}</span>
                      <span className="text-green-600">🚗 {location.eta}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* First Aid Tips Accordion */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">⚠️ First Aid Tips</h2>
            <p className="text-gray-600">Know what to do while waiting for emergency services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <details className="group border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition">
              <summary className="font-semibold text-gray-800 cursor-pointer flex items-center gap-2">
                <span className="text-red-600">🩸</span> Bleeding
              </summary>
              <p className="text-gray-600 text-sm mt-2 pl-6">Apply firm pressure with a clean cloth. Elevate the wound above heart level. Do not remove embedded objects.</p>
            </details>
            <details className="group border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition">
              <summary className="font-semibold text-gray-800 cursor-pointer flex items-center gap-2">
                <span className="text-red-600">🔥</span> Burns
              </summary>
              <p className="text-gray-600 text-sm mt-2 pl-6">Cool the burn under running water for 10-15 minutes. Cover with sterile gauze. Do not apply ice or ointments.</p>
            </details>
            <details className="group border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition">
              <summary className="font-semibold text-gray-800 cursor-pointer flex items-center gap-2">
                <span className="text-red-600">❤️</span> Heart Attack
              </summary>
              <p className="text-gray-600 text-sm mt-2 pl-6">Call emergency immediately. Make the person sit down and rest. Give aspirin if not allergic.</p>
            </details>
            <details className="group border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition">
              <summary className="font-semibold text-gray-800 cursor-pointer flex items-center gap-2">
                <span className="text-red-600">😮</span> Choking
              </summary>
              <p className="text-gray-600 text-sm mt-2 pl-6">Perform Heimlich maneuver: Stand behind, wrap arms around waist, give quick upward thrusts.</p>
            </details>
            <details className="group border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition">
              <summary className="font-semibold text-gray-800 cursor-pointer flex items-center gap-2">
                <span className="text-red-600">🧠</span> Stroke
              </summary>
              <p className="text-gray-600 text-sm mt-2 pl-6">Remember FAST: Face drooping, Arm weakness, Speech difficulty → Time to call emergency.</p>
            </details>
            <details className="group border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition">
              <summary className="font-semibold text-gray-800 cursor-pointer flex items-center gap-2">
                <span className="text-red-600">🦴</span> Fracture
              </summary>
              <p className="text-gray-600 text-sm mt-2 pl-6">Immobilize the area. Apply ice pack wrapped in cloth. Do not try to realign the bone.</p>
            </details>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-center text-gray-600">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-600 text-lg">✓</span>
            <span>ISO 9001:2024 Certified</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-600 text-lg">✓</span>
            <span>NABH Accredited</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-600 text-lg">✓</span>
            <span>24/7 Expert Team</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-600 text-lg">✓</span>
            <span>Advanced Life Support</span>
          </div>
        </div>
      </div>

      {/* Floating Emergency Button for Mobile */}
      <div className="fixed bottom-20 right-4 md:hidden z-40">
        <a href="tel:102" className="flex items-center gap-2 bg-red-600 text-white px-4 py-3 rounded-full shadow-2xl animate-bounce-slow">
          <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="font-semibold">Emergency 102</span>
        </a>
      </div>

      <style jsx>{`
        @keyframes ping-slow {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          75%, 100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }
        @keyframes ping-slower {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          75%, 100% {
            opacity: 0;
            transform: scale(2);
          }
        }
        @keyframes ping-slowest {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          75%, 100% {
            opacity: 0;
            transform: scale(2.5);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-ping-slower {
          animation: ping-slower 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-ping-slowest {
          animation: ping-slowest 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default EmergencyCare;