// frontend/src/api/appointmentApi.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createAppointment = async (appointmentData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/appointments`, appointmentData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getUserAppointments = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/appointments/my-appointments`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const cancelAppointment = async (appointmentId) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/appointments/${appointmentId}/cancel`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};