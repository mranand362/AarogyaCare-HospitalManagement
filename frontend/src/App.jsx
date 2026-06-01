// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import DoctorsProfile from './pages/DoctorsProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import Appointment from './pages/Appointment';
import MyAppointments from './pages/MyAppointments';
import Services from './pages/Services';
import HealthPackages from './pages/HealthPackages';
import Terms from './pages/Terms';
import FAQs from './pages/FAQs';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Sitemap from './pages/Sitemap';
import Feedback from './pages/Feedback';
import EmergencyCare from './pages/EmergencyCare';
import HomeCareServices from './pages/HomeCareServices';
import VideoConsultation from './pages/VideoConsultation';
import TopDoctors from './components/TopDoactors';  // ✅ Fixed spelling
import CareerOpportunities from './pages/CareerOppurtunities';  // ✅ Fixed spelling
import ApplyNow from './pages/ApplyNow';
import Diagnostics from './pages/Diagnostics';
import HealthCheckups from './pages/HealthCheckups';
import PharmacyDelivery from './pages/PharmacyDelivery';
import MyPharmacyOrders from './pages/MyPharmacyOrders';
import MyBookings from './pages/MyBookings';  // ✅ Fixed filename (Mybookings -> MyBookings)

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public Routes - Sabke liye open */}
            <Route path='/' element={<Home />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/doctors/:id' element={<DoctorsProfile />} />  {/* ✅ Fixed: doctor profile route */}
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/services' element={<Services />} />
            <Route path='/health-packages' element={<HealthPackages />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/faqs' element={<FAQs />} />
            <Route path='/cookie-policy' element={<CookiePolicy />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/sitemap' element={<Sitemap />} />
            <Route path='/feedback' element={<Feedback />} />
            <Route path='/services/emergency' element={<EmergencyCare />} />
            <Route path='/services/home-care' element={<HomeCareServices />} />
            <Route path='/services/video-consultation' element={<VideoConsultation />} />
            <Route path='/top-doctors' element={<TopDoctors />} />  {/* ✅ Fixed: separate route for TopDoctors */}
            <Route path='/careers' element={<CareerOpportunities />} />
            <Route path='/apply-now' element={<ApplyNow />} />
            <Route path='/services/diagnostics' element={<Diagnostics />} />
            <Route path='/services/health-checkup' element={<HealthCheckups />} />
            <Route path='/services/pharmacy' element={<PharmacyDelivery />} />
            <Route path='/pharmacy-delivery' element={<PharmacyDelivery />} />
            <Route path="/my-pharmacy-orders" element={<MyPharmacyOrders />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            
            {/* Protected Routes - Sirf login users ke liye */}
            <Route 
              path='/profile' 
              element={
                <PrivateRoute>
                  <MyProfile />
                </PrivateRoute>
              } 
            />

            <Route
              path="/appointments"
              element={
                <PrivateRoute>
                  <Appointment />
                </PrivateRoute>
              }
            />
            
            <Route 
              path='/my-appointments' 
              element={
                <PrivateRoute>
                  <MyAppointments />
                </PrivateRoute>
              } 
            />

            <Route 
              path='/appointment' 
              element={
                <PrivateRoute>
                  <Appointment />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;