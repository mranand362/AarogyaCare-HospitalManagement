import mongoose from 'mongoose';

const pharmacyOrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  items: [{
    medicineId: Number,
    name: String,
    price: Number,
    quantity: Number,
    packSize: String,
    manufacturer: String
  }],
  totalAmount: {
    type: Number,
    required: true
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
  deliveryAddress: {
    address: String,
    city: String,
    pincode: String
  },
  prescriptionUploaded: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('PharmacyOrder', pharmacyOrderSchema);