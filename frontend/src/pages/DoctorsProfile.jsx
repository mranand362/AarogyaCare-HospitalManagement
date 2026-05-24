// frontend/src/pages/DoctorsProfile.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createBooking } from '../api/bookingApi';
import { toast } from 'react-toastify';

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

const DoctorsProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [activeTab, setActiveTab] = useState('about');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      patientName: "Rajesh Kumar",
      rating: 5,
      date: "2024-03-15",
      comment: "Excellent doctor! Very knowledgeable and caring. Explained everything in detail. Highly recommended!",
      avatar: "R"
    },
    {
      id: 2,
      patientName: "Priya Sharma",
      rating: 5,
      date: "2024-03-10",
      comment: "Great experience. The doctor listened to all my concerns and provided excellent treatment.",
      avatar: "P"
    },
    {
      id: 3,
      patientName: "Amit Patel",
      rating: 4,
      date: "2024-03-05",
      comment: "Very professional and friendly. Would recommend to others.",
      avatar: "A"
    },
    {
      id: 4,
      patientName: "Sneha Reddy",
      rating: 5,
      date: "2024-02-28",
      comment: "Best doctor I've ever consulted. Very patient and understanding.",
      avatar: "S"
    }
  ]);

  // Complete doctors data
  const doctorsData = {
    1: {
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
      education: "MBBS from AIIMS Delhi, MD from Johns Hopkins University",
      languages: ["English", "Spanish", "French"],
      about: "Dr. Sarah Johnson is a renowned cardiologist with over 15 years of experience in treating complex heart conditions.",
      achievements: [
        "Best Cardiologist Award 2023",
        "Published 25+ research papers",
        "Gold Medalist in MD Cardiology"
      ],
      timings: "Monday to Saturday: 10:00 AM - 5:00 PM",
      experience_detail: [
        "Senior Consultant Cardiologist at AarogyaCare Hospital (2018-Present)",
        "Chief Cardiologist at City Heart Institute (2010-2018)"
      ],
      education_detail: [
        "Fellowship in Interventional Cardiology - Mayo Clinic",
        "MD in Cardiology - Johns Hopkins University",
        "MBBS - AIIMS Delhi"
      ]
    },
    2: {
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
      education: "MBBS from Stanford, MD from Harvard",
      languages: ["English", "Mandarin", "Spanish"],
      about: "Dr. Michael Chen is a leading neurologist specializing in stroke management and neurodegenerative disorders.",
      achievements: [
        "Young Achiever Award 2022",
        "20+ International Publications",
        "Stroke Research Excellence Award"
      ],
      timings: "Monday to Friday: 9:00 AM - 4:00 PM",
      experience_detail: [
        "Head of Neurology at AarogyaCare (2019-Present)",
        "Senior Neurologist at NeuroCare Institute (2013-2019)"
      ],
      education_detail: [
        "PhD in Neuroscience - MIT",
        "MD - Harvard Medical School",
        "MBBS - Stanford University"
      ]
    },
    3: {
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
      education: "MBBS from UCLA, MS in Orthopedics from Stanford",
      languages: ["English", "Spanish"],
      about: "Dr. Emily Rodriguez is an expert orthopedic surgeon specializing in joint replacement and sports medicine.",
      achievements: [
        "Best Orthopedic Surgeon Award",
        "Fellow of American Academy of Orthopedic Surgeons"
      ],
      timings: "Tuesday to Saturday: 11:00 AM - 6:00 PM",
      experience_detail: [
        "Senior Orthopedic Surgeon at AarogyaCare (2020-Present)",
        "Consultant at Sports Medicine Clinic (2015-2020)"
      ],
      education_detail: [
        "MS in Orthopedics - Stanford University",
        "MBBS - UCLA"
      ]
    },
    4: {
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
      education: "MBBS from Boston University, MD from Harvard",
      languages: ["English", "French"],
      about: "Dr. James Wilson is a compassionate pediatrician dedicated to child health and development.",
      achievements: [
        "Best Pediatrician Award 2023",
        "Child Health Advocate Award"
      ],
      timings: "Monday to Saturday: 9:00 AM - 5:00 PM",
      experience_detail: [
        "Consultant Pediatrician at AarogyaCare (2021-Present)",
        "Residency at Children's Hospital Boston"
      ],
      education_detail: [
        "MD in Pediatrics - Harvard Medical School",
        "MBBS - Boston University"
      ]
    },
    5: {
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
      education: "MBBS from Mumbai University, MD from AIIMS Delhi",
      languages: ["English", "Hindi", "Marathi"],
      about: "Dr. Priya Sharma is a leading dermatologist specializing in cosmetic dermatology and skin cancer screening.",
      achievements: [
        "Cosmetic Dermatology Specialist",
        "Best Dermatologist Award 2022"
      ],
      timings: "Monday to Friday: 10:00 AM - 7:00 PM",
      experience_detail: [
        "Consultant Dermatologist at AarogyaCare (2019-Present)",
        "Senior Resident at AIIMS Delhi"
      ],
      education_detail: [
        "MD in Dermatology - AIIMS Delhi",
        "MBBS - Mumbai University"
      ]
    },
    6: {
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
      education: "MBBS from Cornell, MS from Johns Hopkins",
      languages: ["English"],
      about: "Dr. Robert Taylor is an experienced ophthalmologist specializing in cataract surgery and LASIK procedures.",
      achievements: [
        "Fellow of American Academy of Ophthalmology",
        "Best Eye Surgeon Award"
      ],
      timings: "Monday to Saturday: 8:00 AM - 3:00 PM",
      experience_detail: [
        "Chief Ophthalmologist at AarogyaCare (2016-Present)",
        "Senior Surgeon at Eye Care Center"
      ],
      education_detail: [
        "MS in Ophthalmology - Johns Hopkins University",
        "MBBS - Cornell University"
      ]
    },
    7: {
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
      education: "MBBS from Yale, MD from Stanford",
      languages: ["English", "German"],
      about: "Dr. Lisa Anderson is a cardiology specialist with expertise in preventive cardiology and heart failure management.",
      achievements: [
        "Women in Cardiology Award",
        "Heart Health Advocate Award"
      ],
      timings: "Monday to Friday: 9:00 AM - 5:00 PM",
      experience_detail: [
        "Consultant Cardiologist at AarogyaCare (2018-Present)",
        "Clinical Fellow at Stanford Medical Center"
      ],
      education_detail: [
        "MD in Cardiology - Stanford University",
        "MBBS - Yale University"
      ]
    },
    8: {
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
      education: "MBBS from Columbia, PhD from MIT",
      languages: ["English", "Korean"],
      about: "Dr. David Kim is a neurologist specializing in epilepsy and movement disorders.",
      achievements: [
        "Epilepsy Research Award",
        "Neurology Excellence Award"
      ],
      timings: "Tuesday to Saturday: 10:00 AM - 6:00 PM",
      experience_detail: [
        "Senior Neurologist at AarogyaCare (2017-Present)",
        "Research Fellow at MIT"
      ],
      education_detail: [
        "PhD in Neuroscience - MIT",
        "MD - Columbia University"
      ]
    },
    9: {
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
      education: "MBBS from UC, MS from Stanford",
      languages: ["English", "Spanish", "Portuguese"],
      about: "Dr. Maria Garcia is a skilled orthopedic surgeon specializing in sports medicine and arthroscopic surgery.",
      achievements: [
        "Sports Medicine Specialist",
        "Best Young Orthopedic Surgeon"
      ],
      timings: "Monday to Friday: 9:00 AM - 6:00 PM",
      experience_detail: [
        "Consultant Orthopedic Surgeon at AarogyaCare (2020-Present)",
        "Sports Medicine Fellow at Stanford"
      ],
      education_detail: [
        "MS in Orthopedics - Stanford University",
        "MBBS - University of California"
      ]
    },
    10: {
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
      education: "MBBS from Michigan, MD from Johns Hopkins",
      languages: ["English"],
      about: "Dr. Thomas Brown is a dedicated pediatrician who has been caring for children for over a decade.",
      achievements: [
        "Developmental Pediatrics Expert",
        "Best Pediatrician - Patient Choice Award"
      ],
      timings: "Monday to Thursday: 10:00 AM - 4:00 PM",
      experience_detail: [
        "Senior Pediatrician at AarogyaCare (2018-Present)",
        "Developmental Pediatrics Fellow at Johns Hopkins"
      ],
      education_detail: [
        "MD in Pediatrics - Johns Hopkins University",
        "MBBS - University of Michigan"
      ]
    },
    11: {
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
      education: "MBBS from UPenn, MD from NYU",
      languages: ["English", "Hebrew"],
      about: "Dr. Rachel Green is a young and dynamic dermatologist specializing in cosmetic procedures.",
      achievements: [
        "Cosmetic Dermatology Fellowship",
        "Rising Star in Dermatology Award"
      ],
      timings: "Monday to Saturday: 11:00 AM - 7:00 PM",
      experience_detail: [
        "Consultant Dermatologist at AarogyaCare (2021-Present)",
        "Cosmetic Dermatology Fellow at NYU"
      ],
      education_detail: [
        "MD in Dermatology - NYU",
        "MBBS - University of Pennsylvania"
      ]
    },
    12: {
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
      education: "MBBS from Chicago, MS from Columbia",
      languages: ["English", "Dutch"],
      about: "Dr. William Turner is an experienced ophthalmologist specializing in retina disorders.",
      achievements: [
        "Retina Specialist Certification",
        "Diabetic Eye Care Excellence Award"
      ],
      timings: "Monday to Friday: 9:00 AM - 5:00 PM",
      experience_detail: [
        "Senior Ophthalmologist at AarogyaCare (2019-Present)",
        "Retina Fellow at Columbia University"
      ],
      education_detail: [
        "MS in Ophthalmology - Columbia University",
        "MBBS - University of Chicago"
      ]
    }
  };

  useEffect(() => {
    const doctorData = doctorsData[id];
    if (doctorData) {
      setDoctor(doctorData);
      // Auto-fill patient name and email from user if logged in
      if (user) {
        setPatientName(user.name || '');
        setPatientEmail(user.email || '');
        setPatientPhone(user.phone || '');
      }
    }
    setLoading(false);
  }, [id, user]);

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBookAppointment = () => {
    if (!user) {
      showToastMessage('Please login first to book an appointment', 'error');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      showToastMessage('Please select date and time', 'error');
      return;
    }
    
    if (!patientName || !patientPhone) {
      showToastMessage('Please enter your name and phone number', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        serviceName: `Consultation with ${doctor.name} (${doctor.specialty})`,
        serviceId: doctor.id,
        serviceIcon: "👨‍⚕️",
        price: doctor.fee,
        duration: "30 mins",
        patientName: patientName,
        patientPhone: patientPhone,
        patientEmail: patientEmail || user?.email || '',
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        notes: `Doctor: ${doctor.name}\nSpecialty: ${doctor.specialty}\nAge: ${patientAge || 'N/A'}\nGender: ${patientGender || 'N/A'}\nSymptoms: ${symptoms || 'None'}`
      };

      console.log('📦 Sending booking data:', bookingData);

      const response = await createBooking(bookingData);
      
      console.log('📥 Response:', response);
      
      if (response.success) {
        showToastMessage(`✅ Appointment booked with ${doctor.name} on ${selectedDate} at ${selectedTime}`, 'success');
        setShowBookingModal(false);
        
        // Reset form
        setSelectedDate('');
        setSelectedTime('');
        setPatientName(user?.name || '');
        setPatientPhone('');
        setPatientEmail(user?.email || '');
        setPatientAge('');
        setPatientGender('');
        setSymptoms('');
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

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM"
  ];

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctor not found</h2>
          <Link to="/doctors" className="text-teal-600 hover:text-teal-700 font-semibold">
            ← Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/30 to-white pb-12">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down">
          <div className={`px-6 py-3 rounded-xl shadow-2xl text-white text-sm font-medium ${toastMessage.includes('✅') ? 'bg-green-600' : 'bg-red-600'}`}>
            {toastMessage}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-700 to-teal-600 text-white pt-20 pb-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{doctor.name}</h1>
              <p className="text-teal-100 text-lg mb-3">{doctor.specialty}</p>
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-1">
                  {renderStars(doctor.rating)}
                  <span className="ml-1 text-white">{doctor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{doctor.experience}+ Years Experience</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${doctor.available ? 'bg-green-500' : 'bg-gray-500'}`}>
                  {doctor.available ? 'Available Today' : 'Currently Unavailable'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('about')}
                  className={`px-4 py-2 font-medium transition-colors ${activeTab === 'about' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  About Doctor
                </button>
                <button
                  onClick={() => setActiveTab('experience')}
                  className={`px-4 py-2 font-medium transition-colors ${activeTab === 'experience' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Experience & Education
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-4 py-2 font-medium transition-colors ${activeTab === 'reviews' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>

              {/* About Tab */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">About {doctor.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Languages Spoken</h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((lang, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">{lang}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Achievements & Awards</h4>
                    <ul className="space-y-2">
                      {doctor.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Education & Training</h3>
                    <ul className="space-y-2">
                      {doctor.education_detail.map((edu, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <svg className="w-4 h-4 text-teal-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Professional Experience</h4>
                    <ul className="space-y-3">
                      {doctor.experience_detail.map((exp, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-teal-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-gray-600">{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Consultation Timings</h4>
                    <p className="text-gray-600">{doctor.timings}</p>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">Patient Reviews</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(doctor.rating)}</div>
                      <span className="text-gray-600">{doctor.rating} out of 5</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold">
                            {review.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{review.patientName}</p>
                            <p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
                          </div>
                          <div className="flex ml-auto">{renderStars(review.rating)}</div>
                        </div>
                        <p className="text-gray-600 text-sm ml-13">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-teal-600">₹{doctor.fee}</p>
                <p className="text-gray-500 text-sm">Consultation Fee</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{doctor.experience}+ Years Experience</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{doctor.qualification}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{doctor.timings}</span>
                </div>
              </div>
              <button
                onClick={handleBookAppointment}
                disabled={!doctor.available}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${doctor.available ? 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                {doctor.available ? 'Book Appointment' : 'Not Available'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-modal-pop max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white rounded-t-2xl sticky top-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Book Appointment</h3>
                  <p className="text-gray-500 text-sm">{doctor.name} - {doctor.specialty}</p>
                </div>
                <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {/* Patient Name */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Age */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Age</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="Age"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                {/* Gender */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Select Date */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Select Date *</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getMinDate()}
                  max={getMaxDate()}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Select Time Slot */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Select Time Slot *</label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`px-3 py-2 text-sm rounded-lg border transition ${selectedTime === slot ? 'bg-teal-600 text-white border-teal-600' : 'border-gray-200 text-gray-700 hover:border-teal-400'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Symptoms (Optional)</label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows="2"
                  placeholder="Describe your symptoms"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Price Summary */}
              <div className="bg-teal-50 rounded-xl p-3 text-sm">
                <p className="font-medium text-gray-800">Consultation Fee: ₹{doctor.fee}</p>
                <p className="text-xs text-gray-500 mt-1">Video/In-person consultation available</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowBookingModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button onClick={handleConfirmBooking} disabled={isSubmitting} className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition disabled:opacity-50">
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes modal-pop {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
        .animate-modal-pop {
          animation: modal-pop 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DoctorsProfile;