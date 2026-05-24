// backend/controllers/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// ✅ Update generateToken to include both userId AND id
const generateToken = (userId) => {
  return jwt.sign(
    { 
      userId: userId,
      id: userId,        // ✅ Add id field for compatibility
      iat: Math.floor(Date.now() / 1000)
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '30d' }  // ✅ Increase to 30 days
  );
};

export const signup = async (req, res) => {
  try {
    console.log('📝 Signup request:', req.body.email);
    
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters' 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'patient'
    });

    await user.save();

    // ✅ Generate token after signup
    const token = generateToken(user._id);

    console.log('✅ User created successfully:', email);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,  // ✅ Send token in response
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating user', 
      error: error.message 
    });
  }
};

export const login = async (req, res) => {
  try {
    console.log('🔐 Login request for:', req.body.email);
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide email and password' 
      });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    user.lastLogin = new Date();
    await user.save();

    // ✅ Generate token
    const token = generateToken(user._id);

    console.log('✅ Login successful for:', email);
    console.log('🔑 Token created for user ID:', user._id.toString());

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error during login', 
      error: error.message 
    });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🔍 Token decoded:', decoded);
    
    // ✅ Support both userId and id
    const userId = decoded.userId || decoded.id;
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};