import express from 'express';
import PharmacyOrder from '../models/PharmacyOrder.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create order
router.post('/orders', protect, async (req, res) => {
  try {
    const orderId = `PH-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const order = new PharmacyOrder({ 
      ...req.body, 
      orderId, 
      user: req.user._id 
    });
    await order.save();
    res.status(201).json({ 
      success: true, 
      message: 'Order placed successfully', 
      order 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get user orders
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await PharmacyOrder.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cancel order
router.put('/orders/:orderId/cancel', protect, async (req, res) => {
  try {
    const order = await PharmacyOrder.findOne({ 
      orderId: req.params.orderId, 
      user: req.user._id 
    });
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }
    order.status = 'cancelled';
    await order.save();
    res.json({ success: true, message: 'Order cancelled' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;