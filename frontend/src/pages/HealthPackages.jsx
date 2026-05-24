// frontend/src/pages/HealthPackages.jsx
import React, { useState, useMemo, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createBooking } from '../api/bookingApi';

const HealthPackages = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);  // ✅ This is used
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Helper functions
  const showToastMessage = (message = 'success') => {
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

  const timeSlots = ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM"];

  const packages = useMemo(() => [
    {
      id: 1,
      name: 'Basic Health Checkup',
      price: 999,
      originalPrice: 1999,
      discount: '50% OFF',
      duration: '1 Hour',
      category: 'basic',
      icon: '🩺',
      tests: [
        'Complete Blood Count (CBC)',
        'Blood Sugar (Fasting & PP)',
        'Lipid Profile',
        'Liver Function Test',
        'Kidney Function Test',
        'Urine Routine',
        'Physical Examination',
        'Doctor Consultation'
      ],
      bestFor: 'Annual health screening for individuals',
      popular: true,
      preparation: '8-10 hours fasting required',
      reportTime: '24 hours'
    },
    {
      id: 2,
      name: 'Advanced Wellness Package',
      price: 2499,
      originalPrice: 4999,
      discount: '50% OFF',
      duration: '2 Hours',
      category: 'advanced',
      icon: '🔬',
      tests: [
        'Complete Blood Count (CBC)',
        'Blood Sugar (Fasting & PP)',
        'HbA1c',
        'Lipid Profile',
        'Liver Function Test',
        'Kidney Function Test',
        'Thyroid Profile (T3, T4, TSH)',
        'Vitamin B12 & D3',
        'Iron Studies',
        'Urine Routine & Microscopy',
        'ECG',
        'Chest X-Ray',
        'Ultrasound Abdomen',
        'Doctor Consultation'
      ],
      bestFor: 'Comprehensive health assessment for families',
      popular: true,
      preparation: '10-12 hours fasting required',
      reportTime: '48 hours'
    },
    {
      id: 3,
      name: 'Cardiac Care Package',
      price: 3999,
      originalPrice: 7999,
      discount: '50% OFF',
      duration: '3 Hours',
      category: 'specialty',
      icon: '❤️',
      tests: [
        'Lipid Profile (Extended)',
        'High Sensitivity CRP',
        'Homocysteine',
        'Troponin I',
        'CPK-MB',
        'ECG (12 Leads)',
        '2D Echo with Doppler',
        'TMT (Treadmill Test)',
        'Cardiologist Consultation',
        'Complete Blood Count',
        'Blood Sugar (Fasting & PP)',
        'Liver & Kidney Function'
      ],
      bestFor: 'Heart health monitoring and risk assessment',
      popular: false,
      preparation: '10-12 hours fasting required',
      reportTime: '72 hours'
    },
    {
      id: 4,
      name: 'Diabetes Care Package',
      price: 1799,
      originalPrice: 3499,
      discount: '49% OFF',
      duration: '1.5 Hours',
      category: 'specialty',
      icon: '🩸',
      tests: [
        'Blood Sugar (Fasting)',
        'Blood Sugar (Post Prandial)',
        'HbA1c',
        'Insulin (Fasting)',
        'C-Peptide',
        'Lipid Profile',
        'Kidney Function Test',
        'Microalbuminuria',
        'Diabetologist Consultation',
        'Dietitian Consultation'
      ],
      bestFor: 'Diabetes monitoring and management',
      popular: false,
      preparation: '8-10 hours fasting required',
      reportTime: '24 hours'
    },
    {
      id: 5,
      name: 'Women Health Package',
      price: 2999,
      originalPrice: 5999,
      discount: '50% OFF',
      duration: '2 Hours',
      category: 'women',
      icon: '👩',
      tests: [
        'Complete Blood Count',
        'Blood Sugar',
        'Lipid Profile',
        'Thyroid Profile',
        'Pap Smear',
        'Breast Examination',
        'Pelvic Ultrasound',
        'Bone Density Test',
        'Gynecologist Consultation',
        'Vitamin D & B12',
        'Iron Studies'
      ],
      bestFor: 'Comprehensive health checkup for women',
      popular: true,
      preparation: '8-10 hours fasting required',
      reportTime: '48 hours'
    },
    {
      id: 6,
      name: 'Senior Citizen Package',
      price: 4499,
      originalPrice: 8999,
      discount: '50% OFF',
      duration: '3 Hours',
      category: 'senior',
      icon: '👴',
      tests: [
        'Complete Blood Count',
        'Blood Sugar (Fasting & PP)',
        'HbA1c',
        'Lipid Profile',
        'Liver Function Test',
        'Kidney Function Test',
        'Thyroid Profile',
        'Vitamin B12 & D3',
        'Urine Routine',
        'ECG',
        'Chest X-Ray',
        'Ultrasound Abdomen',
        'Bone Density Test',
        'Neurology Assessment',
        'Geriatric Consultation'
      ],
      bestFor: 'Complete health checkup for senior citizens',
      popular: false,
      preparation: '10-12 hours fasting required',
      reportTime: '72 hours'
    },
    {
      id: 7,
      name: 'Child Health Package',
      price: 1499,
      originalPrice: 2999,
      discount: '50% OFF',
      duration: '1 Hour',
      category: 'child',
      icon: '👶',
      tests: [
        'Complete Blood Count',
        'Hemoglobin',
        'Blood Sugar',
        'Iron Studies',
        'Vitamin D',
        'Vitamin B12',
        'Urine Routine',
        'Growth Assessment',
        'Pediatrician Consultation',
        'Nutrition Counseling'
      ],
      bestFor: 'Comprehensive health checkup for children',
      popular: false,
      preparation: 'No fasting required',
      reportTime: '24 hours'
    },
    {
      id: 8,
      name: 'Full Body Executive Package',
      price: 5999,
      originalPrice: 11999,
      discount: '50% OFF',
      duration: '4 Hours',
      category: 'premium',
      icon: '💼',
      tests: [
        'All tests from Advanced Wellness Package',
        'Stress Test',
        'Pulmonary Function Test',
        'Echocardiogram',
        'Carotid Doppler',
        'PSA (for men)',
        'CA-125 (for women)',
        'Hepatitis Profile',
        'HIV Screening',
        'Executive Health Consultation',
        'Personalized Health Report'
      ],
      bestFor: 'Top executives and business professionals',
      popular: true,
      preparation: '12 hours fasting required',
      reportTime: '72 hours'
    }
  ], []);

  const categories = useMemo(() => [
    { id: 'all', label: 'All Packages' },
    { id: 'basic', label: 'Basic' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'specialty', label: 'Specialty' },
    { id: 'women', label: "Women's Health" },
    { id: 'senior', label: 'Senior Citizen' },
    { id: 'child', label: 'Child Health' },
    { id: 'premium', label: 'Premium' }
  ], []);

  const filteredPackages = useMemo(() => {
    let filtered = packages;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(pkg => pkg.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(pkg =>
        pkg.name.toLowerCase().includes(term) ||
        pkg.bestFor.toLowerCase().includes(term) ||
        pkg.tests.some(test => test.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [packages, selectedCategory, searchTerm]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: '',
    city: '',
    pincode: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);  // ✅ This uses showModal
  };

  // ✅ handleSubmit with backend integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.preferredDate) {
      showToastMessage('Please fill all required fields', 'error');
      return;
    }
    
    if (!user) {
      showToastMessage('Please login first to book a package', 'error');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        serviceName: selectedPackage.name,
        serviceId: selectedPackage.id,
        serviceIcon: selectedPackage.icon,
        price: selectedPackage.price,
        duration: selectedPackage.reportTime,
        patientName: formData.fullName,
        patientPhone: formData.phone,
        patientEmail: formData.email || user?.email || '',
        appointmentDate: formData.preferredDate,
        appointmentTime: formData.preferredTime || '9:00 AM - 10:00 AM',
        notes: `Age: ${formData.age || 'N/A'}, Gender: ${formData.gender || 'N/A'}, Address: ${formData.address || 'N/A'}, City: ${formData.city || 'N/A'}, Pincode: ${formData.pincode || 'N/A'}`
      };

      console.log('📦 Sending booking data:', bookingData);
      
      const response = await createBooking(bookingData);
      console.log('📥 Response:', response);
      
      if (response.success) {
        showToastMessage(`✅ ${selectedPackage.name} booked successfully!`, 'success');
        setShowModal(false);  // ✅ This uses showModal
        setSelectedPackage(null);
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          age: '',
          gender: '',
          address: '',
          city: '',
          pincode: '',
          preferredDate: '',
          preferredTime: '',
          notes: ''
        });
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/30 to-gray-50 pt-0 pb-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down">
          <div className={`px-6 py-3 rounded-xl shadow-2xl text-white text-sm font-medium flex items-center gap-2 ${toastMessage.includes('✅') ? 'bg-green-600' : 'bg-red-600'}`}>
            {toastMessage}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-700 to-teal-600 text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-medium tracking-wide">TRUSTED BY 50,000+ PATIENTS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Health <span className="text-teal-200">Packages</span>
          </h1>
          <p className="text-base sm:text-lg text-teal-100 max-w-2xl mx-auto">
            Comprehensive health screening packages at affordable prices. Early detection saves lives.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 -mt-8 relative z-10 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search packages, tests, or conditions..."
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

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Found <span className="font-bold text-teal-600">{filteredPackages.length}</span> health packages
          </p>
        </div>

        {/* Packages Grid/List */}
        {filteredPackages.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden ${
                    pkg.popular ? 'ring-2 ring-teal-500' : ''
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md animate-pulse">
                        ⭐ Most Popular
                      </div>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="text-4xl mb-2">{pkg.icon}</div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-2 mb-2">
                      <span className="text-2xl font-bold text-teal-600">₹{formatPrice(pkg.price)}</span>
                      <span className="text-gray-400 line-through text-sm">₹{formatPrice(pkg.originalPrice)}</span>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        {pkg.discount}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span>⏱️ {pkg.duration}</span>
                      <span>📊 {pkg.reportTime}</span>
                    </div>
                    <p className="text-gray-600 text-xs mb-2 italic">🎯 {pkg.bestFor}</p>
                    
                    <div className="border-t pt-2 mb-2">
                      <p className="font-semibold text-gray-700 text-xs mb-1">📋 Key Tests:</p>
                      <ul className="space-y-0.5">
                        {pkg.tests.slice(0, 3).map((test, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                            <svg className="w-2.5 h-2.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="truncate">{test}</span>
                          </li>
                        ))}
                        {pkg.tests.length > 3 && (
                          <li className="text-xs text-teal-600">+{pkg.tests.length - 3} more tests</li>
                        )}
                      </ul>
                    </div>
                    
                    <button
                      onClick={() => handleBookNow(pkg)}
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-2 rounded-lg text-sm font-semibold hover:from-teal-700 hover:to-teal-600 transition-all shadow-md hover:shadow-lg mt-2"
                    >
                      Book Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-5 flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                  <div className="text-4xl">{pkg.icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-800">{pkg.name}</h3>
                      {pkg.popular && <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{pkg.bestFor}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span>⏱️ {pkg.duration}</span>
                      <span>📊 Reports: {pkg.reportTime}</span>
                      <span>🔬 {pkg.tests.length}+ tests</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-teal-600">₹{formatPrice(pkg.price)}</div>
                      <div className="text-xs text-gray-400 line-through">₹{formatPrice(pkg.originalPrice)}</div>
                    </div>
                    <button
                      onClick={() => handleBookNow(pkg)}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No packages match your criteria.</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">Why Choose Our Health Packages?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-600 transition-colors duration-300">
                <svg className="w-7 h-7 text-teal-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">NABL Accredited</h3>
              <p className="text-gray-500 text-xs mt-1">Quality tested reports</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-600 transition-colors duration-300">
                <svg className="w-7 h-7 text-teal-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Free Home Collection</h3>
              <p className="text-gray-500 text-xs mt-1">Convenient sample pickup</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-600 transition-colors duration-300">
                <svg className="w-7 h-7 text-teal-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Online Reports</h3>
              <p className="text-gray-500 text-xs mt-1">Get reports in 24-72 hours</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-600 transition-colors duration-300">
                <svg className="w-7 h-7 text-teal-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m0 5.656l3.536 3.536M12 3v1m0 16v1m-9-9h1m16 0h1M5.636 5.636l.707.707m12.02 12.02l-.707-.707" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Expert Consultation</h3>
              <p className="text-gray-500 text-xs mt-1">Free doctor consultation</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-center text-gray-600">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-teal-600 text-lg">✓</span>
            <span>50,000+ Happy Patients</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-teal-600 text-lg">✓</span>
            <span>ISO 27001 Certified</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-teal-600 text-lg">✓</span>
            <span>NABL & CAP Accredited</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-teal-600 text-lg">✓</span>
            <span>24/7 Customer Support</span>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && selectedPackage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl transform transition-all animate-modal-pop max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white rounded-t-2xl sticky top-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Book Health Package</h3>
                  <p className="text-gray-500 text-sm">{selectedPackage.name}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <label className="block text-gray-700 text-sm font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="your@email.com"
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
                  <label className="block text-gray-700 text-sm font-medium mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Age"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Complete address for home sample collection"
                />
              </div>

              <div className="bg-teal-50 rounded-xl p-3 text-sm">
                <div className="font-medium text-gray-800 mb-2">Package Summary</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{selectedPackage.name}</span>
                  <span className="font-semibold text-teal-600">₹{formatPrice(selectedPackage.price)}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">⚡ {selectedPackage.preparation}</div>
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

      <style>{`
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
      `}</style>
    </div>
  );
};

export default HealthPackages;