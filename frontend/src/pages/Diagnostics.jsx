// frontend/src/pages/Diagnostics.jsx
import React, { useState, useMemo, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createBooking } from '../api/bookingApi';
import { toast } from 'react-toastify';

// Constants
const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
};

const CATEGORIES = [
  { id: 'all', label: 'All Tests', icon: '🔬' },
  { id: 'blood', label: 'Blood Tests', icon: '🩸' },
  { id: 'cardiac', label: 'Cardiac', icon: '❤️' },
  { id: 'diabetes', label: 'Diabetes', icon: '🩺' },
  { id: 'thyroid', label: 'Thyroid', icon: '🏥' },
  { id: 'liver', label: 'Liver & Kidney', icon: '🧪' },
  { id: 'vitamin', label: 'Vitamin', icon: '💊' },
  { id: 'package', label: 'Health Packages', icon: '📦' },
];

const TIME_SLOTS = [
  '6:00 AM - 8:00 AM',
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
];

// Utility Functions
const formatPrice = (price) => {
  const amount = Number(price) || 0;
  return new Intl.NumberFormat('en-IN').format(amount);
};

const getMinDate = () => new Date().toISOString().split('T')[0];

const getMaxDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0];
};

// Sub-components
const StatCard = ({ icon, label, value, color = 'cyan' }) => (
  <div className="border rounded-lg p-4 text-center hover:shadow-sm transition">
    <div className={`text-2xl font-bold text-${color}-700`}>{value}</div>
    <div className="text-sm text-gray-500 mt-1">{label}</div>
  </div>
);

const HeroSection = () => (
  <div className="relative bg-gradient-to-r from-teal-700 to-teal-600 text-white overflow-hidden">

    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>

    <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
        <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
        <span className="text-xs font-medium tracking-widest uppercase">
          NABL & CAP ACCREDITED DIAGNOSTIC LAB
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold leading-tight">
        Accurate & Trusted{" "}
        <span className="text-teal-100">
          Diagnostic Services
        </span>
      </h1>

      {/* Description */}
      <p className="mt-5 text-teal-100 max-w-2xl mx-auto text-base md:text-lg">
        Advanced pathology testing with precise results, fast reporting,
        and reliable home sample collection.
      </p>

      <p className="mt-3 text-teal-200 text-sm md:text-base">
        NABL Certified • Free Home Collection • Fast Digital Reports
      </p>



    </div>
  </div>
);
const SearchAndFilterBar = ({ searchTerm, setSearchTerm, viewMode, setViewMode, selectedCategory, setSelectedCategory }) => (
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
          placeholder="Search tests or packages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setViewMode(VIEW_MODES.GRID)}
          className={`p-2 rounded-lg transition-all ${
            viewMode === VIEW_MODES.GRID ? 'bg-white shadow text-teal-600' : 'text-gray-500'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        <button
          onClick={() => setViewMode(VIEW_MODES.LIST)}
          className={`p-2 rounded-lg transition-all ${
            viewMode === VIEW_MODES.LIST ? 'bg-white shadow text-teal-600' : 'text-gray-500'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mt-4 overflow-x-auto pb-2">
      {CATEGORIES.map((cat) => (
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
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  </div>
);

const DiagnosticCard = ({ item, onBookNow }) => {
  const isPackage = item.category === 'package';
  
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
      <div className={`${item.bgColor} p-4 border-b border-gray-100`}>
        <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform mx-auto`}>
          {item.icon}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 text-center mb-2 group-hover:text-teal-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-gray-600 text-sm text-center mb-3 line-clamp-2">{item.description}</p>

        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {item.popular && (
            <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full">⭐ Popular</span>
          )}
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            📊 {item.parameters}+ {isPackage ? 'tests' : 'parameters'}
          </span>
        </div>

        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-3 h-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Report: {item.reportTime}</span>
          </div>
          {item.fasting !== 'No fasting required' && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-3 h-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Fasting: {item.fasting}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-teal-600">₹{formatPrice(item.price)}</span>
              <span className="text-xs text-gray-400 line-through">₹{formatPrice(item.originalPrice)}</span>
            </div>
            <span className="text-xs text-green-600">{item.discount}</span>
          </div>
          <button
            onClick={() => onBookNow(item)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg"
          >
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
};

const DiagnosticListItem = ({ item, onBookNow }) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-md`}>
      {item.icon}
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-gray-800">{item.name}</h3>
      <p className="text-gray-500 text-sm">{item.description}</p>
      <div className="flex flex-wrap gap-2 mt-1">
        <span className="text-xs text-gray-500">📊 {item.parameters} {item.category === 'package' ? 'tests' : 'parameters'}</span>
        <span className="text-xs text-gray-500">⏱️ {item.reportTime}</span>
        {item.popular && <span className="text-xs text-amber-600">⭐ Popular</span>}
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="text-right">
        <div className="text-xl font-bold text-teal-600">₹{formatPrice(item.price)}</div>
        <div className="text-xs text-gray-400 line-through">₹{formatPrice(item.originalPrice)}</div>
      </div>
      <button
        onClick={() => onBookNow(item)}
        className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all"
      >
        Book
      </button>
    </div>
  </div>
);

const EmptyState = ({ onClearFilters }) => (
  <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
    <div className="text-6xl mb-4">🔍</div>
    <p className="text-gray-500 text-lg">No tests match your criteria.</p>
    <button
      onClick={onClearFilters}
      className="mt-4 text-teal-600 hover:text-teal-700 font-medium inline-flex items-center gap-1"
    >
      Clear filters →
    </button>
  </div>
);

const WhyChooseUs = () => {
  const features = [
    { icon: '🔬', title: 'NABL Accredited', description: 'International standards' },
    { icon: '🏠', title: 'Free Home Collection', description: 'Convenient sample pickup' },
    { icon: '📊', title: 'Digital Reports', description: 'Download anytime' },
    { icon: '👨‍⚕️', title: 'Expert Consultation', description: 'Free doctor review' },
  ];

  return (
    <div className="mt-16 bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Our Diagnostic Lab?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div key={idx} className="text-center group">
            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
              {feature.icon}
            </div>
            <p className="font-semibold text-gray-800">{feature.title}</p>
            <p className="text-gray-500 text-xs">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrustIndicators = () => {
  const indicators = [
    'ISO 15189:2022 Certified',
    'CAP Accredited',
    '100% Accurate Results',
    '24/7 Support',
  ];

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-6 text-center text-gray-600">
      {indicators.map((indicator, idx) => (
        <div key={idx} className="flex items-center gap-2 text-sm">
          <span className="text-teal-600 text-lg">✓</span>
          <span>{indicator}</span>
        </div>
      ))}
    </div>
  );
};

const CTASection = () => (
  <div className="bg-gradient-to-r from-teal-700 to-cyan-700 py-2 mt-8">
    <div className="max-w-4xl mx-auto text-center px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Diagnostic Tests?</h2>
      <p className="text-teal-100 mb-6">Book your test online with free home sample collection</p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="tel:+9118001234567"
          className="group bg-white text-teal-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:scale-105"
        >
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
);

// Main Component
const Diagnostics = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  const diagnosticTests = useMemo(() => [
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      category: 'blood',
      description: 'Measures red blood cells, white blood cells, hemoglobin, and platelets',
      icon: '🩸',
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-50',
      price: 499,
      originalPrice: 999,
      discount: '50% OFF',
      reportTime: '6-8 hours',
      fasting: 'No fasting required',
      preparation: 'No special preparation needed',
      popular: true,
      parameters: 24,
      tests: ['Hemoglobin', 'RBC Count', 'WBC Count', 'Platelet Count', 'Hematocrit', 'MCV', 'MCH', 'MCHC'],
    },
    {
      id: 2,
      name: 'Lipid Profile',
      category: 'cardiac',
      description: 'Measures cholesterol levels including HDL, LDL, and triglycerides',
      icon: '❤️',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      price: 699,
      originalPrice: 1399,
      discount: '50% OFF',
      reportTime: '8-10 hours',
      fasting: '10-12 hours fasting required',
      preparation: 'Avoid fatty foods night before',
      popular: true,
      parameters: 7,
      tests: ['Total Cholesterol', 'HDL Cholesterol', 'LDL Cholesterol', 'VLDL', 'Triglycerides'],
    },
    {
      id: 3,
      name: 'HbA1c',
      category: 'diabetes',
      description: 'Measures average blood sugar levels over past 3 months',
      icon: '🩺',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      price: 399,
      originalPrice: 799,
      discount: '50% OFF',
      reportTime: '4-6 hours',
      fasting: 'No fasting required',
      preparation: 'No special preparation needed',
      popular: true,
      parameters: 1,
      tests: ['Glycated Hemoglobin'],
    },
    {
      id: 4,
      name: 'Thyroid Profile (T3, T4, TSH)',
      category: 'thyroid',
      description: 'Evaluates thyroid gland function and hormone levels',
      icon: '🏥',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      price: 599,
      originalPrice: 1199,
      discount: '50% OFF',
      reportTime: '8-10 hours',
      fasting: '8 hours fasting recommended',
      preparation: 'Inform about thyroid medications',
      popular: false,
      parameters: 3,
      tests: ['T3', 'T4', 'TSH'],
    },
    {
      id: 5,
      name: 'Liver Function Test (LFT)',
      category: 'liver',
      description: 'Assesses liver health and detects liver damage',
      icon: '🧪',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      price: 499,
      originalPrice: 999,
      discount: '50% OFF',
      reportTime: '8-10 hours',
      fasting: '8-10 hours fasting required',
      preparation: 'Avoid alcohol 24 hours before',
      popular: false,
      parameters: 11,
      tests: ['SGOT/AST', 'SGPT/ALT', 'ALP', 'GGT', 'Total Bilirubin', 'Direct Bilirubin'],
    },
    {
      id: 6,
      name: 'Kidney Function Test (KFT)',
      category: 'liver',
      description: 'Evaluates kidney function and detects kidney disorders',
      icon: '🧪',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50',
      price: 449,
      originalPrice: 899,
      discount: '50% OFF',
      reportTime: '6-8 hours',
      fasting: '8 hours fasting recommended',
      preparation: 'Stay hydrated',
      popular: false,
      parameters: 9,
      tests: ['Urea', 'Creatinine', 'Uric Acid', 'BUN', 'Calcium', 'Phosphorus', 'Sodium', 'Potassium'],
    },
    {
      id: 7,
      name: 'Vitamin D Test',
      category: 'vitamin',
      description: 'Measures Vitamin D levels in blood',
      icon: '💊',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      price: 799,
      originalPrice: 1599,
      discount: '50% OFF',
      reportTime: '24-48 hours',
      fasting: 'No fasting required',
      preparation: 'No special preparation needed',
      popular: false,
      parameters: 1,
      tests: ['25-Hydroxy Vitamin D'],
    },
    {
      id: 8,
      name: 'Vitamin B12 Test',
      category: 'vitamin',
      description: 'Measures Vitamin B12 levels in blood',
      icon: '💊',
      color: 'from-amber-500 to-yellow-500',
      bgColor: 'bg-amber-50',
      price: 699,
      originalPrice: 1399,
      discount: '50% OFF',
      reportTime: '24 hours',
      fasting: '8 hours fasting recommended',
      preparation: 'No special preparation needed',
      popular: false,
      parameters: 1,
      tests: ['Vitamin B12'],
    },
  ], []);

  const healthPackages = useMemo(() => [
    {
      id: 101,
      name: 'Basic Wellness Package',
      category: 'package',
      description: 'Essential health screening for overall wellness',
      icon: '📦',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      price: 999,
      originalPrice: 1999,
      discount: '50% OFF',
      reportTime: '24 hours',
      fasting: '10-12 hours fasting required',
      preparation: 'Avoid fatty foods',
      popular: true,
      parameters: 50,
      tests: ['CBC', 'Blood Sugar (F & PP)', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Urine Routine'],
    },
    {
      id: 102,
      name: 'Advanced Health Checkup',
      category: 'package',
      description: 'Comprehensive health screening with 70+ parameters',
      icon: '📦',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      price: 1999,
      originalPrice: 3999,
      discount: '50% OFF',
      reportTime: '48 hours',
      fasting: '10-12 hours fasting required',
      preparation: 'Avoid alcohol 24 hours before',
      popular: true,
      parameters: 70,
      tests: ['CBC', 'Blood Sugar', 'HbA1c', 'Lipid Profile', 'Liver Function', 'Thyroid Profile', 'Vitamin D', 'Vitamin B12'],
    },
    {
      id: 103,
      name: 'Cardiac Care Package',
      category: 'package',
      description: 'Complete heart health assessment',
      icon: '📦',
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-50',
      price: 1499,
      originalPrice: 2999,
      discount: '50% OFF',
      reportTime: '48 hours',
      fasting: '10-12 hours fasting required',
      preparation: 'Avoid fatty foods night before',
      popular: false,
      parameters: 30,
      tests: ['Lipid Profile', 'High Sensitivity CRP', 'Homocysteine', 'ECG', 'Troponin I', 'CPK-MB'],
    },
    {
      id: 104,
      name: 'Diabetes Care Package',
      category: 'package',
      description: 'Complete diabetes monitoring and management',
      icon: '📦',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      price: 899,
      originalPrice: 1799,
      discount: '50% OFF',
      reportTime: '24 hours',
      fasting: '10-12 hours fasting required',
      preparation: 'Regular medications as prescribed',
      popular: false,
      parameters: 25,
      tests: ['Blood Sugar (Fasting)', 'Blood Sugar (Post Prandial)', 'HbA1c', 'Insulin (Fasting)', 'Microalbuminuria'],
    },
  ], []);

  const allItems = useMemo(() => [...diagnosticTests, ...healthPackages], [diagnosticTests, healthPackages]);

  const filteredItems = useMemo(() => {
    let filtered = allItems;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [allItems, selectedCategory, searchTerm]);

  const handleInputChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleBookNow = useCallback((item) => {
    if (!user) {
      toast.error('Please login to book a diagnostic test');
      navigate('/login');
      return;
    }
    setSelectedItem(item);
    setShowModal(true);
  }, [user, navigate]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.preferredDate) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        serviceName: selectedItem.name,
        serviceId: selectedItem.id,
        serviceIcon: selectedItem.icon,
        price: selectedItem.price,
        duration: selectedItem.reportTime,
        patientName: formData.fullName,
        patientPhone: formData.phone,
        patientEmail: formData.email || user?.email || '',
        appointmentDate: formData.preferredDate,
        appointmentTime: formData.preferredTime || TIME_SLOTS[0],
        notes: `Age: ${formData.age || 'N/A'}, Gender: ${formData.gender || 'N/A'}, Address: ${formData.address || 'N/A'}, Fasting: ${selectedItem.fasting || 'Not specified'}`,
      };

      const response = await createBooking(bookingData);

      if (response.success) {
        toast.success(`${selectedItem.name} booked successfully! Our collection team will contact you within 30 minutes.`);
        setShowModal(false);
        setSelectedItem(null);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          age: '',
          gender: '',
          address: '',
          preferredDate: '',
          preferredTime: '',
          notes: '',
        });
      } else {
        toast.error(response.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedItem, formData, user]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('all');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/30 to-cyan-50/30">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <SearchAndFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Found <span className="font-bold text-teal-600">{filteredItems.length}</span> diagnostic tests & packages
          </p>
        </div>

        {filteredItems.length > 0 ? (
          viewMode === VIEW_MODES.GRID ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <DiagnosticCard key={item.id} item={item} onBookNow={handleBookNow} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <DiagnosticListItem key={item.id} item={item} onBookNow={handleBookNow} />
              ))}
            </div>
          )
        ) : (
          <EmptyState onClearFilters={clearFilters} />
        )}

        <WhyChooseUs />
        <TrustIndicators />
      </div>

      <CTASection />

      {/* Booking Modal */}
      {showModal && selectedItem && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-modal-pop max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white rounded-t-2xl sticky top-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Book Diagnostic Test</h3>
                  <p className="text-gray-500 text-sm">{selectedItem.name}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  &times;
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Full Name *
                </label>
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
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Phone Number *
                </label>
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
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Address for Sample Collection
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Complete address for home sample collection"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Preferred Date *
                  </label>
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
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select time slot</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-teal-50 rounded-xl p-3 text-sm">
                <div className="font-medium text-gray-800 mb-2">Test Summary</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{selectedItem.name}</span>
                  <span className="font-semibold text-teal-600">
                    ₹{formatPrice(selectedItem.price)}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  ⏱️ Report: {selectedItem.reportTime}
                </div>
                {selectedItem.fasting && selectedItem.fasting !== 'No fasting required' && (
                  <div className="text-xs text-amber-600 mt-1">
                    ⚠️ {selectedItem.fasting}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition font-medium shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
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

export default Diagnostics;