// frontend/src/pages/HomeCareServices.jsx
import React, { useState, useMemo, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createBooking } from '../api/bookingApi';

const HomeCareServices = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'All Services', icon: '📋' },
    { id: 'nursing', name: 'Nursing Care', icon: '👩‍⚕️' },
    { id: 'therapy', name: 'Therapy', icon: '💪' },
    { id: 'elderly', name: 'Elderly Care', icon: '👴' },
    { id: 'postop', name: 'Post-Surgery', icon: '🏥' },
    { id: 'equipment', name: 'Equipment', icon: '📋' },
    { id: 'diagnostics', name: 'Diagnostics', icon: '🧪' },
    { id: 'palliative', name: 'Palliative', icon: '💝' }
  ];

  const services = useMemo(() => [
    { 
      id: 1,
      name: "Nursing Care", 
      category: "nursing",
      description: "Professional nurses at your home for post-operative care, elderly care, and chronic disease management", 
      icon: "👩‍⚕️", 
      color: "bg-pink-100",
      details: "24/7 nursing care with medication management, wound care, vital monitoring, and patient education",
      price: 999,
      priceText: "₹999/day",
      duration: "Flexible hours",
      availability: "24/7",
      certified: true
    },
    { 
      id: 2,
      name: "Physiotherapy", 
      category: "therapy",
      description: "Rehabilitation at home for stroke, orthopedic conditions, and mobility issues", 
      icon: "💪", 
      color: "bg-blue-100",
      details: "Customized exercise programs, pain management, mobility training, and fall prevention",
      price: 799,
      priceText: "₹799/session",
      duration: "45-60 mins",
      availability: "Morning/Evening",
      certified: true
    },
    { 
      id: 3,
      name: "Elderly Care", 
      category: "elderly",
      description: "Specialized care for seniors including companionship, medication management, and daily assistance", 
      icon: "👴", 
      color: "bg-green-100",
      details: "Companionship, meal preparation, medication reminders, bathing assistance, and social engagement",
      price: 599,
      priceText: "₹599/day",
      duration: "Full day",
      availability: "24/7",
      certified: true
    },
    { 
      id: 4,
      name: "Post-Surgery Care", 
      category: "postop",
      description: "Recovery support at home with wound care, medication, and physiotherapy", 
      icon: "🏥", 
      color: "bg-purple-100",
      details: "Wound dressing, suture removal, pain management, mobility support, and follow-up coordination",
      price: 1199,
      priceText: "₹1199/day",
      duration: "As needed",
      availability: "24/7",
      certified: true
    },
    { 
      id: 5,
      name: "Medical Equipment", 
      category: "equipment",
      description: "Hospital beds, wheelchairs, oxygen cylinders, and other equipment on rent", 
      icon: "📋", 
      color: "bg-yellow-100",
      details: "Oxygen concentrators, hospital beds, wheelchairs, walkers, commodes, and monitoring devices",
      price: 0,
      priceText: "Varies",
      duration: "Daily/Weekly/Monthly",
      availability: "Same-day delivery",
      certified: false
    },
    { 
      id: 6,
      name: "Sample Collection", 
      category: "diagnostics",
      description: "Lab tests at home with convenient appointment scheduling", 
      icon: "🧪", 
      color: "bg-orange-100",
      details: "Blood tests, urine analysis, COVID testing, and health checkup packages at home",
      price: 0,
      priceText: "Free collection + test charges",
      duration: "30 mins",
      availability: "Morning slots",
      certified: true
    },
    { 
      id: 7,
      name: "Doctor Home Visit", 
      category: "diagnostics",
      description: "General physicians and specialists available for home consultations", 
      icon: "👨‍⚕️", 
      color: "bg-teal-100",
      details: "General checkup, chronic disease management, geriatric care, and pediatric visits",
      price: 1499,
      priceText: "₹1499/visit",
      duration: "30-45 mins",
      availability: "By appointment",
      certified: true
    },
    { 
      id: 8,
      name: "Palliative Care", 
      category: "palliative",
      description: "Comfort care for patients with serious illnesses", 
      icon: "💝", 
      color: "bg-red-100",
      details: "Pain management, symptom control, emotional support, and family counseling",
      price: 899,
      priceText: "₹899/day",
      duration: "Flexible",
      availability: "24/7",
      certified: true
    }
  ], []);

  // Filter services
  const filteredServices = useMemo(() => {
    let filtered = services;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(term) ||
        service.description.toLowerCase().includes(term) ||
        service.details.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [services, selectedCategory, searchTerm]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    patientAge: '',
    patientGender: '',
    medicalCondition: '',
    additionalNotes: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Fixed showToastMessage function
  const showToastMessage = (message = 'success') => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split('T')[0];
  };

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const handleBookNow = (service) => {
    setSelectedService(service);
    setFormData(prev => ({ ...prev, serviceType: service.name }));
    setShowModal(true);
  };

  // ✅ Fixed handleSubmit with backend integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.address || !formData.preferredDate) {
      showToastMessage('Please fill all required fields', 'error');
      return;
    }
    
    if (!user) {
      showToastMessage('Please login first to book a service', 'error');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        serviceName: selectedService.name,
        serviceId: selectedService.id,
        serviceIcon: selectedService.icon,
        price: selectedService.price,
        duration: selectedService.duration,
        patientName: formData.fullName,
        patientPhone: formData.phone,
        patientEmail: formData.email || user?.email || '',
        appointmentDate: formData.preferredDate,
        appointmentTime: formData.preferredTime || '9:00 AM',
        notes: `Service: ${selectedService.name}, Address: ${formData.address}, City: ${formData.city || 'N/A'}, Pincode: ${formData.pincode || 'N/A'}, Patient Age: ${formData.patientAge || 'N/A'}, Gender: ${formData.patientGender || 'N/A'}, Medical Condition: ${formData.medicalCondition || 'None'}, Additional Notes: ${formData.additionalNotes || 'None'}`
      };

      console.log('📦 Sending home care booking:', bookingData);
      
      const response = await createBooking(bookingData);
      console.log('📥 Response:', response);
      
      if (response.success) {
        showToastMessage(`✅ ${selectedService.name} booked successfully! Our team will contact you within 30 minutes.`, 'success');
        setShowModal(false);
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          pincode: '',
          serviceType: '',
          preferredDate: '',
          preferredTime: '',
          patientAge: '',
          patientGender: '',
          medicalCondition: '',
          additionalNotes: ''
        });
        setSelectedService(null);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down">
          <div className={`px-6 py-3 rounded-xl shadow-2xl text-white text-sm font-medium flex items-center gap-2 ${toastMessage.includes('✅') ? 'bg-green-600' : 'bg-red-600'}`}>
            {toastMessage}
          </div>
        </div>
      )}

      {/* Hero Section - Enhanced */}
      <div className="relative bg-gradient-to-r from-green-700 via-green-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wide">CARE AT YOUR DOORSTEP</span>
          </div>

          <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 animate-float">
            <svg className="w-12 h-12 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Home <span className="text-green-200">Care Services</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
            Quality healthcare delivered to your doorstep. Comfortable recovery in your own home.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-lg">👩‍⚕️</span>
              <span>100+ Trained Nurses</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-lg">🏠</span>
              <span>5000+ Happy Families</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-lg">⭐</span>
              <span>4.9 Rating</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-green-50" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="currentColor">
            <path d="M0 22L60 25.5C120 29 240 36 360 36C480 36 600 29 720 27.5C840 26 960 29 1080 32C1200 35 1320 38 1380 39.5L1440 41V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
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
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-teal-600' : 'text-gray-500'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-teal-600' : 'text-gray-500'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Found <span className="font-bold text-teal-600">{filteredServices.length}</span> home care services
          </p>
        </div>

        {/* Services Grid/List */}
        {filteredServices.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <div key={service.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                  <div className="p-5">
                    <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 text-center mb-2 group-hover:text-teal-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm text-center mb-3">{service.description}</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {service.certified && (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">✓ Certified</span>
                      )}
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{service.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-lg font-bold text-teal-600">{service.priceText}</span>
                      </div>
                      <button
                        onClick={() => handleBookNow(service)}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg"
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
              {filteredServices.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{service.name}</h3>
                    <p className="text-gray-500 text-sm">{service.description}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs text-gray-500">⏱️ {service.duration}</span>
                      {service.certified && <span className="text-xs text-green-600">✓ Certified</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-teal-600">{service.priceText}</div>
                    </div>
                    <button
                      onClick={() => handleBookNow(service)}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all"
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

        {/* Why Choose Us Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Our Home Care Services?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                ✅
              </div>
              <p className="font-semibold text-gray-800">Trained Professionals</p>
              <p className="text-gray-500 text-xs">Certified and experienced staff</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                🕐
              </div>
              <p className="font-semibold text-gray-800">24/7 Availability</p>
              <p className="text-gray-500 text-xs">Round the clock service</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                💰
              </div>
              <p className="font-semibold text-gray-800">Affordable Pricing</p>
              <p className="text-gray-500 text-xs">Cost-effective care plans</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                📋
              </div>
              <p className="font-semibold text-gray-800">Personalized Care</p>
              <p className="text-gray-500 text-xs">Customized care plans</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-center text-gray-600">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-teal-600 text-lg">✓</span>
            <span>ISO Certified</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-teal-600 text-lg">✓</span>
            <span>Background Verified Staff</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-teal-600 text-lg">✓</span>
            <span>Insurance Covered</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-teal-600 text-lg">✓</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-700 py-12 mt-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Home Care Services?</h2>
          <p className="text-teal-100 mb-6">Call us or book online for immediate home care assistance</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+9118001234567" className="group bg-white text-teal-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:scale-105">
              <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now: +91 1800 123 4567
            </a>
            <Link to="/appointment" className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Online
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-modal-pop max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white rounded-t-2xl sticky top-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Book Home Care Service</h3>
                  <p className="text-gray-500 text-sm">{selectedService.name}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Service Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="2"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Complete address for service delivery"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Pincode"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={getMinDate()}
                    max={getMaxDate()}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Preferred Time</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Patient Age</label>
                  <input
                    type="number"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleInputChange}
                    placeholder="Age"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Gender</label>
                  <select
                    name="patientGender"
                    value={formData.patientGender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Medical Condition (Optional)</label>
                <input
                  type="text"
                  name="medicalCondition"
                  value={formData.medicalCondition}
                  onChange={handleInputChange}
                  placeholder="e.g., Diabetes, Hypertension, Post-surgery"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Any specific requirements or instructions"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="bg-teal-50 rounded-xl p-3 text-sm">
                <div className="font-medium text-gray-800 mb-2">Service Summary</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{selectedService.name}</span>
                  <span className="font-semibold text-teal-600">{selectedService.priceText}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">⏱️ {selectedService.duration}</div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition font-medium shadow-md disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
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
      `}</style>
    </div>
  );
};

export default HomeCareServices;