// TopDoctors.jsx
import React, { useState, useMemo, memo } from 'react';
import { useNavigate } from "react-router-dom";

// Import doctor images
import doctor1 from "../assets/doc1.png";
import doctor2 from "../assets/doc2.png";
import doctor3 from "../assets/doc15.png";
import doctor4 from "../assets/doc4.png";
import doctor5 from "../assets/doc5.png";
import doctor6 from "../assets/doc6.png";
import doctor7 from "../assets/doc7.png";
import doctor8 from "../assets/doc8.png";
import doctor9 from "../assets/doc9.png";
import doctor10 from "../assets/doc10.png";
import doctor11 from "../assets/doc11.png";
import doctor12 from "../assets/doc12.png";

// Memoized Doctor Card Component
const DoctorCard = memo(({ doctor, index, onBookAppointment, onViewProfile }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s both`
      }}
    >
      {/* Doctor Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-teal-700 aspect-[4/3]">
        <img
          src={imageError ? "/api/placeholder/400/300" : doctor.image}
          alt={doctor.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          loading="lazy"
          onError={() => setImageError(true)}
        />
        
        {/* Availability Badge */}
        <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-300 ${
          doctor.available 
            ? 'bg-green-500/90 text-white' 
            : 'bg-red-500/90 text-white'
        }`}>
          {doctor.available ? 'Available Today' : 'Next Available: Tomorrow'}
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Quick Action Buttons - Visible on Hover */}
        <div className={`absolute bottom-4 left-0 right-0 flex justify-center gap-2 transition-all duration-300 transform ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onBookAppointment(doctor.id);
            }}
            className="bg-white text-teal-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-600 hover:text-white transition-all duration-300 shadow-lg"
          >
            Book Now
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewProfile(doctor.id);
            }}
            className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-700 transition-all duration-300 shadow-lg"
          >
            Profile
          </button>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-5 bg-white">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
              {doctor.name}
            </h3>
            <p className="text-teal-600 font-semibold text-sm">
              {doctor.specialty}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">{doctor.rating}</span>
          </div>
        </div>

        {/* Qualifications & Experience */}
        <div className="space-y-2 mt-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{doctor.qualification}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{doctor.experience} Years Experience</span>
          </div>
        </div>

        {/* Languages Spoken */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {doctor.languages.slice(0, 3).map((lang, idx) => (
            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              {lang}
            </span>
          ))}
          {doctor.languages.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              +{doctor.languages.length - 3}
            </span>
          )}
        </div>

        {/* Consultation Fee & Patient Count */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Consultation Fee</p>
            <p className="text-lg font-bold text-gray-900">₹{doctor.fee}</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex -space-x-2">
              {doctor.patients?.slice(0, 3).map((patient, idx) => (
                <img
                  key={idx}
                  src={patient.avatar}
                  alt={patient.name}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  onError={(e) => {
                    e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg";
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">{doctor.totalPatients}+ patients</span>
          </div>
        </div>
      </div>
    </div>
  );
});

DoctorCard.displayName = 'DoctorCard';

// Main Component
const TopDoctors = () => {
  const navigate = useNavigate();

  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [visibleDoctors, setVisibleDoctors] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const specialties = [
    { id: 'all', name: 'All Specialties', icon: '🏥' },
    { id: 'cardiology', name: 'Cardiology', icon: '❤️' },
    { id: 'neurology', name: 'Neurology', icon: '🧠' },
    { id: 'orthopedics', name: 'Orthopedics', icon: '🦴' },
    { id: 'pediatrics', name: 'Pediatrics', icon: '👶' },
    { id: 'dermatology', name: 'Dermatology', icon: '✨' },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: '👁️' },
  ];

  const doctors = useMemo(() => [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      specialtyId: "cardiology",
      image: doctor1,
      rating: 4.9,
      qualification: "MD, FACC - Cardiology",
      experience: 15,
      languages: ["English", "Spanish", "French"],
      fee: 1500,
      totalPatients: 12500,
      available: true,
      patients: [
        { name: "John D.", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
        { name: "Mary S.", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
        { name: "Robert K.", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
      ]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      specialtyId: "neurology",
      image: doctor2,
      rating: 4.8,
      qualification: "MD, PhD - Neurology",
      experience: 12,
      languages: ["English", "Mandarin", "Cantonese"],
      fee: 1800,
      totalPatients: 8900,
      available: true,
      patients: [
        { name: "Alice W.", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
        { name: "James L.", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
      ]
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Orthopedics",
      specialtyId: "orthopedics",
      image: doctor3,
      rating: 4.9,
      qualification: "MS - Orthopedics",
      experience: 10,
      languages: ["English", "Spanish"],
      fee: 1600,
      totalPatients: 7500,
      available: false,
      patients: [
        { name: "David M.", avatar: "https://randomuser.me/api/portraits/men/6.jpg" },
        { name: "Lisa T.", avatar: "https://randomuser.me/api/portraits/women/7.jpg" },
      ]
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Pediatrics",
      specialtyId: "pediatrics",
      image: doctor4,
      rating: 5.0,
      qualification: "MD - Pediatrics",
      experience: 8,
      languages: ["English", "German"],
      fee: 1200,
      totalPatients: 11200,
      available: true,
      patients: [
        { name: "Tom H.", avatar: "https://randomuser.me/api/portraits/men/8.jpg" },
        { name: "Emma W.", avatar: "https://randomuser.me/api/portraits/women/9.jpg" },
      ]
    },
    {
      id: 5,
      name: "Dr. Priya Sharma",
      specialty: "Dermatology",
      specialtyId: "dermatology",
      image: doctor5,
      rating: 4.7,
      qualification: "MD - Dermatology",
      experience: 9,
      languages: ["English", "Hindi", "Marathi"],
      fee: 1400,
      totalPatients: 6800,
      available: true,
      patients: [
        { name: "Neha S.", avatar: "https://randomuser.me/api/portraits/women/10.jpg" },
        { name: "Raj K.", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
      ]
    },
    {
      id: 6,
      name: "Dr. Robert Taylor",
      specialty: "Ophthalmology",
      specialtyId: "ophthalmology",
      image: doctor6,
      rating: 4.8,
      qualification: "MS - Ophthalmology",
      experience: 14,
      languages: ["English", "Italian"],
      fee: 1700,
      totalPatients: 9300,
      available: false,
      patients: [
        { name: "Sophia L.", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
        { name: "William B.", avatar: "https://randomuser.me/api/portraits/men/13.jpg" },
      ]
    },
    {
      id: 7,
      name: "Dr. Lisa Anderson",
      specialty: "Cardiology",
      specialtyId: "cardiology",
      image: doctor7,
      rating: 4.9,
      qualification: "MD, FACC - Cardiology",
      experience: 11,
      languages: ["English", "French"],
      fee: 1600,
      totalPatients: 10400,
      available: true,
      patients: [
        { name: "Chris P.", avatar: "https://randomuser.me/api/portraits/men/14.jpg" },
        { name: "Anna K.", avatar: "https://randomuser.me/api/portraits/women/15.jpg" },
      ]
    },
    {
      id: 8,
      name: "Dr. David Kim",
      specialty: "Neurology",
      specialtyId: "neurology",
      image: doctor8,
      rating: 4.6,
      qualification: "MD, PhD - Neurology",
      experience: 13,
      languages: ["English", "Korean"],
      fee: 1900,
      totalPatients: 7200,
      available: true,
      patients: [
        { name: "Steve J.", avatar: "https://randomuser.me/api/portraits/men/16.jpg" },
        { name: "Michelle W.", avatar: "https://randomuser.me/api/portraits/women/17.jpg" },
      ]
    },
    {
      id: 9,
      name: "Dr. Maria Garcia",
      specialty: "Orthopedics",
      specialtyId: "orthopedics",
      image: doctor9,
      rating: 4.8,
      qualification: "MS - Orthopedics",
      experience: 7,
      languages: ["English", "Spanish", "Portuguese"],
      fee: 1500,
      totalPatients: 5900,
      available: true,
      patients: [
        { name: "Carlos R.", avatar: "https://randomuser.me/api/portraits/men/18.jpg" },
        { name: "Elena M.", avatar: "https://randomuser.me/api/portraits/women/19.jpg" },
      ]
    },
    {
      id: 10,
      name: "Dr. Thomas Brown",
      specialty: "Pediatrics",
      specialtyId: "pediatrics",
      image: doctor10,
      rating: 4.9,
      qualification: "MD - Pediatrics",
      experience: 10,
      languages: ["English"],
      fee: 1300,
      totalPatients: 8600,
      available: false,
      patients: [
        { name: "Oliver T.", avatar: "https://randomuser.me/api/portraits/men/20.jpg" },
        { name: "Charlotte P.", avatar: "https://randomuser.me/api/portraits/women/21.jpg" },
      ]
    },
    {
      id: 11,
      name: "Dr. Rachel Green",
      specialty: "Dermatology",
      specialtyId: "dermatology",
      image: doctor11,
      rating: 4.8,
      qualification: "MD - Dermatology",
      experience: 6,
      languages: ["English", "Hebrew"],
      fee: 1450,
      totalPatients: 5400,
      available: true,
      patients: [
        { name: "Monica G.", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
        { name: "Chandler B.", avatar: "https://randomuser.me/api/portraits/men/23.jpg" },
      ]
    },
    {
      id: 12,
      name: "Dr. William Turner",
      specialty: "Ophthalmology",
      specialtyId: "ophthalmology",
      image: doctor12,
      rating: 4.7,
      qualification: "MS - Ophthalmology",
      experience: 9,
      languages: ["English", "Dutch"],
      fee: 1650,
      totalPatients: 6100,
      available: true,
      patients: [
        { name: "Elizabeth S.", avatar: "https://randomuser.me/api/portraits/women/24.jpg" },
        { name: "Henry F.", avatar: "https://randomuser.me/api/portraits/men/25.jpg" },
      ]
    }
  ], []);

  const filteredDoctors = useMemo(() => {
    if (selectedSpecialty === 'all') return doctors;
    return doctors.filter(doctor => doctor.specialtyId === selectedSpecialty);
  }, [selectedSpecialty, doctors]);

  const displayedDoctors = filteredDoctors.slice(0, visibleDoctors);
  const hasMore = visibleDoctors < filteredDoctors.length;

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleDoctors(prev => prev + 6);
      setIsLoading(false);
    }, 500);
  };

  const handleBookAppointment = (doctorId) => {
    navigate("/appointment", { state: { doctorId } });
  };

  // ✅ Fix: Add this function for profile navigation
  const handleViewProfile = (doctorId) => {
    navigate(`/doctors/${doctorId}`);
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-full mb-6 animate-fadeIn">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <span className="text-gray-700 text-sm font-semibold">Expert Physicians</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Meet Our </span>
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              Top Doctors
            </span>
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Choose from our team of internationally trained, board-certified specialists 
            dedicated to providing exceptional patient care.
          </p>
        </div>

        {/* Specialty Filter - Responsive Scrollable */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-3 justify-center min-w-max">
            {specialties.map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => {
                  setSelectedSpecialty(specialty.id);
                  setVisibleDoctors(6);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap ${
                  selectedSpecialty === specialty.id
                    ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-teal-500 hover:text-teal-600'
                }`}
              >
                <span className="mr-2">{specialty.icon}</span>
                {specialty.name}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedDoctors.map((doctor, index) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              index={index}
              onBookAppointment={handleBookAppointment}
              onViewProfile={handleViewProfile}  // ✅ Pass the function
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  Load More Doctors
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}

        {/* View All Doctors Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/doctors")}
            className="border-2 border-gray-300 bg-white hover:border-teal-500 text-gray-700 hover:text-teal-600 px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 transform hover:-translate-y-0.5"
          >
            View All Doctors
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default TopDoctors;