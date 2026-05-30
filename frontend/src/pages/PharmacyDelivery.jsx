// frontend/src/pages/PharmacyDelivery.jsx
import React, { useState, useMemo, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const PharmacyDelivery = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const categories = [
    { id: 'all', name: 'All Medicines', icon: '💊' },
    { id: 'prescription', name: 'Prescription Drugs', icon: '📋' },
    { id: 'otc', name: 'OTC Medicines', icon: '🏪' },
    { id: 'vitamins', name: 'Vitamins & Supplements', icon: '💪' },
    { id: 'diabetes', name: 'Diabetes Care', icon: '🩺' },
    { id: 'cardiac', name: 'Cardiac Care', icon: '❤️' },
    { id: 'pain', name: 'Pain Relief', icon: '💊' },
    { id: 'baby', name: 'Baby & Mom', icon: '👶' }
  ];

  const medicines = useMemo(() => [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "otc",
      description: "Fever and pain relief medication",
      icon: "💊",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      price: 45,
      originalPrice: 65,
      discount: "31% OFF",
      deliveryTime: "Same Day",
      prescription: false,
      manufacturer: "Cipla",
      packSize: "10 tablets",
      popular: true,
      stock: true
    },
    {
      id: 2,
      name: "Vitamin D3 60K IU",
      category: "vitamins",
      description: "Vitamin D3 supplement for bone health",
      icon: "💪",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      price: 299,
      originalPrice: 499,
      discount: "40% OFF",
      deliveryTime: "24 hours",
      prescription: false,
      manufacturer: "Abbott",
      packSize: "4 capsules",
      popular: true,
      stock: true
    },
    {
      id: 3,
      name: "Amoxicillin 500mg",
      category: "prescription",
      description: "Antibiotic for bacterial infections",
      icon: "📋",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      price: 120,
      originalPrice: 180,
      discount: "33% OFF",
      deliveryTime: "Same Day",
      prescription: true,
      manufacturer: "GSK",
      packSize: "15 capsules",
      popular: false,
      stock: true
    },
    {
      id: 4,
      name: "Metformin 500mg",
      category: "diabetes",
      description: "Anti-diabetic medication for type 2 diabetes",
      icon: "🩺",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      price: 85,
      originalPrice: 125,
      discount: "32% OFF",
      deliveryTime: "Same Day",
      prescription: true,
      manufacturer: "USV",
      packSize: "10 tablets",
      popular: true,
      stock: true
    },
    {
      id: 5,
      name: "Amlodipine 5mg",
      category: "cardiac",
      description: "Blood pressure medication",
      icon: "❤️",
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50",
      price: 95,
      originalPrice: 140,
      discount: "32% OFF",
      deliveryTime: "Same Day",
      prescription: true,
      manufacturer: "Pfizer",
      packSize: "15 tablets",
      popular: false,
      stock: true
    },
    {
      id: 6,
      name: "Ibuprofen 400mg",
      category: "pain",
      description: "Anti-inflammatory pain reliever",
      icon: "💊",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      price: 65,
      originalPrice: 95,
      discount: "32% OFF",
      deliveryTime: "Same Day",
      prescription: false,
      manufacturer: "Dr. Reddy's",
      packSize: "10 tablets",
      popular: true,
      stock: true
    },
    {
      id: 7,
      name: "Calcium + Vitamin D3",
      category: "vitamins",
      description: "Calcium supplement for bone strength",
      icon: "💪",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      price: 399,
      originalPrice: 599,
      discount: "33% OFF",
      deliveryTime: "24 hours",
      prescription: false,
      manufacturer: "Sun Pharma",
      packSize: "30 tablets",
      popular: false,
      stock: true
    },
    {
      id: 8,
      name: "Cetirizine 10mg",
      category: "otc",
      description: "Antihistamine for allergies",
      icon: "💊",
      color: "from-sky-500 to-blue-500",
      bgColor: "bg-sky-50",
      price: 55,
      originalPrice: 85,
      discount: "35% OFF",
      deliveryTime: "Same Day",
      prescription: false,
      manufacturer: "Cipla",
      packSize: "10 tablets",
      popular: false,
      stock: true
    },
    {
      id: 9,
      name: "Atorvastatin 10mg",
      category: "cardiac",
      description: "Cholesterol-lowering medication",
      icon: "❤️",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      price: 110,
      originalPrice: 160,
      discount: "31% OFF",
      deliveryTime: "Same Day",
      prescription: true,
      manufacturer: "Pfizer",
      packSize: "15 tablets",
      popular: false,
      stock: true
    },
    {
      id: 10,
      name: "Pediatric Drops",
      category: "baby",
      description: "Multivitamin drops for infants",
      icon: "👶",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      price: 199,
      originalPrice: 299,
      discount: "33% OFF",
      deliveryTime: "24 hours",
      prescription: false,
      manufacturer: "Abbott",
      packSize: "15ml",
      popular: false,
      stock: true
    }
  ], []);

  // Filter medicines
  const filteredMedicines = useMemo(() => {
    let filtered = medicines;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(medicine => medicine.category === selectedCategory);
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(medicine =>
        medicine.name.toLowerCase().includes(term) ||
        medicine.description.toLowerCase().includes(term) ||
        medicine.manufacturer.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [medicines, selectedCategory, searchTerm]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    prescription: null,
    additionalNotes: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, prescription: e.target.files[0] });
  };

  const showToastMessage = (message = 'success') => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const handleAddToCart = (medicine) => {
    if (!user) {
      showToastMessage('Please login first to add items to cart', 'error');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }
    
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === medicine.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity }]);
    }
    showToastMessage(`✅ ${medicine.name} added to cart`, 'success');
    setQuantity(1);
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    showToastMessage(`Item removed from cart`, 'success');
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // ✅ Handle Checkout - Separate Pharmacy Order API
  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      showToastMessage('Please fill all required fields', 'error');
      return;
    }
    
    if (cart.length === 0) {
      showToastMessage('Your cart is empty', 'error');
      return;
    }
    
    if (!user) {
      showToastMessage('Please login first to place order', 'error');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      
      const orderData = {
        items: cart.map(item => ({
          medicineId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          packSize: item.packSize,
          manufacturer: item.manufacturer
        })),
        totalAmount: getCartTotal(),
        patientName: formData.fullName,
        patientPhone: formData.phone,
        patientEmail: formData.email || user?.email || '',
        deliveryAddress: {
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode
        },
        prescriptionUploaded: !!formData.prescription,
        notes: formData.additionalNotes
      };

      console.log('📦 Sending pharmacy order:', orderData);
      
      const response = await axios.post('http://localhost:5000/api/pharmacy/orders', orderData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📥 Response:', response.data);
      
      if (response.data.success) {
        showToastMessage(`✅ Order placed successfully! Order ID: ${response.data.order.orderId}`, 'success');
        setShowModal(false);
        setCart([]);
        
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          pincode: '',
          prescription: null,
          additionalNotes: ''
        });
        
        // Ask if user wants to view orders
        setTimeout(() => {
          if (window.confirm('Order placed successfully! Would you like to view your orders?')) {
            navigate('/my-pharmacy-orders');
          }
        }, 500);
      } else {
        showToastMessage(response.data.message || 'Order failed', 'error');
      }
    } catch (error) {
      console.error('❌ Order error:', error);
      showToastMessage(error.response?.data?.message || 'Order failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down">
          <div className={`px-6 py-3 rounded-xl shadow-2xl text-white text-sm font-medium flex items-center gap-2 ${toastMessage.includes('✅') ? 'bg-green-600' : 'bg-red-600'}`}>
            {toastMessage}
          </div>
        </div>
      )}

     {/* Unified Hero Section */}
<div className="relative bg-gradient-to-r from-teal-700 to-teal-600 text-white overflow-hidden">

  {/* Background pattern */}
  <div className="absolute inset-0 opacity-10">
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
    </svg>
  </div>

  <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">

    {/* Badge */}
    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
      <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
      <span className="text-xs font-medium tracking-widest">
        ONLINE PHARMACY • FAST & TRUSTED
      </span>
    </div>

    {/* Heading */}
    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
      Online <span className="text-emerald-200">Pharmacy</span> Services
    </h1>

    {/* Description */}
    <p className="mt-5 text-teal-100 max-w-2xl mx-auto text-base md:text-lg">
      Genuine medicines delivered to your doorstep with fast dispatch, verified quality, and 24/7 healthcare support.
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
      <button
        onClick={() => setShowCart(true)}
        className="bg-white text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
      >
        Order Now ({cart.length})
      </button>

      <button
        onClick={() => setShowCart(true)}
        className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition"
      >
        View Cart ({cart.length})
      </button>
    </div>

    

  </div>
</div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-0 py-6">
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
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-emerald-600' : 'text-gray-500'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-emerald-600' : 'text-gray-500'}`}
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
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
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
            Found <span className="font-bold text-emerald-600">{filteredMedicines.length}</span> medicines
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredMedicines.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedicines.map((medicine) => (
                <div key={medicine.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                  <div className={`${medicine.bgColor} p-4 border-b border-gray-100`}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${medicine.color} rounded-2xl flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform mx-auto`}>
                      {medicine.icon}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 text-center mb-2 group-hover:text-emerald-600 transition-colors">
                      {medicine.name}
                    </h3>
                    <p className="text-gray-600 text-sm text-center mb-3 line-clamp-2">{medicine.description}</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center mb-3">
                      {medicine.popular && (
                        <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full">⭐ Popular</span>
                      )}
                      {medicine.prescription && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">📋 Prescription Required</span>
                      )}
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{medicine.manufacturer}</span>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>📦 {medicine.packSize}</span>
                        <span>🚚 {medicine.deliveryTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold text-emerald-600">₹{formatPrice(medicine.price)}</span>
                          <span className="text-xs text-gray-400 line-through">₹{formatPrice(medicine.originalPrice)}</span>
                        </div>
                        <span className="text-xs text-green-600">{medicine.discount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value))}
                          className="border border-gray-200 rounded-lg px-2 py-1 text-sm"
                        >
                          {[1,2,3,4,5].map(q => (
                            <option key={q} value={q}>{q}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleAddToCart(medicine)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMedicines.map((medicine) => (
                <div key={medicine.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className={`w-14 h-14 bg-gradient-to-br ${medicine.color} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-md`}>
                    {medicine.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{medicine.name}</h3>
                    <p className="text-gray-500 text-sm">{medicine.description}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs text-gray-500">{medicine.manufacturer}</span>
                      <span className="text-xs text-gray-500">📦 {medicine.packSize}</span>
                      {medicine.prescription && <span className="text-xs text-red-600">📋 Prescription Required</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-emerald-600">₹{formatPrice(medicine.price)}</div>
                      <div className="text-xs text-gray-400 line-through">₹{formatPrice(medicine.originalPrice)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="border border-gray-200 rounded-lg px-2 py-1 text-sm"
                      >
                        {[1,2,3,4,5].map(q => (
                          <option key={q} value={q}>{q}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleAddToCart(medicine)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No medicines match your criteria.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1"
            >
              Clear filters →
            </button>
          </div>
        )}

        {/* Why Choose Us Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Our Pharmacy?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                ✅
              </div>
              <p className="font-semibold text-gray-800">100% Genuine</p>
              <p className="text-gray-500 text-xs">Direct from manufacturers</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                🚚
              </div>
              <p className="font-semibold text-gray-800">Free Delivery</p>
              <p className="text-gray-500 text-xs">On all orders</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                💊
              </div>
              <p className="font-semibold text-gray-800">Best Prices</p>
              <p className="text-gray-500 text-xs">Up to 40% off</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                👨‍⚕️
              </div>
              <p className="font-semibold text-gray-800">Expert Pharmacists</p>
              <p className="text-gray-500 text-xs">Available for consultation</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-center text-gray-600">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-emerald-600 text-lg">✓</span>
            <span>FDA Approved</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-emerald-600 text-lg">✓</span>
            <span>ISO 9001 Certified</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-emerald-600 text-lg">✓</span>
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-emerald-600 text-lg">✓</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowCart(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl transform transition-all animate-modal-pop max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white rounded-t-2xl sticky top-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Your Cart</h3>
                  <p className="text-gray-500 text-sm">{cart.length} items</p>
                </div>
                <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>
            </div>
            
            {cart.length === 0 ? (
              <div className="p-10 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-500">Your cart is empty</p>
                <button onClick={() => setShowCart(false)} className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-xl">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="p-5 space-y-4 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-100">
                      <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.packSize}</p>
                        <p className="text-sm font-bold text-emerald-600 mt-1">₹{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-5 border-t border-gray-100 bg-gray-50">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between mb-4 pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-emerald-600 text-lg">₹{formatPrice(getCartTotal())}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowCart(false);
                      setShowModal(true);
                    }}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-modal-pop max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white rounded-t-2xl sticky top-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Checkout</h3>
                  <p className="text-gray-500 text-sm">Complete your order</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>
            </div>
            
            <form onSubmit={handleCheckout} className="p-5 space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Delivery Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="2"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Complete address for delivery"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Pincode"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Upload Prescription (if any)</label>
                <input
                  type="file"
                  name="prescription"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.png"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                <p className="text-xs text-gray-500 mt-1">Upload PDF, JPG or PNG (Max 5MB)</p>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Any special instructions"
                />
              </div>

              <div className="bg-emerald-50 rounded-xl p-3 text-sm">
                <div className="font-medium text-gray-800 mb-2">Order Summary</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Total</span>
                  <span className="font-semibold">₹{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Delivery Fee</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-emerald-200 mt-2 pt-2 flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span className="text-emerald-600">₹{formatPrice(getCartTotal())}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-medium shadow-md disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${formatPrice(getCartTotal())}`
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

export default PharmacyDelivery;