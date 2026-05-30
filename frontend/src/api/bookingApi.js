// frontend/src/api/bookingApi.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// ✅ Get token from multiple sources
const getToken = () => {
  // Try to get from localStorage first
  let token = localStorage.getItem('token');
  
  // If not in localStorage, try to get from user object
  if (!token) {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      token = user.token;
    } catch (e) {
      console.error('Error parsing user:', e);
    }
  }
  
  // If still no token, try to get from sessionStorage
  if (!token) {
    token = sessionStorage.getItem('token');
  }
  
  console.log('🔍 getToken() - Token found:', token ? 'Yes' : 'No');
  
  return token;
};

// ✅ Create axios instance with token
const createAxiosInstance = () => {
  const token = getToken();
  
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('✅ Axios instance created with Authorization header');
  } else {
    console.warn('⚠️ Axios instance created WITHOUT token');
  }
  
  return instance;
};

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    console.log('📝 Creating booking...');
    const axiosInstance = createAxiosInstance();
    const response = await axiosInstance.post('/bookings', bookingData);
    console.log('✅ Booking created:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating booking:', error.response?.data || error.message);
    throw error;
  }
};

// Get all bookings
export const getUserBookings = async () => {
  try {
    console.log('📝 Fetching bookings...');
    const axiosInstance = createAxiosInstance();
    const response = await axiosInstance.get('/bookings/my-bookings');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching bookings:', error.response?.data || error.message);
    throw error;
  }
};

// Cancel a booking
export const cancelBooking = async (bookingId) => {
  try {
    console.log('📝 Cancelling booking:', bookingId);
    const axiosInstance = createAxiosInstance();
    const response = await axiosInstance.put(`/bookings/${bookingId}/cancel`);
    return response.data;
  } catch (error) {
    console.error('❌ Error cancelling booking:', error.response?.data || error.message);
    throw error;
  }
};