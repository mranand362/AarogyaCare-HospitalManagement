import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

console.log('Profile routes loaded ✅');

// ✅ GET profile
router.get('/', protect, async (req, res) => {
  console.log('GET /api/profile called');
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error in GET profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ UPDATE profile (with security filter)
router.put('/', protect, async (req, res) => {
  console.log('PUT /api/profile called');
  try {
    // ✅ Only these fields can be updated
    const allowedUpdates = [
      'name',
      'phone', 
      'dateOfBirth',
      'bloodGroup',
      'gender',
      'address',
      'city',
      'pincode',
      'emergencyContact',
      'allergies',
      'medicalConditions',
      'profilePic'     // ✅ Profile picture field added
    ];
    
    // Filter: only keep allowed fields from request body
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { returnDocument: 'after', runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Profile updated for:', user.email);
    res.json(user);
  } catch (err) {
    console.error('Error in PUT profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;