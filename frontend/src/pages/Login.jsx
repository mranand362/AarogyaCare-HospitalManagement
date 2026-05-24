// frontend/src/pages/Login.jsx
// frontend/src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { login, signup } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

// Rest of your component remains exactly the same...

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) newErrors.email = "Email is invalid";
    if (!loginData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.name.trim()) newErrors.name = "Full name is required";
    if (!signupData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupData.email)) newErrors.email = "Email is invalid";
    if (!signupData.password) newErrors.password = "Password is required";
    else if (signupData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (signupData.password !== signupData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setIsLoading(true);

    try {
      const res = await login(loginData);
      authLogin(res.data.user, res.data.token);
      toast.success('Login successful! Welcome back!');
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setIsLoading(true);

    try {
      await signup(signupData);
      toast.success('Account created successfully! Please login.');
      setTimeout(() => {
        setIsLogin(true);
        setSignupData({ name: "", email: "", password: "", confirmPassword: "", role: "patient" });
        setErrors({});
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-teal-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-600 px-6 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-2"
          >
            <div className="bg-white rounded-full p-3 w-20 h-20 flex items-center justify-center shadow-lg">
              <span className="text-teal-700 text-4xl font-bold">🏥</span>
            </div>
          </motion.div>
          <h1 className="text-white text-3xl font-bold mt-2">Aarogya Care</h1>
          <p className="text-teal-100 text-sm mt-1">Your Health Companion</p>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleLoginSubmit}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome Back</h2>
                
                {errors.general && (
                  <div className="mb-4 p-3 rounded-lg text-center text-sm bg-red-100 text-red-800 border border-red-200">
                    {errors.general}
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="••••••"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="flex justify-end mb-4">
                  <a href="#" className="text-sm text-teal-600 hover:underline transition">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>

                <p className="text-center text-gray-600 text-sm mt-6">
                  Don't have an account?{" "}
                  <button type="button" onClick={toggleMode} className="text-teal-600 font-medium hover:underline transition">
                    Sign up
                  </button>
                </p>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSignupSubmit}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Account</h2>

                {errors.general && (
                  <div className="mb-4 p-3 rounded-lg text-center text-sm bg-red-100 text-red-800 border border-red-200">
                    {errors.general}
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Full Name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Role</label>
                  <select
                    name="role"
                    value={signupData.role}
                    onChange={handleSignupChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Min. 6 characters"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating account..." : "Sign Up"}
                </button>

                <p className="text-center text-gray-600 text-sm mt-6">
                  Already have an account?{" "}
                  <button type="button" onClick={toggleMode} className="text-teal-600 font-medium hover:underline transition">
                    Login
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;