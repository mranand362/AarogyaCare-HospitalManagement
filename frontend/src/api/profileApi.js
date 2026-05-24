// profileApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get profile
export const getProfile = async () => {
  const token = localStorage.getItem('token');
  console.log('Getting profile with token:', token ? 'Present' : 'Missing');
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const response = await axios.get(`${API_URL}/profile`, config);
  return response.data;
};

// Update profile - ✅ FIXED to include profilePic
export const updateProfile = async (userData) => {
  const token = localStorage.getItem('token');
  console.log('Updating profile with token:', token ? 'Present' : 'Missing');
  
  // ✅ Ensure profilePic is included in the data
  const dataToSend = {
    name: userData.name,
    phone: userData.phone,
    dateOfBirth: userData.dateOfBirth,
    bloodGroup: userData.bloodGroup,
    gender: userData.gender,
    address: userData.address,
    city: userData.city,
    pincode: userData.pincode,
    emergencyContact: userData.emergencyContact,
    allergies: userData.allergies,
    medicalConditions: userData.medicalConditions,
    profilePic: userData.profilePic || ''  // ✅ Add this line
  };
  
  console.log('Data being sent:', dataToSend);
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  
  const response = await axios.put(`${API_URL}/profile`, dataToSend, config);
  return response.data;
};