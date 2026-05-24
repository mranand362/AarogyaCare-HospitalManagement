// Header.jsx
import React, { useState, useEffect } from 'react';
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
/* eslint-enable no-unused-vars */
import { useNavigate } from 'react-router-dom';  // ✅ Add this import
import header_img from "../assets/header_img.png";

const Header = () => {

  const navigate = useNavigate();  // ✅ Initialize navigate
  const [typedText, setTypedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const words = [
    "Your Health, Our Priority",
    "Expert Care You Can Trust",
    "24/7 Medical Assistance",
    "Advanced Treatment Options"
  ];


  // Typewriter Effect
 useEffect(() => {
  const currentWord = words[wordIndex];
  let timer;

  if (!isDeleting) {
    if (charIndex < currentWord.length) {
      timer = setTimeout(() => {
        setTypedText(currentWord.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 100);
    } else {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    }
  } else {
    if (charIndex > 0) {
      timer = setTimeout(() => {
        setTypedText(currentWord.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 50);
    } else {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }
  }

  return () => clearTimeout(timer);
}, [charIndex, isDeleting, wordIndex]);
  // Blinking cursor effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  // Stats counter animation with framer motion
  const [stats, setStats] = useState({
    doctors: 0,
    specialties: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const targetStats = {
      doctors: 50,
      specialties: 20,
      satisfaction: 98
    };

    const duration = 2000;
    const steps = 60;
    const increment = {
      doctors: targetStats.doctors / steps,
      specialties: targetStats.specialties / steps,
      satisfaction: targetStats.satisfaction / steps
    };
    
    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setStats({
          doctors: Math.min(Math.ceil(increment.doctors * currentStep), targetStats.doctors),
          specialties: Math.min(Math.ceil(increment.specialties * currentStep), targetStats.specialties),
          satisfaction: Math.min(Math.ceil(increment.satisfaction * currentStep), targetStats.satisfaction)
        });
        currentStep++;
      } else {
        setStats(targetStats);
        clearInterval(timer);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, []);

  // ✅ Updated navigation functions
  const handleBookAppointment = () => {
    navigate('/doctors');  // Navigate to Doctors page
  };

  const handleVideoConsultation = () => {
    navigate('/doctors');  // Navigate to Doctors page (or change to '/video-consultation')
  };

  // Animation variants (rest remains same)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.8
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

  const floatingCardVariants = {
    initial: { y: 0, opacity: 0, scale: 0 },
    animate: (custom) => ({
      y: [0, -10, 0],
      opacity: 1,
      scale: 1,
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        },
        opacity: { duration: 0.5, delay: custom * 0.2 },
        scale: { duration: 0.5, delay: custom * 0.2 }
      }
    }),
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 300
      }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 300
      }
    },
    tap: { scale: 0.95 }
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
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

  const statCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }),
    hover: {
      y: -5,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 200
      }
    }
  };

  return (
    
    <header className="relative bg-gradient-to-br from-slate-50 via-white to-teal-50/30 overflow-hidden">
      {/* Rest of your JSX remains exactly the same */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-0 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"
        />
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-0 md:py-5 lg:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
        >
          {/* Left Side - Hero Content */}
          <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
            <motion.div
              variants={badgeVariants}
              whileHover="hover"
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold cursor-pointer group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-gray-700 group-hover:text-teal-600 transition-colors">Trusted by 10,000+ Patients</span>
            </motion.div>

            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                <span className="text-gray-900">Your Health,</span>
                <br />
                <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                  Our Expertise
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="h-5 sm:h-6 md:h-4"
              >
                <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-teal-600">
                  {typedText}
                  <span className={`inline-block w-0.5 h-6 md:h-8 bg-teal-600 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-gray-600 text-base sm:text-lg leading-relaxed"
            >
              Experience exceptional healthcare with our team of board-certified specialists. 
              Advanced medical technology combined with compassionate care for you and your family.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 py-4"
            >
              {[
                { value: stats.doctors, label: "Expert Doctors", suffix: "+" },
                { value: stats.specialties, label: "Specialties", suffix: "+" },
                { value: stats.satisfaction, label: "Satisfaction", suffix: "%" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={statCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="text-center lg:text-left group cursor-pointer"
                >
                  <motion.p
                    className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors"
                  >
                    {stat.value}{stat.suffix}
                  </motion.p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.button
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                onClick={handleBookAppointment}  // ✅ Now navigates to /doctors
                className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <motion.svg
                  className="w-5 h-5 group-hover:rotate-12"
                  whileHover={{ rotate: 12 }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </motion.svg>
                Book Appointment
              </motion.button>
              <motion.button
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                onClick={handleVideoConsultation}
                className="border-2 border-gray-300 bg-white hover:border-teal-500 text-gray-700 hover:text-teal-600 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold flex items-center justify-center gap-2 group"
              >
                <motion.svg
                  className="w-5 h-5 group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
                Video Consultation
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.img
                      key={i}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${40 + i}.jpg`}
                      alt={`Patient ${i}`}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </motion.svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium hover:text-teal-600 transition-colors">4.9 (5k+ reviews)</span>
                </div>
              </motion.div>
              <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
              <motion.div
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <motion.svg
                  whileHover={{ scale: 1.1 }}
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </motion.svg>
                <span className="text-sm text-gray-600 hover:text-teal-600 transition-colors">NABH Accredited</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Combined Doctors Image */}
          <motion.div
            variants={itemVariants}
            className="relative mt-8 lg:mt-0"
          >
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
            >
              <div className="relative bg-gradient-to-br from-teal-700 to-teal-900">
                <motion.img
                  src={header_img}
                  alt="Medical Team"
                  className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-teal-900/50 via-teal-800/20 to-transparent"
                />
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white"
                >
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="flex -space-x-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.1 }}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-medium">50+ Expert Doctors</span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Meet Our Medical Team</h3>
                  <p className="text-xs sm:text-sm text-white/90">Specialized in 20+ medical departments</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              custom={0}
              variants={floatingCardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white rounded-xl shadow-lg p-2 sm:p-3 cursor-pointer z-10"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-red-100 p-1.5 sm:p-2 rounded-lg"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </motion.div>
                <div>
                  <p className="text-xs text-gray-500">24/7 Emergency</p>
                  <p className="text-sm font-bold text-gray-900">102</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              custom={1}
              variants={floatingCardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-xl shadow-lg p-2 sm:p-3 cursor-pointer z-10"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-teal-100 p-1.5 sm:p-2 rounded-lg"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <div>
                  <p className="text-xs text-gray-500">Combined Experience</p>
                  <p className="text-sm font-bold text-gray-900">200+ Years</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              className="absolute top-1/2 -right-2 sm:-right-4 transform -translate-y-1/2 bg-teal-600 text-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg cursor-pointer z-10"
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">Available 24/7</span>
              </div>
            </motion.div>

            <motion.div
              custom={2}
              variants={floatingCardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="absolute top-1/4 -left-4 sm:-left-6 bg-white rounded-xl shadow-lg p-2 sm:p-3 cursor-pointer hidden sm:block z-10"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-100 p-1.5 sm:p-2 rounded-lg"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <div>
                  <p className="text-xs text-gray-500">Success Rate</p>
                  <p className="text-sm font-bold text-gray-900">98.5%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </header>
  );
};

export default Header;