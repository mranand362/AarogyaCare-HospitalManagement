
import dns from "node:dns";
// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profile.js'; 
import appointmentRoutes from './routes/appointments.js';
import bookingRoutes from './routes/bookingRoutes.js';
import pharmacyRoutes from './routes/pharmacyRoutes.js'; // ✅ new route for pharmacy orders



// Load environment variables
dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);
// Connect to database
connectDB();

const app = express();


// Middleware
app.use(
  cors({
    origin: [
      "https://aarogya-care-hospital-management.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/appointments', appointmentRoutes); // ✅ now works
app.use('/api/bookings', bookingRoutes);
app.use('/api/pharmacy', pharmacyRoutes); // ✅ new route for pharmacy orders

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running', status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});


