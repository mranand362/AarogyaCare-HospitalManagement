// backend/routes/bookingRoutes.js
import express from 'express';
import Booking from '../models/Booking.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

console.log('✅ Booking routes loaded');

// ✅ CREATE BOOKING
router.post('/', protect, async (req, res) => {
  try {
    console.log('📝 Creating booking for user:', req.user._id);
    console.log('📦 Booking data:', req.body);
    
    const {
      serviceName,
      serviceId,
      serviceIcon,
      price,
      duration,
      patientName,
      patientPhone,
      patientEmail,
      appointmentDate,
      appointmentTime,
      notes
    } = req.body;

    if (!serviceName || !patientName || !patientPhone || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const booking = new Booking({
      user: req.user._id,
      serviceName,
      serviceId: serviceId || 0,
      serviceIcon: serviceIcon || '🩺',
      price: price || 0,
      duration: duration || '30 mins',
      patientName,
      patientPhone,
      patientEmail: patientEmail || '',
      appointmentDate,
      appointmentTime,
      notes: notes || '',
      status: 'confirmed'
    });

    await booking.save();
    
    console.log('✅ Booking saved, ID:', booking._id);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
});

// ✅ GET MY BOOKINGS
router.get('/my-bookings', protect, async (req, res) => {
  try {
    console.log('📋 Fetching bookings for user:', req.user._id);
    
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    console.log(`✅ Found ${bookings.length} bookings`);

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('❌ Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// ✅ CANCEL BOOKING
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    console.log('📝 Cancelling booking:', req.params.id);
    
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    console.log('✅ Booking cancelled successfully');

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('❌ Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message
    });
  }
});

export default router;