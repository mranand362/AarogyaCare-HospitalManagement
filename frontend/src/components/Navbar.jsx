// FullNavbar.jsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from "react-i18next";

const FullNavbar = () => {
  const { t, i18n } = useTranslation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { user, logout } = useContext(AuthContext);
  
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Store previous pathname to avoid unnecessary updates
  const prevPathnameRef = useRef(location.pathname);

  // Handle scroll with event listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle route changes
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setShowProfileMenu(false);
      }, 0);

      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname]);

  // Handle body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setShowProfileMenu(false);
    setIsMobileMenuOpen(false);
  };

  const getInitials = () => {
    if (user?.name) {
      const nameParts = user.name.trim().split(' ');
      if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      }
      return nameParts[0].slice(0, 2).toUpperCase();
    }
    if (user?.email) return user.email[0].toUpperCase();
    return 'U';
  };

  const getDisplayName = () => {
    if (user?.name) {
      const firstName = user.name.split(' ')[0];
      return firstName.length > 12 ? `${firstName.slice(0, 12)}...` : firstName;
    }
    if (user?.email) {
      const username = user.email.split('@')[0];
      return username.length > 12 ? `${username.slice(0, 12)}...` : username;
    }
    return 'User';
  };

  // ✅ Get profile image from multiple sources
  const getProfileImage = () => {
    // Check user object from context
    if (user?.profilePic) return user.profilePic;
    if (user?.image) return user.image;
    if (user?.avatar) return user.avatar;
    
    // Check localStorage directly
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.profilePic) return parsedUser.profilePic;
        if (parsedUser.image) return parsedUser.image;
        if (parsedUser.avatar) return parsedUser.avatar;
      }
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
    }
    
    return null;
  };

  const isActivePath = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Navigation items
  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('doctors'), path: '/doctors' },
    { name: t('services'), path: '/services' },
    { name: t('about'), path: '/about' },
    { name: t('contact'), path: '/contact' },
  ];

  const handleLoginClick = () => navigate('/login');

  return (
    <>
      {/* Top Bar - Hidden on mobile */}
      <div className="bg-teal-800 text-white hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-2 flex justify-between items-center text-xs sm:text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">24/7 Emergency:</span>
                <a href="tel:102" className="font-bold text-yellow-300 hover:text-yellow-200">
                  102
                </a>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+9118001234567" className="hover:text-teal-200">
                  +91 1800 123 4567
                </a>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@aarogyacare.com" className="hover:text-teal-200">
                  info@aarogyacare.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a href="/insurance" className="hidden sm:flex items-center gap-1 hover:text-teal-200">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Insurance
              </a>
              <div className="w-px h-3 bg-white/30 hidden sm:block"></div>
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="bg-transparent border-none text-white text-xs focus:outline-none cursor-pointer"
              >
                <option value="en" className="text-black">English</option>
                <option value="hi" className="text-black">हिंदी</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg border-b border-gray-100' : 'bg-white shadow-md'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-teal-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-700">
                  AarogyaCare
                </span>
                <p className="sm:block text-[10px] lg:text-xs text-gray-500 leading-tight">A MultiSpecialty Hospital</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActivePath(item.path)
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Section - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 rounded-full transition-colors border border-gray-200"
                  >
                    {/* ✅ Profile Image with fallback */}
                    {getProfileImage() ? (
                      <img
                        src={getProfileImage()}
                        alt="profile"
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-500/20"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`w-8 h-8 bg-teal-600 text-white flex items-center justify-center rounded-full text-sm font-semibold ${getProfileImage() ? 'hidden' : 'flex'}`}>
                      {getInitials()}
                    </div>
                    <span className="text-sm text-gray-700">{getDisplayName()}</span>
                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <button onClick={() => { navigate('/profile'); setShowProfileMenu(false); }} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </button>

                        <button onClick={() => { navigate('/my-bookings'); setShowProfileMenu(false); }} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          My Bookings
                        </button>

                        <button onClick={() => { navigate('/my-appointments'); setShowProfileMenu(false); }} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          My Appointments
                        </button>

                        <button
                          onClick={() => { navigate('/my-pharmacy-orders'); setShowProfileMenu(false); }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Pharmacy Orders
                        </button>

                        <div className="border-t border-gray-100 my-1"></div>
                        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={handleLoginClick} className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                  Create Account
                </button>
              )}
            </div>

            {/* Mobile Menu Button & Profile Icon */}
            <div className="flex items-center gap-2 md:hidden">
              {user && (
                <button
                  onClick={() => navigate('/profile')}
                  className="w-8 h-8 rounded-full overflow-hidden shadow-md ring-2 ring-teal-500/20"
                >
                  {getProfileImage() ? (
                    <img
                      src={getProfileImage()}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-teal-600 text-white flex items-center justify-center text-sm font-semibold">
                      {getInitials()}
                    </div>
                  )}
                </button>
              )}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg hover:bg-gray-100">
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`w-6 h-0.5 bg-gray-600 rounded transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`w-6 h-0.5 bg-gray-600 rounded transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`w-6 h-0.5 bg-gray-600 rounded transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            <div className="fixed inset-0  z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            <div ref={mobileMenuRef} className="fixed top-16 left-0 right-0 bottom-0 bg-white shadow-xl z-50 md:hidden overflow-y-auto">
              <div className="px-4 py-4">

                {/* Mobile Profile Section */}
                {user ? (
                  <>
                    <div className="mb-6 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-5 shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {getProfileImage() ? (
                            <img
                              src={getProfileImage()}
                              alt="profile"
                              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold text-white backdrop-blur-sm border-2 border-white/30">
                              {getInitials()}
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">{user?.name || 'User'}</h3>
                          <p className="text-white/80 text-xs mt-0.5">{user?.email}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">Patient</span>
                            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">ID: {user?.id?.slice(-6) || '123456'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/20">
                        <div className="text-center">
                          <p className="text-white/70 text-xs">Appointments</p>
                          <p className="text-white font-bold text-lg">8</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/70 text-xs">Reports</p>
                          <p className="text-white font-bold text-lg">12</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <button
                          onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
                          className="flex items-center justify-center gap-2 bg-white/15 py-2.5 rounded-xl text-white text-sm font-medium hover:bg-white/25 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          View Profile
                        </button>
                        <button
                          onClick={() => { navigate('/my-bookings'); setIsMobileMenuOpen(false); }}
                          className="flex items-center justify-center gap-2 bg-white/15 py-2.5 rounded-xl text-white text-sm font-medium hover:bg-white/25 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          My Bookings
                        </button>
                      </div>
                    </div>

                    <div className="mb-6 bg-gray-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Health Summary
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">Blood Group</span>
                          <span className="font-semibold text-gray-900">O+</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">Age</span>
                          <span className="font-semibold text-gray-900">34 years</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">Last Visit</span>
                          <span className="font-semibold text-gray-900">Mar 15, 2024</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mb-6">
                    <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-6 text-center">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2">Welcome to AarogyaCare</h3>
                      <p className="text-white/80 text-sm mb-4">Login to access your health records and appointments</p>
                      <button
                        onClick={() => { handleLoginClick(); setIsMobileMenuOpen(false); }}
                        className="w-full bg-white text-teal-700 px-4 py-3 rounded-xl font-medium shadow-md hover:bg-gray-100 transition-colors"
                      >
                        Login / Sign Up
                      </button>
                    </div>
                  </div>
                )}

                {/* Navigation Items */}
                <div className="space-y-1">
                  {navItems.map(item => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all ${isActivePath(item.path)
                          ? 'text-teal-700 bg-teal-50'
                          : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                        }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Additional Links for Mobile */}
                {user && (
                  <div className="mt-4 space-y-1">
                    <button
                      onClick={() => { navigate('/my-profile'); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-teal-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </button>
                    <button
                      onClick={() => { navigate('/my-bookings'); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-teal-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      My Bookings
                    </button>
                    <button
                      onClick={() => { navigate('/my-appointments'); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-teal-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      My Appointments
                    </button>
                    <button
                      onClick={() => { navigate('/my-pharmacy-orders'); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-teal-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Pharmacy Orders
                    </button>
                  </div>
                )}

                {/* Logout for Mobile */}
                {user && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default FullNavbar;