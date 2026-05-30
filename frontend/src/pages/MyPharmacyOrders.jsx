// frontend/src/pages/MyPharmacyOrders.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyPharmacyOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view your orders');
        navigate('/login');
        return;
      }
      
      setLoading(true);
      try {
    const response = await axios.get('https://aarogyacare-hospitalmanagement.onrender.com/api/pharmacy/my-orders', {
  headers: { 'Authorization': `Bearer ${token}` }
});
        
        console.log('Orders response:', response.data);
        
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [navigate]);

  const cancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://aarogyacare-hospitalmanagement.onrender.com/api/pharmacy/orders/${orderId}/cancel`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setOrders(prev => prev.map(order =>
          order.orderId === orderId
            ? { ...order, status: 'cancelled' }
            : order
        ));
        toast.success('Order cancelled successfully');
      } else {
        toast.error(response.data.message || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel order');
    }
  };

  const activeOrders = orders.filter(o => o.status !== 'cancelled' && o.status !== 'delivered');
  const pastOrders = orders.filter(o => o.status === 'cancelled' || o.status === 'delivered');
  
  const displayedOrders = activeTab === 'active' ? activeOrders : pastOrders;

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      confirmed: '✅',
      shipped: '🚚',
      delivered: '📦',
      cancelled: '❌'
    };
    return icons[status] || '📋';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-gray-600 mb-4">Please login to view your orders</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Pharmacy Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your medicine orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Orders</p>
              <p className="text-2xl font-bold text-green-600">{activeOrders.length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-2xl font-bold text-blue-600">{pastOrders.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-xl shadow-md">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-4 text-center font-medium transition-all ${
                activeTab === 'active'
                  ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/30'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Active Orders ({activeOrders.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-4 text-center font-medium transition-all ${
                activeTab === 'past'
                  ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/30'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Order History ({pastOrders.length})
              </span>
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-b-xl shadow-md p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading your orders...</p>
            </div>
          ) : displayedOrders.length === 0 ? (
            <div className="text-center py-16">
              {activeTab === 'active' ? (
                <>
                  <div className="text-6xl mb-4">💊</div>
                  <p className="text-gray-500 text-lg mb-2">No active orders</p>
                  <p className="text-gray-400 text-sm mb-6">You haven't placed any pharmacy orders yet</p>
                  <button
                    onClick={() => navigate('/pharmacy-delivery')}
                    className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition shadow-md"
                  >
                    Shop Medicines
                  </button>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-gray-500 text-lg">No order history</p>
                  <p className="text-gray-400 text-sm mt-2">Your past orders will appear here</p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {displayedOrders.map((order) => (
                <div key={order.orderId} className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{getStatusIcon(order.status)}</span>
                        <h3 className="font-bold text-gray-800 text-lg">Order #{order.orderId}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(order.status)}`}>
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">
                        Placed on: {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-600">₹{formatPrice(order.totalAmount)}</p>
                      <p className="text-xs text-gray-400">Total amount</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="py-4">
                    <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Order Items
                    </p>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="text-gray-800">{item.name}</span>
                            <span className="text-gray-500 text-xs ml-2">x{item.quantity}</span>
                            <p className="text-xs text-gray-400">{item.packSize} • {item.manufacturer}</p>
                          </div>
                          <span className="font-semibold text-gray-800">₹{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="py-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Delivery Address
                    </p>
                    <p className="text-gray-600 text-sm">
                      {order.deliveryAddress.address}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Contact: {order.patientName} | {order.patientPhone}
                    </p>
                  </div>

                  {/* Additional Info */}
                  {order.notes && (
                    <div className="py-2 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-700 mb-1">Additional Notes:</p>
                      <p className="text-gray-500 text-sm">{order.notes}</p>
                    </div>
                  )}

                  {/* Prescription Info */}
                  {order.prescriptionUploaded && (
                    <div className="py-2">
                      <p className="text-xs text-emerald-600 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Prescription uploaded
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {order.status === 'pending' && activeTab === 'active' && (
                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                      <button
                        onClick={() => cancelOrder(order.orderId)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel Order
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate('/pharmacy-delivery')}
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition shadow-md flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Shop More Medicines
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="border-2 border-emerald-600 text-emerald-600 px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-50 transition flex items-center gap-2"
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

export default MyPharmacyOrders;