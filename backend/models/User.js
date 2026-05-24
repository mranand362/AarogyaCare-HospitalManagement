// backend/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // Tere existing fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
  profilePic: {
  type: String,
  default: ''
},
  
  // YE NAYE FIELDS ADD KARO
  phone: { type: String, default: '' },
  dateOfBirth: { type: String, default: '' },
  bloodGroup: { type: String, default: '' },
  gender: { type: String, default: '' },
  address: { type: String, default: '' },
  city: { type: String, default: '' },
  pincode: { type: String, default: '' },
  emergencyContact: { type: String, default: '' },
  allergies: { type: String, default: '' },
  
  medicalConditions: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);