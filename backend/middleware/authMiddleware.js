// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  
  console.log('🔐 Auth middleware called');
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('🔑 Token received:', token.substring(0, 50) + '...');
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('📝 Decoded token:', decoded);
      
      // ✅ Support both userId and id
      const userId = decoded.userId || decoded.id;
      console.log('🔍 Looking for user ID:', userId);
      
      const user = await User.findById(userId).select('-password');
      
      if (!user) {
        console.error('❌ User not found for ID:', userId);
        return res.status(401).json({ 
          success: false,
          message: 'User not found' 
        });
      }
      
      console.log('✅ User authenticated:', user.email);
      req.user = user;
      next();
    } catch (error) {
      console.error('❌ Auth error:', error.message);
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized, token failed' 
      });
    }
  } else {
    console.error('❌ No authorization header');
    return res.status(401).json({ 
      success: false,
      message: 'Not authorized, no token' 
    });
  }
};