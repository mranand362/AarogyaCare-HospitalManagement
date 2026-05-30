// Contact.jsx
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Contact Information
  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Us",
      details: ["123 Healthcare Avenue", "Medical District", "Mumbai - 400001", "Maharashtra, India"]
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["Emergency: +91 1800 123 4567", "Appointments: +91 22 1234 5678", "Ambulance: 102", "Fax: +91 22 1234 5679"]
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: ["General: info@aarogyacare.com", "Appointments: booking@aarogyacare.com", "Emergency: emergency@aarogyacare.com", "Support: support@aarogyacare.com"]
    },
    {
      icon: "🕒",
      title: "Working Hours",
      details: ["Monday - Friday: 9:00 AM - 8:00 PM", "Saturday: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM", "Emergency: 24/7 Available"]
    }
  ];

  // Departments
  const departments = [
    "Cardiology", "Neurology", "Orthopedics", "Pediatrics", 
    "Dermatology", "Ophthalmology", "Gynecology", "Psychiatry"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // Simulate API call
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
// eslint-disable-next-line no-unused-vars
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 200
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      
      {/* Hero Section */}
<section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 text-white py-16 sm:py-20 md:py-24 overflow-hidden">

  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="contact-grid"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#contact-grid)" />
    </svg>
  </div>

  {/* Glow Effects */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"></div>
  </div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

    {/* Badge */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-5"
    >
      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
      <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">
        24/7 Support & Assistance
      </span>
    </motion.div>

    {/* Heading */}
    <motion.h1
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
    >
      Contact <span className="text-teal-200">Us</span>
    </motion.h1>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-base sm:text-lg md:text-xl text-teal-50 max-w-3xl mx-auto leading-relaxed"
    >
      We’re here to answer your questions, assist your healthcare journey,
      and provide the support you need anytime, anywhere.
    </motion.p>

  </div>
</section>
      {/* Contact Form and Map Section */}
     <section className="pt-6 pb-0 sm:pt-8 sm:pb-0 md:pt-10 md:pb-0"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            
            {/* Contact Form */}
            <motion.div
              variants={formVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 self-start"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>
              
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg text-green-700"
                >
                  ✓ Thank you for contacting us! We'll respond shortly.
                </motion.div>
              )}
              
              {submitError && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg text-red-700">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="9876543210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select subject</option>
                      <option value="Appointment">Appointment Booking</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Complaint">Complaint</option>
                      <option value="General">General Inquiry</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Please describe your query or concern..."
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white py-3 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              variants={formVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Google Map Embed */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Find Us Here</h3>
                  <p className="text-gray-600 text-sm mt-1">123 Healthcare Avenue, Mumbai</p>
                </div>
                <div className="w-full h-64 sm:h-80 bg-gray-200">
                  <iframe
                    title="Hospital Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1x241316.64370086133!2d72.74110141083984!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699876543210!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Emergency Contact Box */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white text-center">
                <div className="text-5xl mb-3">🚑</div>
                <h3 className="text-2xl font-bold mb-2">24/7 Emergency Service</h3>
                <p className="text-red-100 mb-4">For medical emergencies, call us immediately</p>
                <a href="tel:102" className="inline-block bg-white text-red-600 px-6 py-3 rounded-full font-bold text-lg hover:bg-red-50 transition-all">
                  Call 102
                </a>
              </div>

              {/* Departments List */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Our Departments</h3>
                <div className="grid grid-cols-2 gap-3">
                  {departments.map((dept, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      <span className="text-sm">{dept}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex gap-4 justify-center sm:justify-start">
                  {[
                    { name: "Facebook", icon: "📘", color: "hover:bg-blue-600" },
                    { name: "Twitter", icon: "🐦", color: "hover:bg-sky-500" },
                    { name: "Instagram", icon: "📷", color: "hover:bg-pink-600" },
                    { name: "LinkedIn", icon: "🔗", color: "hover:bg-blue-700" },
                    { name: "YouTube", icon: "📺", color: "hover:bg-red-600" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.1, y: -5 }}
                      className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl transition-all ${social.color} hover:text-white`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked <span className="text-teal-600">Questions</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Find answers to common questions about our services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How do I book an appointment?",
                a: "You can book an appointment online through our website, call our appointment desk, or visit the hospital in person."
              },
              {
                q: "What documents should I bring for my first visit?",
                a: "Please bring a valid ID proof, previous medical records (if any), insurance cards, and list of current medications."
              },
              {
                q: "Do you accept health insurance?",
                a: "Yes, we accept all major health insurance plans. Please bring your insurance card for verification."
              },
              {
                q: "What are the visiting hours?",
                a: "General visiting hours are from 4 PM to 7 PM daily. ICU visiting hours are restricted to 30 minutes."
              },
              {
                q: "Is telemedicine consultation available?",
                a: "Yes, we offer video consultations with our specialists. You can book these through our website."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-all"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 text-center text-white"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-teal-100 mb-6 max-w-md mx-auto">
              Get health tips, updates, and news delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-teal-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;