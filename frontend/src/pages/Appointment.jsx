// Appointment.jsx - Complete file with API integration
import React, { useState, useEffect, useRef, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createAppointment } from '../api/appointmentApi';
import { useAuth } from '../hooks/useAuth';

// Import doctor images (same as Doctors.jsx)
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

// Doctor data matching Doctors.jsx
const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    image: doctor1,
    rating: 4.9,
    experience: 15,
    fee: 1500,
    available: true,
    qualification: "MD, FACC - Cardiology"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    image: doctor2,
    rating: 4.8,
    experience: 12,
    fee: 1800,
    available: true,
    qualification: "MD, PhD - Neurology"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Orthopedics",
    image: doctor3,
    rating: 4.9,
    experience: 10,
    fee: 1600,
    available: false,
    qualification: "MS - Orthopedics"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Pediatrics",
    image: doctor4,
    rating: 5.0,
    experience: 8,
    fee: 1200,
    available: true,
    qualification: "MD - Pediatrics"
  },
  {
    id: 5,
    name: "Dr. Priya Sharma",
    specialty: "Dermatology",
    image: doctor5,
    rating: 4.7,
    experience: 9,
    fee: 1400,
    available: true,
    qualification: "MD - Dermatology"
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    specialty: "Ophthalmology",
    image: doctor6,
    rating: 4.8,
    experience: 14,
    fee: 1700,
    available: false,
    qualification: "MS - Ophthalmology"
  },
  {
    id: 7,
    name: "Dr. Lisa Anderson",
    specialty: "Cardiology",
    image: doctor7,
    rating: 4.9,
    experience: 11,
    fee: 1600,
    available: true,
    qualification: "MD, FACC - Cardiology"
  },
  {
    id: 8,
    name: "Dr. David Kim",
    specialty: "Neurology",
    image: doctor8,
    rating: 4.6,
    experience: 13,
    fee: 1900,
    available: true,
    qualification: "MD, PhD - Neurology"
  },
  {
    id: 9,
    name: "Dr. Maria Garcia",
    specialty: "Orthopedics",
    image: doctor9,
    rating: 4.8,
    experience: 7,
    fee: 1500,
    available: true,
    qualification: "MS - Orthopedics"
  },
  {
    id: 10,
    name: "Dr. Thomas Brown",
    specialty: "Pediatrics",
    image: doctor10,
    rating: 4.9,
    experience: 10,
    fee: 1300,
    available: false,
    qualification: "MD - Pediatrics"
  },
  {
    id: 11,
    name: "Dr. Rachel Green",
    specialty: "Dermatology",
    image: doctor11,
    rating: 4.8,
    experience: 6,
    fee: 1450,
    available: true,
    qualification: "MD - Dermatology"
  },
  {
    id: 12,
    name: "Dr. William Turner",
    specialty: "Ophthalmology",
    image: doctor12,
    rating: 4.7,
    experience: 9,
    fee: 1650,
    available: true,
    qualification: "MS - Ophthalmology"
  }
];

// Memoized Time Slot Component
const TimeSlotButton = memo(({ time, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(time)}
      className={`py-2.5 px-3 rounded-lg border transition-all duration-300 transform hover:-translate-y-0.5 ${
        isSelected
          ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white border-teal-600 shadow-md'
          : 'border-gray-300 text-gray-700 hover:border-teal-400 hover:bg-teal-50'
      }`}
    >
      {time}
    </button>
  );
});

TimeSlotButton.displayName = 'TimeSlotButton';

// Memoized Doctor Selection Card
const DoctorSelectionCard = memo(({ doctor, isSelected, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onSelect(doctor.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 ${
        isSelected
          ? 'ring-2 ring-teal-500 shadow-xl scale-[1.02]'
          : 'shadow-lg hover:shadow-2xl'
      }`}
    >
      <div className="bg-white h-full">
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

          {/* Selected Overlay */}
          {isSelected && (
            <div className="absolute inset-0 bg-teal-600/20 flex items-center justify-center">
              <div className="bg-teal-600 rounded-full p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Doctor Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
            {doctor.name}
          </h3>
          <p className="text-teal-600 font-semibold text-sm mb-2">
            {doctor.specialty}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-sm font-semibold text-gray-900">{doctor.rating}</span>
              </div>
              <span className="text-xs text-gray-500">{doctor.experience} yrs exp</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Consultation</p>
              <p className="text-lg font-bold text-gray-900">₹{doctor.fee}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

DoctorSelectionCard.displayName = 'DoctorSelectionCard';

// Memoized Summary Card
const BookingSummary = memo(({ doctor, date, time, patientDetails, onEdit }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not selected';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 sticky top-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Booking Summary
      </h3>
      
      <div className="space-y-4">
        {/* Doctor Info */}
        <div className="flex items-center gap-3 pb-3 border-b border-teal-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white font-bold text-lg">
            {doctor?.name?.charAt(0) || 'D'}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{doctor?.name}</p>
            <p className="text-sm text-gray-600">{doctor?.specialty}</p>
          </div>
          <button
            onClick={() => onEdit('doctor')}
            className="text-teal-600 hover:text-teal-700 text-sm font-semibold"
          >
            Edit
          </button>
        </div>

        {/* Date & Time */}
        <div className="pb-3 border-b border-teal-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold text-gray-900">{formatDate(date)}</p>
            </div>
            <button
              onClick={() => onEdit('datetime')}
              className="text-teal-600 hover:text-teal-700 text-sm font-semibold"
            >
              Edit
            </button>
          </div>
          {time && (
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-semibold text-gray-900">{time}</p>
              </div>
            </div>
          )}
        </div>

        {/* Patient Info */}
        {patientDetails.fullName && (
          <div className="pb-3 border-b border-teal-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-600">Patient Name</p>
                <p className="font-semibold text-gray-900">{patientDetails.fullName}</p>
              </div>
              <button
                onClick={() => onEdit('details')}
                className="text-teal-600 hover:text-teal-700 text-sm font-semibold"
              >
                Edit
              </button>
            </div>
            {patientDetails.age && (
              <p className="text-sm text-gray-600">Age: {patientDetails.age} years</p>
            )}
            {patientDetails.gender && (
              <p className="text-sm text-gray-600">Gender: {patientDetails.gender}</p>
            )}
          </div>
        )}

        {/* Fee */}
        <div className="pt-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Consultation Fee</p>
            <p className="text-xl font-bold text-gray-900">₹{doctor?.fee || 0}</p>
          </div>
          <div className="flex justify-between items-center mt-1 pt-2 border-t border-teal-200">
            <p className="font-semibold text-gray-900">Total Amount</p>
            <p className="text-2xl font-bold text-teal-600">₹{doctor?.fee || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

BookingSummary.displayName = 'BookingSummary';

// Main Appointment Component
const Appointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMounted = useRef(true);
  const { user } = useAuth(); // Get logged in user
  
  // State Management
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [bookingId, setBookingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get doctor ID from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const doctorId = params.get('doctor');
    if (doctorId) {
      const doctor = doctorsData.find(d => d.id === parseInt(doctorId));
      if (doctor) {
        setSelectedDoctor(doctor);
        setStep(2);
      }
    }
  }, [location]);

  // Auto-fill patient details if user is logged in
  useEffect(() => {
    if (user && step === 3) {
      setPatientDetails(prev => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user, step]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Generate time slots based on selected date
  useEffect(() => {
    if (!selectedDoctor || !selectedDate) {
      setTimeSlots([]);
      return;
    }

    let isActive = true;
    setLoadingSlots(true);
    setSelectedTime('');

    // Simulate API call to fetch time slots
    const loadTimeSlots = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!isActive) return;
      
      const baseSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
      // Randomly filter slots based on availability (80% chance each slot is available)
      const available = baseSlots.filter(() => Math.random() > 0.2);
      
      if (isActive) {
        setTimeSlots(available);
        setLoadingSlots(false);
      }
    };
    
    loadTimeSlots();
    
    return () => {
      isActive = false;
    };
  }, [selectedDoctor, selectedDate]);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      if (isMounted.current) {
        setToast({ show: false, message: '', type: '' });
      }
    }, 3000);
  };

  // Navigation handlers
  const handleDoctorSelect = (doctorId) => {
    const doctor = doctorsData.find(d => d.id === doctorId);
    setSelectedDoctor(doctor);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const proceedToDetails = () => {
    if (!selectedDate) {
      showToast('Please select a date', 'error');
      return;
    }
    if (!selectedTime) {
      showToast('Please select a time slot', 'error');
      return;
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePatientDetails = () => {
    const newErrors = {};
    if (!patientDetails.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!patientDetails.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(patientDetails.email)) newErrors.email = 'Please enter a valid email address';
    if (!patientDetails.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(patientDetails.phone)) newErrors.phone = 'Please enter a valid 10-digit mobile number';
    if (!patientDetails.age) newErrors.age = 'Age is required';
    else if (patientDetails.age < 0 || patientDetails.age > 120) newErrors.age = 'Please enter a valid age (1-120)';
    if (!patientDetails.gender) newErrors.gender = 'Please select gender';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ========== MODIFIED handleBookingSubmit FUNCTION ==========
  const handleBookingSubmit = async () => {
    if (!validatePatientDetails()) return;
    
    // Check if user is logged in
    if (!user) {
      showToast('Please login to book an appointment', 'error');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const appointmentData = {
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        doctorSpecialty: selectedDoctor.specialty,
        doctorFee: selectedDoctor.fee,
        patientName: patientDetails.fullName,
        patientEmail: patientDetails.email,
        patientPhone: patientDetails.phone,
        patientAge: parseInt(patientDetails.age),
        patientGender: patientDetails.gender,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        notes: patientDetails.notes || ''
      };
      
      console.log('Sending appointment data:', appointmentData); // Debug log
      
      const response = await createAppointment(appointmentData);
      
      console.log('API Response:', response); // Debug log
      
      if (response.success && response.appointment) {
        setBookingId(response.appointment.bookingId);
        setStep(4);
        showToast('Appointment booked successfully!', 'success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Booking failed. Please try again.';
      showToast(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  // ========== END OF MODIFIED FUNCTION ==========

  const resetBooking = () => {
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setPatientDetails({
      fullName: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      notes: '',
    });
    setBookingId(null);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  // Step 1: Doctor Selection
  const renderStep1 = () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Choose Your <span className="text-teal-600">Doctor</span>
        </h2>
        <p className="text-gray-600">Select from our experienced medical specialists</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctorsData.map(doctor => (
          <DoctorSelectionCard
            key={doctor.id}
            doctor={doctor}
            isSelected={selectedDoctor?.id === doctor.id}
            onSelect={handleDoctorSelect}
          />
        ))}
      </div>
    </div>
  );

  // Step 2: Date & Time Selection
  const renderStep2 = () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Doctors
        </button>
        <div className="flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse"></div>
          <span className="text-sm text-teal-700 font-medium">Step 2 of 4</span>
        </div>
      </div>

      {/* Selected Doctor Info */}
      <div className="mb-8 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white font-bold text-xl">
            {selectedDoctor?.name?.charAt(0) || 'D'}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{selectedDoctor?.name}</h3>
            <p className="text-teal-600 font-medium">{selectedDoctor?.specialty}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-600">⭐ {selectedDoctor?.rating}</span>
              <span className="text-sm text-gray-600">{selectedDoctor?.experience} yrs experience</span>
              <span className="text-sm font-semibold text-gray-900">₹{selectedDoctor?.fee}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Date Selection */}
        <div>
          <label className="block text-gray-900 font-semibold mb-3">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={getMinDate()}
            max={getMaxDate()}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
          />
          <p className="text-xs text-gray-500 mt-2">
            * Appointments can be booked up to 30 days in advance
          </p>
        </div>

        {/* Time Slots */}
        <div>
          <label className="block text-gray-900 font-semibold mb-3">
            Available Time Slots
          </label>
          {!selectedDate ? (
            <div className="text-center py-8 bg-gray-50 rounded-xl">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500">Please select a date first</p>
            </div>
          ) : loadingSlots ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
          ) : timeSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map(time => (
                <TimeSlotButton
                  key={time}
                  time={time}
                  isSelected={selectedTime === time}
                  onSelect={handleTimeSelect}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-xl">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500">No slots available for this date</p>
              <p className="text-sm text-gray-400 mt-1">Please select another date</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={proceedToDetails}
          disabled={!selectedDate || !selectedTime}
          className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
        >
          Proceed to Patient Details
          <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );

  // Step 3: Patient Details
  const renderStep3 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
      {/* Form Section */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Time Slots
            </button>
            <div className="flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
              <span className="text-sm text-teal-700 font-medium">Step 3 of 4</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Information</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={patientDetails.fullName}
                  onChange={handlePatientChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all ${
                    errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={patientDetails.email}
                  onChange={handlePatientChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={patientDetails.phone}
                  onChange={handlePatientChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all ${
                    errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="10-digit mobile number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={patientDetails.age}
                  onChange={handlePatientChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all ${
                    errors.age ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Age in years"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={patientDetails.gender}
                  onChange={handlePatientChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all ${
                    errors.gender ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={patientDetails.notes}
                onChange={handlePatientChange}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                placeholder="Any symptoms, concerns, or special requests you'd like to share with the doctor..."
              ></textarea>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleBookingSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none inline-flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Confirm Booking
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="lg:col-span-1">
        <BookingSummary
          doctor={selectedDoctor}
          date={selectedDate}
          time={selectedTime}
          patientDetails={patientDetails}
          onEdit={(section) => {
            if (section === 'doctor') setStep(1);
            if (section === 'datetime') setStep(2);
            if (section === 'details') window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    </div>
  );

  // Step 4: Confirmation
  const renderStep4 = () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fadeIn text-center">
      <div className="max-w-2xl mx-auto">
        {/* Success Animation */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Appointment Confirmed! 🎉
        </h2>
        <p className="text-gray-600 mb-8">
          Your appointment has been successfully booked. A confirmation has been sent to your email.
        </p>

        {/* Booking Details Card */}
        <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 text-left mb-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-teal-200">
            <h3 className="text-lg font-bold text-gray-900">Booking Details</h3>
            <span className="text-xs font-mono bg-white px-3 py-1 rounded-full text-teal-700">
              ID: {bookingId}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Doctor:</span>
              <span className="font-semibold text-gray-900">{selectedDoctor?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Specialty:</span>
              <span className="text-gray-900">{selectedDoctor?.specialty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold text-gray-900">{formatDate(selectedDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-semibold text-gray-900">{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Patient:</span>
              <span className="text-gray-900">{patientDetails.fullName}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-teal-200">
              <span className="font-semibold text-gray-900">Total Amount:</span>
              <span className="text-xl font-bold text-teal-600">₹{selectedDoctor?.fee}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetBooking}
            className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Book Another Appointment
          </button>
          <button
            onClick={() => window.print()}
            className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Print Confirmation
          </button>
          <button
            onClick={() => navigate('/doctors')}
            className="border-2 border-gray-300 text-gray-700 hover:border-teal-600 hover:text-teal-600 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Browse More Doctors
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-full mb-6 animate-fadeIn">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <span className="text-gray-700 text-sm font-semibold">Book Appointment</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Schedule Your </span>
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              Consultation
            </span>
          </h1>
          
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Book appointments with our experienced doctors easily and securely. 
            Choose your preferred doctor, select a convenient time slot, and confirm your booking in minutes.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: 'Select Doctor', icon: '👨‍⚕️' },
              { step: 2, label: 'Choose Slot', icon: '📅' },
              { step: 3, label: 'Your Details', icon: '📝' },
              { step: 4, label: 'Confirm', icon: '✅' }
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    step > item.step
                      ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg'
                      : step === item.step
                      ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white ring-4 ring-teal-200 shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > item.step ? '✓' : item.icon}
                </div>
                <span className={`text-xs mt-2 font-medium hidden sm:block ${
                  step >= item.step ? 'text-teal-600' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="relative mt-4">
            <div className="absolute top-0 left-0 h-1.5 bg-gray-200 w-full rounded-full"></div>
            <div
              className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-teal-600 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Toast Notification */}
        {toast.show && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down">
            <div className={`px-6 py-3 rounded-xl shadow-2xl text-white text-sm font-semibold flex items-center gap-2 ${
              toast.type === 'error' 
                ? 'bg-gradient-to-r from-red-600 to-red-500' 
                : 'bg-gradient-to-r from-green-600 to-green-500'
            }`}>
              {toast.type === 'error' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {toast.message}
            </div>
          </div>
        )}

        {/* Step Renderer */}
        {step === 1 && renderStep1()}
        {step === 2 && selectedDoctor && renderStep2()}
        {step === 3 && selectedDoctor && renderStep3()}
        {step === 4 && renderStep4()}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Appointment;