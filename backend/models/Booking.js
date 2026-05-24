// backend/models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  serviceId: {
    type: Number,
    default: 0
  },
  serviceIcon: {
    type: String,
    default: '🩺'
  },
  price: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
    default: '30 mins'
  },
  patientName: {
    type: String,
    required: true
  },
  patientPhone: {
    type: String,
    required: true
  },
  patientEmail: {
    type: String,
    default: ''
  },
  appointmentDate: {
    type: String,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed', 'pending'],
    default: 'confirmed'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;