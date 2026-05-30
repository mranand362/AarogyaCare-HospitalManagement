// Services.jsx - Professional Enterprise Grade (Fixed)
import React, { useState, useEffect,} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { createBooking } from "../api/bookingApi";

import { AuthContext } from '../context/AuthContext';

// Simulated API call
const fetchServices = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Telemedicine Consultation',
          category: 'consultation',
          icon: '💻',
          description: 'Video/audio consultation with experienced doctors from the comfort of your home.',
          duration: '15-20 mins',
          price: 499,
          originalPrice: 799,
          rating: 4.8,
          reviews: 1240,
          doctorAvailable: true,
          popular: true,
          features: ['24/7 availability', 'Prescription delivery', 'Follow-up included']
        },
        {
          id: 2,
          name: 'Full Body Health Checkup',
          category: 'diagnostics',
          icon: '🩺',
          description: 'Comprehensive 70+ parameters including liver, kidney, thyroid, and heart health.',
          duration: '1 hour',
          price: 1999,
          originalPrice: 3999,
          rating: 4.9,
          reviews: 856,
          doctorAvailable: false,
          popular: true,
          features: ['70+ tests', 'Doctor consultation', 'Detailed report']
        },
        {
          id: 3,
          name: 'Home Lab Sample Collection',
          category: 'diagnostics',
          icon: '🏠',
          description: 'Certified phlebotomist visits your home for blood/urine sample collection.',
          duration: '30 mins',
          price: 299,
          originalPrice: 499,
          rating: 4.7,
          reviews: 2341,
          doctorAvailable: false,
          popular: false,
          features: ['Free home visit', 'Digital reports', '12hr turnaround']
        },
        {
          id: 4,
          name: '24/7 Emergency Helpline',
          category: 'emergency',
          icon: '🚑',
          description: 'Round-the-clock ambulance booking and emergency doctor guidance.',
          duration: 'Immediate',
          price: 0,
          originalPrice: 0,
          rating: 4.9,
          reviews: 543,
          doctorAvailable: true,
          popular: true,
          features: ['Ambulance tracking', 'ER guidance', 'First aid support']
        },
        {
          id: 5,
          name: 'Chronic Disease Management',
          category: 'care',
          icon: '📋',
          description: 'Personalised care plans for diabetes, hypertension, asthma, and more.',
          duration: '6 months plan',
          price: 1499,
          originalPrice: 2499,
          rating: 4.6,
          reviews: 412,
          doctorAvailable: true,
          popular: false,
          features: ['Monthly checkups', 'Diet plan', 'Medication reminders']
        },
        {
          id: 6,
          name: 'Mental Wellness Counseling',
          category: 'wellness',
          icon: '🧠',
          description: 'Anonymous sessions with licensed psychologists and therapists.',
          duration: '50 mins',
          price: 899,
          originalPrice: 1299,
          rating: 4.9,
          reviews: 789,
          doctorAvailable: true,
          popular: true,
          features: ['Confidential', 'Licensed therapists', 'Flexible scheduling']
        },
        {
          id: 7,
          name: 'Pharmacy Delivery',
          category: 'pharmacy',
          icon: '💊',
          description: 'Order prescribed medicines online with same-day doorstep delivery.',
          duration: 'Same day',
          price: 0,
          originalPrice: 0,
          rating: 4.7,
          reviews: 3210,
          doctorAvailable: false,
          popular: false,
          features: ['Free delivery', 'Medicine reminders', 'Auto-refill']
        },
        {
          id: 8,
          name: 'Second Opinion Expert Panel',
          category: 'consultation',
          icon: '👨‍⚕️',
          description: 'Get a second opinion from a panel of senior specialists within 48 hours.',
          duration: '48 hours',
          price: 1299,
          originalPrice: 1999,
          rating: 4.8,
          reviews: 234,
          doctorAvailable: true,
          popular: false,
          features: ['3 expert opinions', 'Detailed analysis', 'Treatment options']
        }
      ]);
    }, 800);
  });
};

const Services = () => {
  const { user } = useContext(AuthContext);
const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Base categories without counts
  const baseCategories = [
    { id: 'all', label: 'All Services', icon: '📋' },
    { id: 'consultation', label: 'Consultation', icon: '💻' },
    { id: 'diagnostics', label: 'Diagnostics', icon: '🩺' },
    { id: 'emergency', label: 'Emergency', icon: '🚑' },
    { id: 'care', label: 'Chronic Care', icon: '📋' },
    { id: 'wellness', label: 'Wellness', icon: '🧠' },
    { id: 'pharmacy', label: 'Pharmacy', icon: '💊' },
  ];

  // Load services on mount - moved inside useEffect
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
        setFilteredServices(data);
        setLoading(false);
      } catch {
  setError('Failed to load services. Please refresh.');
  setLoading(false);
}
    };
    loadServices();
  }, []); // Empty dependency array - runs once on mount

  // Filter services when category or search changes
  useEffect(() => {
    let filtered = [...services];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term)
      );
    }
    setFilteredServices(filtered);
  }, [selectedCategory, searchTerm, services]);

  // Helper function to get category count
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') {
      return services.length;
    }
    return services.filter(s => s.category === categoryId).length;
  };

  // Helper function to get category icon
  const getCategoryIcon = (categoryId) => {
    const category = baseCategories.find(c => c.id === categoryId);
    return category?.icon || '📋';
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

const handleBookNow = (service) => {

  // User login nahi hai
  if (!user) {
    showToast('Please login first to book a service', 'error');

    setTimeout(() => {
      navigate('/login');
    }, 1000);

    return;
  }

  // Login hai to booking modal kholo
  setSelectedService(service);
  setShowModal(true);
};

 const handleBookingSubmit = async (e) => {
  e.preventDefault();
  
  if (!bookingName || !bookingPhone || !bookingDate || !bookingTime) {
    showToast('Please fill all required fields', 'error');
    return;
  }
  
  setIsSubmitting(true);
  
  try {
    // Prepare booking data
    const bookingData = {
      serviceName: selectedService.name,
      serviceId: selectedService.id,
      serviceIcon: selectedService.icon,
      price: selectedService.price,
      duration: selectedService.duration,
      patientName: bookingName,
      patientPhone: bookingPhone,
      patientEmail: user?.email || '',
      appointmentDate: bookingDate,
      appointmentTime: bookingTime,
      notes: ''
    };

    // Send to backend
    const response = await createBooking(bookingData);
    
    if (response.success) {
      showToast(`Booking confirmed for ${selectedService.name} on ${bookingDate} at ${bookingTime}`, 'success');
      setShowModal(false);
      
      // Reset form
      setBookingDate('');
      setBookingTime('');
      setBookingName('');
      setBookingPhone('');
      setSelectedService(null);
    } else {
      showToast(response.message || 'Booking failed', 'error');
    }
  } catch (error) {
    console.error('Booking error:', error);
    showToast(error.response?.data?.message || 'Booking failed. Please try again.', 'error');
  } finally {
    setIsSubmitting(false);
  }
};

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            <div className="flex justify-center gap-3 mb-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 w-24 bg-gray-200 rounded-full"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow">
                  <div className="h-14 w-14 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-9 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/30 to-gray-50 py-6 sm:py-8 md:py-12 px-4 sm:px-6">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down">
          <div className={`px-5 py-3 rounded-xl shadow-2xl text-white text-sm font-medium flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
            {toast.type === 'error' ? '❌' : '✅'} {toast.message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
{/* Header Section */}
<div className="relative bg-gradient-to-r from-teal-700 to-teal-600 text-white py-16 md:py-20 overflow-hidden rounded-3xl">
  
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="grid-services" width="10" height="10" patternUnits="userSpaceOnUse">
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid-services)" />
    </svg>
  </div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-4 text-center">

    {/* Badge */}
    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
      <span className="text-xs font-medium tracking-wide">
        ADVANCED & TRUSTED HEALTHCARE
      </span>
    </div>

    {/* Heading */}
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
      Our <span className="text-teal-200">Healthcare Services</span>
    </h1>

    {/* Description */}
    <p className="text-base sm:text-lg text-teal-100 max-w-2xl mx-auto">
      Comprehensive, affordable, and accessible healthcare delivered with
      compassion and cutting-edge technology.
    </p>

  </div>
</div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-teal-600' : 'text-gray-500'}`}
                aria-label="Grid view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-teal-600' : 'text-gray-500'}`}
                aria-label="List view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {baseCategories.map(cat => {
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-white/20' : 'bg-gray-200'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid/List */}
        {filteredServices.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map(service => (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
                >
                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    {service.popular && (
                      <div className="bg-amber-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md">
                        ⭐ Popular
                      </div>
                    )}
                    {service.originalPrice > service.price && service.price > 0 && (
                      <div className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md">
                        -{Math.round((1 - service.price / service.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-teal-600 transition-colors">{service.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-xs text-gray-400">({service.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">{service.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">⏱️ {service.duration}</span>
                      {service.doctorAvailable && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">👨‍⚕️ Doctor available</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <div>
                        {service.price === 0 ? (
                          <span className="text-teal-600 font-bold text-lg">Free</span>
                        ) : (
                          <>
                            <span className="text-teal-600 font-bold text-xl">₹{service.price.toLocaleString()}</span>
                            {service.originalPrice > service.price && (
                              <span className="text-gray-400 text-xs line-through ml-2">₹{service.originalPrice.toLocaleString()}</span>
                            )}
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => handleBookNow(service)}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
                      >
                        Book Now →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-4">
              {filteredServices.map(service => (
                <div key={service.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform">{service.icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
                      {service.popular && <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="text-xs text-gray-500">⏱️ {service.duration}</span>
                      <span className="text-xs text-yellow-500">★ {service.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      {service.price === 0 ? (
                        <span className="text-teal-600 font-bold text-lg">Free</span>
                      ) : (
                        <>
                          <span className="text-teal-600 font-bold text-xl">₹{service.price.toLocaleString()}</span>
                          {service.originalPrice > service.price && (
                            <span className="text-gray-400 text-xs line-through ml-2">₹{service.originalPrice.toLocaleString()}</span>
                          )}
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => handleBookNow(service)}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all"
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
            <p className="text-gray-500 text-lg">No services match your criteria.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-4 text-teal-600 hover:text-teal-700 font-medium inline-flex items-center gap-1"
            >
              Clear filters →
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-teal-700 to-teal-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-10 sm:p-10 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Need a custom health plan?</h2>
              <p className="text-teal-100 mt-2 max-w-md text-sm sm:text-base">
                Talk to our care coordinator for personalized service bundles or corporate packages.
              </p>
            </div>
            <div className="mt-6 sm:mt-0">
              <button className="bg-white text-teal-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                Contact Care Team
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-center text-gray-600">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-teal-600 text-lg">✓</span>
            <span>10,000+ Happy Patients</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-teal-600 text-lg">✓</span>
            <span>ISO 27001 Certified</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-teal-600 text-lg">✓</span>
            <span>NABL Accredited Labs</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-teal-600 text-lg">✓</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Booking Modal - Enhanced */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-modal-pop" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{selectedService.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedService.name}</h3>
                  <p className="text-gray-500 text-sm">{selectedService.duration}</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleBookingSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="10-digit mobile number"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Select Date *</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Select Time *</label>
                <input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600">
                <div className="font-medium mb-1">Price Summary</div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span className="font-semibold">₹{selectedService.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Platform fee</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-teal-600">₹{selectedService.price.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition font-medium shadow-md disabled:opacity-50 flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
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
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
        .animate-modal-pop {
          animation: modal-pop 0.2s ease-out;
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

export default Services;