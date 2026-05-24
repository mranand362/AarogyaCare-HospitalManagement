// frontend/src/pages/VideoConsultation.jsx
import React, { useState, useMemo, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createBooking } from '../api/bookingApi';

const VideoConsultation = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const specialties = useMemo(() => [
    { id: 'all', name: 'All Specialties', icon: '👨‍⚕️', count: 0 },
    { id: 'cardiologist', name: 'Cardiologist', icon: '❤️', count: 0 },
    { id: 'dermatologist', name: 'Dermatologist', icon: '🧴', count: 0 },
    { id: 'physician', name: 'General Physician', icon: '🩺', count: 0 },
    { id: 'pediatrician', name: 'Pediatrician', icon: '👶', count: 0 },
    { id: 'orthopedic', name: 'Orthopedic', icon: '🦴', count: 0 },
    { id: 'gynecologist', name: 'Gynecologist', icon: '👩', count: 0 },
    { id: 'neurologist', name: 'Neurologist', icon: '🧠', count: 0 }
    ], []);

  const doctors = useMemo(() => [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      specialization: "Cardiologist",
      specialtyId: "cardiologist",
      experience: "15 years",
      fee: 999,
      rating: 4.8,
      reviews: 234,
      available: true,
      education: "MD, DM (Cardiology)",
      hospital: "Aarogya Care Heart Institute",
      languages: ["English", "Hindi", "Telugu"],
      nextAvailable: "Today, 2:00 PM",
      image: "👨‍⚕️",
      about: "Expert cardiologist with 15+ years of experience in treating complex heart conditions.",
      videoCallLink: "https://meet.aarogyacare.com/rajesh"
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialization: "Dermatologist",
      specialtyId: "dermatologist",
      experience: "10 years",
      fee: 899,
      rating: 4.9,
      reviews: 189,
      available: true,
      education: "MD (Dermatology)",
      hospital: "Aarogya Care Skin Clinic",
      languages: ["English", "Hindi", "Punjabi"],
      nextAvailable: "Tomorrow, 10:00 AM",
      image: "👩‍⚕️",
      about: "Renowned dermatologist specializing in cosmetic dermatology and acne treatment.",
      videoCallLink: "https://meet.aarogyacare.com/priya"
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      specialization: "General Physician",
      specialtyId: "physician",
      experience: "12 years",
      fee: 799,
      rating: 4.7,
      reviews: 456,
      available: true,
      education: "MD (Internal Medicine)",
      hospital: "Aarogya Care Medical Center",
      languages: ["English", "Hindi", "Gujarati"],
      nextAvailable: "Today, 3:30 PM",
      image: "👨‍⚕️",
      about: "Experienced general physician providing comprehensive primary care.",
      videoCallLink: "https://meet.aarogyacare.com/amit"
    },
    {
      id: 4,
      name: "Dr. Sneha Reddy",
      specialization: "Pediatrician",
      specialtyId: "pediatrician",
      experience: "8 years",
      fee: 849,
      rating: 4.9,
      reviews: 167,
      available: true,
      education: "MD (Pediatrics)",
      hospital: "Aarogya Care Children's Hospital",
      languages: ["English", "Hindi", "Telugu"],
      nextAvailable: "Tomorrow, 11:00 AM",
      image: "👩‍⚕️",
      about: "Dedicated pediatrician passionate about child health and development.",
      videoCallLink: "https://meet.aarogyacare.com/sneha"
    },
    {
      id: 5,
      name: "Dr. Vikram Singh",
      specialization: "Orthopedic",
      specialtyId: "orthopedic",
      experience: "14 years",
      fee: 1099,
      rating: 4.8,
      reviews: 312,
      available: true,
      education: "MS (Orthopedics)",
      hospital: "Aarogya Care Bone & Joint Center",
      languages: ["English", "Hindi"],
      nextAvailable: "Today, 4:00 PM",
      image: "👨‍⚕️",
      about: "Orthopedic surgeon specializing in joint replacement and sports medicine.",
      videoCallLink: "https://meet.aarogyacare.com/vikram"
    },
    {
      id: 6,
      name: "Dr. Neha Gupta",
      specialization: "Gynecologist",
      specialtyId: "gynecologist",
      experience: "11 years",
      fee: 949,
      rating: 4.9,
      reviews: 278,
      available: true,
      education: "MD (Obstetrics & Gynecology)",
      hospital: "Aarogya Care Women's Clinic",
      languages: ["English", "Hindi", "Punjabi"],
      nextAvailable: "Tomorrow, 9:00 AM",
      image: "👩‍⚕️",
      about: "Experienced gynecologist offering comprehensive women's health services.",
      videoCallLink: "https://meet.aarogyacare.com/neha"
    },
    {
      id: 7,
      name: "Dr. Anil Mehta",
      specialization: "Neurologist",
      specialtyId: "neurologist",
      experience: "16 years",
      fee: 1299,
      rating: 4.9,
      reviews: 198,
      available: true,
      education: "DM (Neurology)",
      hospital: "Aarogya Care Neuroscience Center",
      languages: ["English", "Hindi", "Marathi"],
      nextAvailable: "Tomorrow, 2:00 PM",
      image: "👨‍⚕️",
      about: "Leading neurologist specializing in stroke management and epilepsy.",
      videoCallLink: "https://meet.aarogyacare.com/anil"
    },
    {
      id: 8,
      name: "Dr. Deepa Nair",
      specialization: "Dermatologist",
      specialtyId: "dermatologist",
      experience: "9 years",
      fee: 899,
      rating: 4.8,
      reviews: 145,
      available: true,
      education: "MD (Dermatology)",
      hospital: "Aarogya Care Skin & Hair Clinic",
      languages: ["English", "Hindi", "Malayalam"],
      nextAvailable: "Today, 5:00 PM",
      image: "👩‍⚕️",
      about: "Cosmetic dermatologist expert in laser treatments and anti-aging procedures.",
      videoCallLink: "https://meet.aarogyacare.com/deepa"
    }
  ], []);

  // Update category counts
  const categoriesWithCounts = useMemo(() => {
    return specialties.map(cat => ({
      ...cat,
      count: cat.id === 'all' 
        ? doctors.length 
        : doctors.filter(d => d.specialtyId === cat.id).length
    }));
  }, [specialties, doctors]);

  // Filter doctors based on search and specialty
  const filteredDoctors = useMemo(() => {
    let filtered = doctors;
    
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(doctor => doctor.specialtyId === selectedSpecialty);
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(term) ||
        doctor.specialization.toLowerCase().includes(term) ||
        doctor.about.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [doctors, selectedSpecialty, searchTerm]);

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"
  ];

  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    symptoms: '',
    age: '',
    gender: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToastMessage = (message= 'success') => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  };

  const handleBookNow = (doctor) => {
    if (!user) {
      showToastMessage('Please login first to book a consultation', 'error');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedSlot || !selectedDate || !formData.patientName || !formData.phone) {
      showToastMessage('Please fill all required fields', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        serviceName: `${selectedDoctor.specialization} Consultation - ${selectedDoctor.name}`,
        serviceId: selectedDoctor.id,
        serviceIcon: selectedDoctor.image,
        price: selectedDoctor.fee,
        duration: "30 mins",
        patientName: formData.patientName,
        patientPhone: formData.phone,
        patientEmail: formData.email || user?.email || '',
        appointmentDate: selectedDate,
        appointmentTime: selectedSlot,
        notes: `Doctor: ${selectedDoctor.name}, Specialization: ${selectedDoctor.specialization}, Age: ${formData.age || 'N/A'}, Gender: ${formData.gender || 'N/A'}, Symptoms: ${formData.symptoms || 'None'}`
      };

      console.log('📦 Sending video consultation booking:', bookingData);
      
      const response = await createBooking(bookingData);
      console.log('📥 Response:', response);
      
      if (response.success) {
        showToastMessage(`✅ Consultation booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedSlot}`, 'success');
        setShowBookingModal(false);
        
        // Reset form
        setSelectedSlot(null);
        setSelectedDate('');
        setFormData({
          patientName: '',
          email: '',
          phone: '',
          symptoms: '',
          age: '',
          gender: ''
        });
        setSelectedDoctor(null);
      } else {
        showToastMessage(response.message || 'Booking failed', 'error');
      }
    } catch (error) {
      console.error('❌ Booking error:', error);
      showToastMessage(error.response?.data?.message || 'Booking failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down">
          <div className={`px-6 py-3 rounded-xl shadow-2xl text-white text-sm font-medium flex items-center gap-2 ${toastMessage.includes('✅') ? 'bg-green-600' : 'bg-red-600'}`}>
            {toastMessage}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wide">LIVE VIDEO CONSULTATION</span>
          </div>

          <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 animate-float">
            <svg className="w-12 h-12 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Online Video <span className="text-cyan-200">Consultation</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Consult with top doctors from the comfort of your home. Secure, confidential, and convenient.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{doctors.length}+ Expert Doctors</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>24/7 Available</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secure & Private</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-blue-50" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="currentColor">
            <path d="M0 22L60 25.5C120 29 240 36 360 36C480 36 600 29 720 27.5C840 26 960 29 1080 32C1200 35 1320 38 1380 39.5L1440 41V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* How It Works Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">How Video Consultation Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Connect with top doctors in 4 simple steps</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center group">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
              1
            </div>
            <h3 className="font-semibold text-gray-800">Choose a Doctor</h3>
            <p className="text-gray-500 text-sm">Select from experts</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
              2
            </div>
            <h3 className="font-semibold text-gray-800">Book a Slot</h3>
            <p className="text-gray-500 text-sm">Pick convenient time</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
              3
            </div>
            <h3 className="font-semibold text-gray-800">Make Payment</h3>
            <p className="text-gray-500 text-sm">Secure online payment</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
              4
            </div>
            <h3 className="font-semibold text-gray-800">Video Call</h3>
            <p className="text-gray-500 text-sm">Connect via secure link</p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by doctor name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4 overflow-x-auto pb-2">
            {categoriesWithCounts.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedSpecialty(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  selectedSpecialty === cat.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedSpecialty === cat.id ? 'bg-white/20' : 'bg-gray-200'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Found <span className="font-bold text-blue-600">{filteredDoctors.length}</span> doctors
          </p>
        </div>

        {/* Doctors Grid/List */}
        {filteredDoctors.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl text-white shadow-lg">
                        {doctor.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{doctor.name}</h3>
                        <p className="text-blue-600 text-sm font-medium">{doctor.specialization}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-medium">{doctor.rating}</span>
                          <span className="text-xs text-gray-400">({doctor.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{doctor.experience}</span>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Next: {doctor.nextAvailable}</span>
                    </div>
                    
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">{doctor.about}</p>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-xl font-bold text-blue-600">₹{formatPrice(doctor.fee)}</span>
                        <span className="text-xs text-gray-500">/consult</span>
                      </div>
                      <button
                        onClick={() => handleBookNow(doctor)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg"
                      >
                        Book Now →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl text-white flex-shrink-0">
                    {doctor.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-800">{doctor.name}</h3>
                      <span className="text-blue-600 text-sm">{doctor.specialization}</span>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-1">{doctor.about}</p>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                      <span>⭐ {doctor.rating}</span>
                      <span>{doctor.experience}</span>
                      <span>🕒 {doctor.nextAvailable}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">₹{formatPrice(doctor.fee)}</div>
                    </div>
                    <button
                      onClick={() => handleBookNow(doctor)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedSpecialty('all'); }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
            >
              Clear filters →
            </button>
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Video Consultation?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                🏠
              </div>
              <h3 className="font-semibold text-gray-800">Stay Home, Stay Safe</h3>
              <p className="text-gray-500 text-sm">Consult from anywhere, no travel needed</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                ⏰
              </div>
              <h3 className="font-semibold text-gray-800">Save Time</h3>
              <p className="text-gray-500 text-sm">No waiting rooms, no traffic</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                🔒
              </div>
              <h3 className="font-semibold text-gray-800">100% Secure</h3>
              <p className="text-gray-500 text-sm">End-to-end encrypted video calls</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-10 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-2xl p-6 sm:p-8 text-white">
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">📹 How does video consultation work?</h4>
              <p className="text-sm opacity-90">Book a slot, make payment, and receive a video call link via email/SMS. Click the link at appointment time to connect with doctor.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">💊 Can I get a prescription?</h4>
              <p className="text-sm opacity-90">Yes, doctors can provide e-prescriptions after consultation. You'll receive it via email and SMS.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">🔄 Can I reschedule?</h4>
              <p className="text-sm opacity-90">Yes, you can reschedule up to 2 hours before appointment at no extra cost.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">🔒 Is it secure?</h4>
              <p className="text-sm opacity-90">Absolutely! Our platform is HIPAA compliant with end-to-end encryption.</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-center text-gray-600">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-blue-600 text-lg">✓</span>
            <span>50,000+ Happy Patients</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-blue-600 text-lg">✓</span>
            <span>ISO 27001 Certified</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-blue-600 text-lg">✓</span>
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-blue-600 text-lg">✓</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowBookingModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-modal-pop max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white rounded-t-2xl sticky top-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Book Video Consultation</h3>
                  <p className="text-gray-500 text-sm">{selectedDoctor.name} - {selectedDoctor.specialization}</p>
                </div>
                <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>
            </div>
            
            <div className="p-5 space-y-4">
              {/* Doctor Info */}
              <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                  {selectedDoctor.image}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{selectedDoctor.name}</p>
                  <p className="text-sm text-gray-600">{selectedDoctor.specialization}</p>
                  <p className="text-sm text-blue-600 font-semibold">₹{formatPrice(selectedDoctor.fee)}</p>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Select Date *</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getMinDate()}
                  max={getMaxDate()}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Select Time Slot *</label>
                <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto p-1">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-2 text-sm rounded-lg border transition ${
                        selectedSlot === slot
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Symptoms (Optional)</label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Describe your symptoms"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-blue-50 rounded-xl p-3 text-sm">
                <div className="font-medium text-gray-800 mb-2">Payment Summary</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-semibold text-blue-600">₹{formatPrice(selectedDoctor.fee)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Platform Fee</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-blue-200 mt-2 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">₹{formatPrice(selectedDoctor.fee)}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowBookingModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium">
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmBooking} 
                  disabled={!selectedSlot || !selectedDate || !formData.patientName || !formData.phone || isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${formatPrice(selectedDoctor.fee)}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style >{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        @keyframes modal-pop {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
        .animate-modal-pop {
          animation: modal-pop 0.2s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default VideoConsultation;