// frontend/src/pages/HealthCheckups.jsx
// Add these imports at the very top of HealthCheckups.jsx
import React, { useState, useMemo, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createBooking } from '../api/bookingApi';



const HealthCheckups = () => {
  // Inside the HealthCheckups component, add:
const navigate = useNavigate();
const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'All Packages', icon: '📋' },
    { id: 'basic', name: 'Basic Wellness', icon: '🩺' },
    { id: 'advanced', name: 'Advanced', icon: '🔬' },
    { id: 'cardiac', name: 'Cardiac Care', icon: '❤️' },
    { id: 'diabetes', name: 'Diabetes Care', icon: '🩸' },
    { id: 'women', name: "Women's Health", icon: '👩' },
    { id: 'senior', name: 'Senior Citizen', icon: '👴' },
    { id: 'executive', name: 'Executive', icon: '💼' }
  ];

  const healthPackages = useMemo(() => [
    {
      id: 1,
      name: "Basic Wellness Package",
      category: "basic",
      description: "Essential health screening for overall wellness",
      icon: "🩺",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      price: 999,
      originalPrice: 1999,
      discount: "50% OFF",
      reportTime: "24 hours",
      fasting: "10-12 hours fasting required",
      parameters: 50,
      popular: true,
      tests: [
        "Complete Blood Count (CBC)",
        "Blood Sugar (Fasting & PP)",
        "Lipid Profile",
        "Liver Function Test",
        "Kidney Function Test",
        "Urine Routine",
        "Physical Examination",
        "Doctor Consultation"
      ],
      preparation: "Avoid fatty foods night before. Wear loose clothing.",
      benefits: ["Early disease detection", "Health risk assessment", "Preventive care guidance"]
    },
    {
      id: 2,
      name: "Advanced Health Checkup",
      category: "advanced",
      description: "Comprehensive health screening with 70+ parameters",
      icon: "🔬",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      price: 1999,
      originalPrice: 3999,
      discount: "50% OFF",
      reportTime: "48 hours",
      fasting: "10-12 hours fasting required",
      parameters: 70,
      popular: true,
      tests: [
        "Complete Blood Count (CBC)",
        "Blood Sugar (Fasting & PP)",
        "HbA1c",
        "Lipid Profile",
        "Liver Function Test",
        "Kidney Function Test",
        "Thyroid Profile (T3, T4, TSH)",
        "Vitamin D & B12",
        "Iron Studies",
        "Urine Routine & Microscopy",
        "ECG",
        "Chest X-Ray",
        "Ultrasound Abdomen",
        "Doctor Consultation"
      ],
      preparation: "10-12 hours overnight fasting. Avoid alcohol 24 hours before.",
      benefits: ["Complete health assessment", "Chronic disease screening", "Organ function evaluation"]
    },
    {
      id: 3,
      name: "Cardiac Care Package",
      category: "cardiac",
      description: "Complete heart health assessment",
      icon: "❤️",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      price: 1499,
      originalPrice: 2999,
      discount: "50% OFF",
      reportTime: "48 hours",
      fasting: "10-12 hours fasting required",
      parameters: 35,
      popular: true,
      tests: [
        "Lipid Profile (Extended)",
        "High Sensitivity CRP",
        "Homocysteine",
        "Troponin I",
        "CPK-MB",
        "ECG (12 Leads)",
        "2D Echo with Doppler",
        "TMT (Treadmill Test)",
        "Cardiologist Consultation",
        "Complete Blood Count",
        "Blood Sugar (Fasting & PP)",
        "Liver & Kidney Function"
      ],
      preparation: "Avoid caffeine and smoking before tests. Wear comfortable clothes.",
      benefits: ["Heart disease risk assessment", "Cardiac function evaluation", "Preventive cardiology guidance"]
    },
    {
      id: 4,
      name: "Diabetes Care Package",
      category: "diabetes",
      description: "Complete diabetes monitoring and management",
      icon: "🩸",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      price: 899,
      originalPrice: 1799,
      discount: "50% OFF",
      reportTime: "24 hours",
      fasting: "10-12 hours fasting required",
      parameters: 25,
      popular: false,
      tests: [
        "Blood Sugar (Fasting)",
        "Blood Sugar (Post Prandial)",
        "HbA1c",
        "Insulin (Fasting)",
        "C-Peptide",
        "Lipid Profile",
        "Kidney Function Test",
        "Microalbuminuria",
        "Diabetologist Consultation",
        "Dietitian Consultation"
      ],
      preparation: "Take regular medications as prescribed. Fast as instructed.",
      benefits: ["Diabetes monitoring", "Complication screening", "Dietary guidance"]
    },
    {
      id: 5,
      name: "Women's Health Package",
      category: "women",
      description: "Comprehensive health checkup for women",
      icon: "👩",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      price: 1199,
      originalPrice: 2399,
      discount: "50% OFF",
      reportTime: "48 hours",
      fasting: "8-10 hours fasting required",
      parameters: 45,
      popular: true,
      tests: [
        "Complete Blood Count",
        "Blood Sugar",
        "Lipid Profile",
        "Thyroid Profile",
        "Pap Smear",
        "Breast Examination",
        "Pelvic Ultrasound",
        "Bone Density Test",
        "Gynecologist Consultation",
        "Vitamin D & B12",
        "Iron Studies"
      ],
      preparation: "Schedule after menstrual cycle. Wear comfortable clothes.",
      benefits: ["Women's health assessment", "Reproductive health screening", "Bone health evaluation"]
    },
    {
      id: 6,
      name: "Senior Citizen Package",
      category: "senior",
      description: "Complete health checkup for senior citizens",
      icon: "👴",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      price: 2499,
      originalPrice: 4999,
      discount: "50% OFF",
      reportTime: "72 hours",
      fasting: "10-12 hours fasting required",
      parameters: 85,
      popular: false,
      tests: [
        "Complete Blood Count",
        "Blood Sugar (Fasting & PP)",
        "HbA1c",
        "Lipid Profile",
        "Liver Function Test",
        "Kidney Function Test",
        "Thyroid Profile",
        "Vitamin B12 & D3",
        "Urine Routine",
        "ECG",
        "Chest X-Ray",
        "Ultrasound Abdomen",
        "Bone Density Test",
        "Neurology Assessment",
        "Geriatric Consultation"
      ],
      preparation: "Bring all current medications list. Inform about existing conditions.",
      benefits: ["Age-related health screening", "Chronic disease management", "Fall risk assessment"]
    },
    {
      id: 7,
      name: "Executive Health Package",
      category: "executive",
      description: "Premium health checkup for professionals",
      icon: "💼",
      color: "from-slate-500 to-gray-500",
      bgColor: "bg-slate-50",
      price: 3999,
      originalPrice: 7999,
      discount: "50% OFF",
      reportTime: "72 hours",
      fasting: "12 hours fasting required",
      parameters: 100,
      popular: true,
      tests: [
        "All tests from Advanced Wellness Package",
        "Stress Test",
        "Pulmonary Function Test",
        "Echocardiogram",
        "Carotid Doppler",
        "PSA (for men)",
        "CA-125 (for women)",
        "Hepatitis Profile",
        "HIV Screening",
        "Executive Health Consultation",
        "Personalized Health Report",
        "Nutrition & Lifestyle Counseling"
      ],
      preparation: "Complete 12-hour fasting. Avoid strenuous exercise day before.",
      benefits: ["Complete health audit", "Stress assessment", "Corporate wellness guidance"]
    },
    {
      id: 8,
      name: "Child Health Package",
      category: "basic",
      description: "Complete health checkup for children",
      icon: "👶",
      color: "from-sky-500 to-blue-500",
      bgColor: "bg-sky-50",
      price: 699,
      originalPrice: 1399,
      discount: "50% OFF",
      reportTime: "24 hours",
      fasting: "No fasting required",
      parameters: 30,
      popular: false,
      tests: [
        "Complete Blood Count",
        "Hemoglobin",
        "Blood Sugar",
        "Iron Studies",
        "Vitamin D",
        "Vitamin B12",
        "Urine Routine",
        "Growth Assessment",
        "Developmental Screening",
        "Pediatrician Consultation",
        "Nutrition Counseling"
      ],
      preparation: "Bring vaccination records. Child should be hydrated.",
      benefits: ["Growth monitoring", "Nutritional assessment", "Developmental screening"]
    }
  ], []);

  // Filter packages
  const filteredPackages = useMemo(() => {
    let filtered = healthPackages;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(pkg => pkg.category === selectedCategory);
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(pkg =>
        pkg.name.toLowerCase().includes(term) ||
        pkg.description.toLowerCase().includes(term) ||
        pkg.tests.some(test => test.toLowerCase().includes(term))
      );
    }
    
    return filtered;
  }, [healthPackages, selectedCategory, searchTerm]);

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
    medicalHistory: '',
    additionalNotes: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Add these functions in HealthCheckups.jsx before the return statement

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

// Fix the showToastMessage function (it was missing type parameter)
const showToastMessage = (message = 'success') => {
  setToastMessage(message);
  setShowToast(true);
  setTimeout(() => setShowToast(false), 3000);
};

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };
// In HealthCheckups.jsx - Replace your existing handleSubmit with this:

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.fullName || !formData.phone || !formData.preferredDate) {
    showToastMessage('Please fill all required fields', 'error');
    return;
  }
  
  // Check if user is logged in
  if (!user) {
    showToastMessage('Please login first to book a health package', 'error');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
    return;
  }
  
  setIsSubmitting(true);
  
  try {
    // Prepare booking data for backend
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
      notes: `Age: ${formData.age || 'N/A'}, Gender: ${formData.gender || 'N/A'}, Medical History: ${formData.medicalHistory || 'None'}, Address: ${formData.address || 'N/A'}, City: ${formData.city || 'N/A'}, Pincode: ${formData.pincode || 'N/A'}`
    };

    console.log('📦 Sending booking data:', bookingData);

    // Send to backend API
    const response = await createBooking(bookingData);
    
    if (response.success) {
      showToastMessage(`✅ ${selectedPackage.name} booked successfully!`, 'success');
      setShowModal(false);
      
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
        medicalHistory: '',
        additionalNotes: ''
      });
      setSelectedPackage(null);
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
  const timeSlots = ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM"];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down">
          <div className={`px-6 py-3 rounded-xl shadow-2xl text-white text-sm font-medium flex items-center gap-2 ${toastMessage.includes('✅') ? 'bg-emerald-600' : 'bg-red-600'}`}>
            {toastMessage}
          </div>
        </div>
      )}

      {/* Hero Section */}
<div className="bg-teal-50 text-teal-700">

  <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">

    {/* Badge */}
    <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-800 border border-cyan-200 px-4 py-1 rounded-full text-xs tracking-widest uppercase mb-6">
      Preventive Healthcare Packages
    </div>

    {/* Heading */}
    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
      Health{" "}
      <span className="text-cyan-700">Checkup Packages</span>
    </h1>

    {/* Subtext */}
    <p className="text-gray-600 mt-5 max-w-2xl mx-auto text-base md:text-lg">
      Comprehensive health screening packages designed for early detection, prevention, and long-term wellness.
    </p>

    <p className="text-cyan-700 mt-2 text-sm md:text-base">
      Early detection • Free home sample collection • Trusted NABL labs
    </p>

    {/* CTA */}
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

      <a
        href="tel:+9118001234567"
        className="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        Book Health Checkup
      </a>

      <button className="border border-cyan-700 text-cyan-700 hover:bg-cyan-50 px-6 py-3 rounded-lg transition">
        View Packages
      </button>

    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">

      <div className="p-4 border rounded-lg">
        <div className="text-2xl font-bold text-cyan-700">50+</div>
        <div className="text-sm text-gray-500 mt-1">Health Packages</div>
      </div>

      <div className="p-4 border rounded-lg">
        <div className="text-2xl font-bold text-cyan-700">100K+</div>
        <div className="text-sm text-gray-500 mt-1">Patients</div>
      </div>

      <div className="p-4 border rounded-lg">
        <div className="text-2xl font-bold text-cyan-700">24–72h</div>
        <div className="text-sm text-gray-500 mt-1">Report Time</div>
      </div>

      <div className="p-4 border rounded-lg">
        <div className="text-2xl font-bold text-cyan-700">50%</div>
        <div className="text-sm text-gray-500 mt-1">Discounts</div>
      </div>

    </div>

    {/* Trust Row */}
    <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-500">
      <span>✔ NABL Accredited Labs</span>
      <span>✔ Free Home Collection</span>
      <span>✔ Digital Reports</span>
      <span>✔ Doctor Consultation</span>
    </div>

  </div>

</div>
      {/* Main Content */}
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
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-cyan-600' : 'text-gray-500'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-cyan-600' : 'text-gray-500'}`}
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
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600'
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
            Found <span className="font-bold text-cyan-600">{filteredPackages.length}</span> health packages
          </p>
        </div>

        {/* Packages Grid/List */}
        {filteredPackages.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                  <div className={`${pkg.bgColor} p-4 border-b border-gray-100`}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${pkg.color} rounded-2xl flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform mx-auto`}>
                      {pkg.icon}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 text-center mb-2 group-hover:text-cyan-600 transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-600 text-sm text-center mb-3 line-clamp-2">{pkg.description}</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center mb-3">
                      {pkg.popular && (
                        <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full">⭐ Popular</span>
                      )}
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">📊 {pkg.parameters}+ tests</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">⏱️ {pkg.reportTime}</span>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      {pkg.fasting !== "No fasting required" && (
                        <div className="flex items-center gap-2 text-xs text-amber-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{pkg.fasting}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold text-cyan-600">₹{formatPrice(pkg.price)}</span>
                          <span className="text-xs text-gray-400 line-through">₹{formatPrice(pkg.originalPrice)}</span>
                        </div>
                        <span className="text-xs text-green-600">{pkg.discount}</span>
                      </div>
                      <button
                        onClick={() => handleBookNow(pkg)}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg"
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
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className={`w-14 h-14 bg-gradient-to-br ${pkg.color} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-md`}>
                    {pkg.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{pkg.name}</h3>
                    <p className="text-gray-500 text-sm">{pkg.description}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs text-gray-500">📊 {pkg.parameters} tests</span>
                      <span className="text-xs text-gray-500">⏱️ {pkg.reportTime}</span>
                      {pkg.popular && <span className="text-xs text-amber-600">⭐ Popular</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-cyan-600">₹{formatPrice(pkg.price)}</div>
                      <div className="text-xs text-gray-400 line-through">₹{formatPrice(pkg.originalPrice)}</div>
                    </div>
                    <button
                      onClick={() => handleBookNow(pkg)}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all"
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
            <p className="text-gray-500 text-lg">No packages match your criteria.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-4 text-cyan-600 hover:text-cyan-700 font-medium inline-flex items-center gap-1"
            >
              Clear filters →
            </button>
          </div>
        )}

        {/* Why Choose Us Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Our Health Checkups?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                🔬
              </div>
              <p className="font-semibold text-gray-800">NABL Accredited</p>
              <p className="text-gray-500 text-xs">International standards</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                🏠
              </div>
              <p className="font-semibold text-gray-800">Free Home Collection</p>
              <p className="text-gray-500 text-xs">Convenient sample pickup</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                📊
              </div>
              <p className="font-semibold text-gray-800">Digital Reports</p>
              <p className="text-gray-500 text-xs">Download anytime</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                👨‍⚕️
              </div>
              <p className="font-semibold text-gray-800">Expert Consultation</p>
              <p className="text-gray-500 text-xs">Free doctor review</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-center text-gray-600">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-cyan-600 text-lg">✓</span>
            <span>ISO 15189:2022 Certified</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-cyan-600 text-lg">✓</span>
            <span>CAP Accredited</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-cyan-600 text-lg">✓</span>
            <span>100% Accurate Results</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-cyan-600 text-lg">✓</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-cyan-700 to-blue-700 py-12 mt-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Book Your Health Checkup Today</h2>
          <p className="text-cyan-100 mb-6">Preventive health screening can save lives. Book now at 50% off!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+9118001234567" className="group bg-white text-cyan-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:scale-105">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now: +91 1800 123 4567
            </a>
            <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Sample Report
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && selectedPackage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-modal-pop max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-cyan-50 to-white rounded-t-2xl sticky top-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Book Health Package</h3>
                  <p className="text-gray-500 text-sm">{selectedPackage.name}</p>
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
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="your@email.com"
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
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Complete address for home sample collection"
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
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Preferred Time Slot</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Medical History (Optional)</label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Any existing conditions or medications"
                />
              </div>

              <div className="bg-cyan-50 rounded-xl p-3 text-sm">
                <div className="font-medium text-gray-800 mb-2">Package Summary</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{selectedPackage.name}</span>
                  <span className="font-semibold text-cyan-600">₹{formatPrice(selectedPackage.price)}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">⏱️ Report: {selectedPackage.reportTime}</div>
                {selectedPackage.fasting && selectedPackage.fasting !== "No fasting required" && (
                  <div className="text-xs text-amber-600 mt-1">⚠️ {selectedPackage.fasting}</div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition font-medium shadow-md disabled:opacity-50 flex items-center justify-center gap-2">
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
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(-8px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
        .animate-modal-pop {
          animation: modal-pop 0.2s ease-out;
        }
        .animate-ping-slow {
          animation: ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
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

export default HealthCheckups;