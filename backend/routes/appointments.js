// backend/routes/appointments.js
import express from 'express';
import Appointment from '../models/Appointment.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


// ✅ Create new appointment
router.post('/', protect, async (req, res) => {
  try {
    const {
      doctorId,
      doctorName,
      doctorSpecialty,
      doctorFee,
      patientName,
      patientEmail,
      patientPhone,
      patientAge,
      patientGender,
      appointmentDate,
      appointmentTime,
      notes
    } = req.body;

    const bookingId = `APPT${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const appointment = new Appointment({
      userId: req.user._id,
      doctorId,
      doctorName,
      doctorSpecialty,
      doctorFee,
      patientName,
      patientEmail,
      patientPhone,
      patientAge,
      patientGender,
      appointmentDate,
      appointmentTime,
      notes,
      bookingId
    });

    await appointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment
    });

  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Get user's appointments
router.get('/my-appointments', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Get single appointment
router.get('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Cancel appointment
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status: 'cancelled' },
      { returnDocument: 'after' } // updated mongoose fix
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({
      success: true,
      message: 'Appointment cancelled',
      appointment
    });

  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;