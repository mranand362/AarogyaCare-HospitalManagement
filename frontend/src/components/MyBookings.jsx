// frontend/src/pages/MyBookings.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserBookings, cancelBooking } from '../api/bookingApi';
import { toast } from 'react-toastify';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [cancellingId, setCancellingId] = useState(null);

  // Load bookings
  useEffect(() => {
    const loadBookings = async () => {
      const token = localStorage.getItem('token');
      console.log('🔍 Token:', token ? 'Present' : 'Missing');
      
      if (!token) {
        toast.error('Please login to view your bookings');
        navigate('/login');
        return;
      }
      
      setLoading(true);
      try {
        const response = await getUserBookings();
        console.log('📥 API Response:', response);
        
        if (response && response.success) {
          console.log(`✅ Found ${response.bookings?.length || 0} bookings`);
          console.log('📋 First booking:', response.bookings?.[0]);
          setBookings(response.bookings || []);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error('❌ Error:', error);
        toast.error('Failed to load bookings');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadBookings();
  }, []);

  // Cancel booking
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    setCancellingId(bookingId);
    try {
      const response = await cancelBooking(bookingId);
      if (response.success) {
        setBookings(prev => prev.map(booking =>
          booking._id === bookingId
            ? { ...booking, status: 'cancelled' }
            : booking
        ));
        toast.success('Booking cancelled successfully');
      } else {
        toast.error(response.message || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancellingId(null);
    }
  };

  // Filter bookings - check status correctly
  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const pastBookings = bookings.filter(b => b.status === 'cancelled');
  
  const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return '0';
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Debug - check state
  console.log('📊 Bookings length:', bookings.length);
  console.log('📊 Upcoming:', upcomingBookings.length);
  console.log('📊 Past:', pastBookings.length);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-gray-600 mb-4">Please login to view your bookings</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/30 to-cyan-50/30 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">View and manage all your service bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            </div>
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Upcoming</p>
              <p className="text-2xl font-bold text-green-600">{upcomingBookings.length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">{pastBookings.length}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-xl shadow-md">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-4 text-center font-medium transition-all ${
                activeTab === 'upcoming'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/30'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upcoming ({upcomingBookings.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-4 text-center font-medium transition-all ${
                activeTab === 'past'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/30'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Past ({pastBookings.length})
              </span>
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-b-xl shadow-md p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading your bookings...</p>
            </div>
          ) : displayedBookings.length === 0 ? (
            <div className="text-center py-16">
              {activeTab === 'upcoming' ? (
                <>
                  <div className="text-6xl mb-4">📅</div>
                  <p className="text-gray-500 text-lg mb-2">No upcoming bookings</p>
                  <p className="text-gray-400 text-sm mb-6">You haven't booked any services yet</p>
                  <button
                    onClick={() => navigate('/services')}
                    className="bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 transition shadow-md"
                  >
                    Browse Services
                  </button>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-gray-500 text-lg">No past bookings</p>
                  <p className="text-gray-400 text-sm mt-2">Your cancelled bookings will appear here</p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {displayedBookings.map((booking) => (
                <div 
                  key={booking._id} 
                  className={`border rounded-xl p-5 transition-all ${
                    activeTab === 'upcoming' 
                      ? 'border-gray-200 hover:shadow-lg hover:border-teal-200' 
                      : 'border-gray-200 opacity-80'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Left Section - Service Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-5xl">{booking.serviceIcon || '🩺'}</div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-800">{booking.serviceName}</h3>
                          {activeTab === 'upcoming' && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                              ● Active
                            </span>
                          )}
                          {activeTab === 'past' && (
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                              Cancelled
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-500 text-sm mb-3">
                          Booking ID: #{booking._id?.slice(-8) || 'N/A'}
                        </p>
                        
                        <div className="flex flex-wrap gap-3 mb-3">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatDate(booking.appointmentDate)}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{booking.appointmentTime || 'Time not set'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>₹{formatPrice(booking.price)}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Patient Details</p>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            <span>👤 {booking.patientName || 'N/A'}</span>
                            <span>📞 {booking.patientPhone || 'N/A'}</span>
                            <span>📧 {booking.patientEmail || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Action Buttons */}
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-teal-600">₹{formatPrice(booking.price)}</p>
                        <p className="text-xs text-gray-400">Total amount</p>
                      </div>
                      
                      {activeTab === 'upcoming' && (
                        <>
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            disabled={cancellingId === booking._id}
                            className="w-full md:w-auto px-5 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {cancellingId === booking._id ? (
                              <>
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Cancelling...
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel Booking
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => navigate('/services')}
                            className="w-full md:w-auto px-5 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Book New
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate('/services')}
            className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition shadow-md flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Book New Service
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="border-2 border-teal-600 text-teal-600 px-6 py-2.5 rounded-lg font-medium hover:bg-teal-50 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;