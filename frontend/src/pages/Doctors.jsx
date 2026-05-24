// frontend/src/pages/Doctors.jsx
import React, { useState, useMemo, useEffect, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      style={{
        animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s both`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
        
        <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
          doctor.available 
            ? 'bg-green-500/90 text-white' 
            : 'bg-red-500/90 text-white'
        }`}>
          {doctor.available ? 'Available Today' : 'Next Available: Tomorrow'}
        </div>

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

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Consultation Fee</p>
            <p className="text-lg font-bold text-gray-900">₹{doctor.fee}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

DoctorCard.displayName = 'DoctorCard';

// Main Doctors Component
const Doctors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleDoctors, setVisibleDoctors] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  // Get speciality from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const specialityParam = params.get('speciality') || 'all';

    if (specialityParam !== selectedSpecialty) {
      setTimeout(() => {
        setSelectedSpecialty(specialityParam);
      }, 0);
    }
  }, [location.search]);

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
      fee: 1500,
      available: true,
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
      fee: 1800,
      available: true,
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
      fee: 1600,
      available: false,
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
      fee: 1200,
      available: true,
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
      fee: 1400,
      available: true,
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
      fee: 1700,
      available: false,
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
      fee: 1600,
      available: true,
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
      fee: 1900,
      available: true,
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
      fee: 1500,
      available: true,
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
      fee: 1300,
      available: false,
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
      fee: 1450,
      available: true,
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
      fee: 1650,
      available: true,
    }
  ], []);

  // Filter doctors based on selected specialty
  const filteredDoctors = useMemo(() => {
    let filtered = doctors;
    
    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(doctor => doctor.specialtyId === selectedSpecialty);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort doctors
    if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'experience') {
      filtered = [...filtered].sort((a, b) => b.experience - a.experience);
    } else if (sortBy === 'fee_low') {
      filtered = [...filtered].sort((a, b) => a.fee - b.fee);
    } else if (sortBy === 'fee_high') {
      filtered = [...filtered].sort((a, b) => b.fee - a.fee);
    }
    
    return filtered;
  }, [selectedSpecialty, searchTerm, doctors, sortBy]);

  const displayedDoctors = filteredDoctors.slice(0, visibleDoctors);
  const hasMore = visibleDoctors < filteredDoctors.length;

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleDoctors(prev => prev + 9);
      setIsLoading(false);
    }, 500);
  };

  const handleBookAppointment = (doctorId) => {
    navigate("/appointment", { state: { doctorId } });
  };

  const handleViewProfile = (doctorId) => {
    navigate(`/doctors/${doctorId}`);
  };

  const handleSpecialtyClick = (specialty) => {
    setSelectedSpecialty(specialty);
    setVisibleDoctors(9);
    if (specialty === 'all') {
      navigate('/doctors');
    } else {
      navigate(`/doctors?speciality=${specialty}`);
    }
  };

  const getSpecialtyCount = (specialtyId) => {
    if (specialtyId === 'all') return doctors.length;
    return doctors.filter(d => d.specialtyId === specialtyId).length;
  };

  const specialties = [
    { id: 'all', name: 'All Doctors', icon: '🏥' },
    { id: 'cardiology', name: 'Cardiology', icon: '❤️' },
    { id: 'neurology', name: 'Neurology', icon: '🧠' },
    { id: 'orthopedics', name: 'Orthopedics', icon: '🦴' },
    { id: 'pediatrics', name: 'Pediatrics', icon: '👶' },
    { id: 'dermatology', name: 'Dermatology', icon: '✨' },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: '👁️' },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Our </span>
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              Medical Specialists
            </span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            Browse through our comprehensive list of experienced doctors across various specialties.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none bg-white"
            >
              <option value="default">Sort by: Default</option>
              <option value="rating">Sort by: Rating (High to Low)</option>
              <option value="experience">Sort by: Experience (High to Low)</option>
              <option value="fee_low">Sort by: Fee (Low to High)</option>
              <option value="fee_high">Sort by: Fee (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Specialty Filter Buttons */}
        <div className="mb-8 overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {specialties.map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => handleSpecialtyClick(specialty.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${
                  selectedSpecialty === specialty.id
                    ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-teal-400 hover:text-teal-600'
                }`}
              >
                <span className="mr-2">{specialty.icon}</span>
                {specialty.name}
                <span className="ml-2 text-xs opacity-75">
                  ({getSpecialtyCount(specialty.id)})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{displayedDoctors.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{filteredDoctors.length}</span> doctors
            {selectedSpecialty !== 'all' && (
              <span> in <span className="font-semibold text-teal-600 capitalize">{selectedSpecialty}</span></span>
            )}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-teal-600 hover:text-teal-700 text-sm font-semibold"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Doctors Grid */}
        {displayedDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayedDoctors.map((doctor, index) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                index={index}
                onBookAppointment={handleBookAppointment}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">
              No doctors available in {selectedSpecialty} speciality.
              <button 
                onClick={() => handleSpecialtyClick('all')}
                className="text-teal-600 hover:text-teal-700 font-semibold ml-2"
              >
                View all doctors
              </button>
            </p>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && displayedDoctors.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
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
                'Load More Doctors'
              )}
            </button>
          </div>
        )}
      </div>

      <style>{`
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
      `}</style>
    </section>
  );
};

export default Doctors;