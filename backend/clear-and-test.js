// backend/clear-and-test.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import dns from "node:dns";

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const setupTest = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear all users
    await User.deleteMany({});
    console.log('✅ Cleared all users');

    // Create a test user directly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);
    
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'patient'
    });
    
    await testUser.save();
    console.log('✅ Test user created: test@example.com / 123456');

    // Verify the user was created correctly
    const foundUser = await User.findOne({ email: 'test@example.com' });
    console.log('✅ User found in database:', foundUser ? 'Yes' : 'No');
    
    if (foundUser) {
      // Test password verification
      const isValid = await bcrypt.compare('123456', foundUser.password);
      console.log('✅ Password verification test:', isValid ? 'PASSED' : 'FAILED');
    }

    await mongoose.disconnect();
    console.log('✅ Setup complete');
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

setupTest();