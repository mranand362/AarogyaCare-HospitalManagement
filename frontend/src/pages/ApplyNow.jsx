// ApplyNow.jsx - Only Application Form (No Banner)
import React, { useState } from 'react';

const ApplyNow = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Job Positions
  const jobPositions = [
    { value: "", label: "Select Position" },
    { value: "Senior Cardiologist", label: "Senior Cardiologist" },
    { value: "Registered Nurse (RN)", label: "Registered Nurse (RN)" },
    { value: "Pediatrician", label: "Pediatrician" },
    { value: "Radiology Technician", label: "Radiology Technician" },
    { value: "Medical Lab Technologist", label: "Medical Lab Technologist" },
    { value: "Physical Therapist", label: "Physical Therapist" },
    { value: "Neurologist", label: "Neurologist" },
    { value: "General Surgeon", label: "General Surgeon" },
    { value: "Hospital Administrator", label: "Hospital Administrator" }
  ];

  // Experience Levels
  const experienceLevels = [
    { value: "", label: "Select Experience" },
    { value: "fresher", label: "Fresher (0-1 years)" },
    { value: "junior", label: "Junior (1-3 years)" },
    { value: "mid", label: "Mid-Level (3-6 years)" },
    { value: "senior", label: "Senior (6-10 years)" },
    { value: "expert", label: "Expert (10+ years)" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          resume: null,
          coverLetter: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Form Container */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-5 sm:px-8 sm:py-6">
          <h2 className="text-white text-xl sm:text-2xl font-bold">Job Application Form</h2>
          <p className="text-teal-100 text-sm mt-1">Fill out the form below to apply for a position</p>
        </div>
        
        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {submitSuccess ? (
            // Success Message
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 sm:p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
              <p className="text-gray-600">Thank you for applying. Our HR team will review your application and get back to you within 24-48 hours.</p>
            </div>
          ) : (
            // Application Form
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Position Applying For <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
                  >
                    {jobPositions.map((job, index) => (
                      <option key={index} value={job.value}>{job.label}</option>
                    ))}
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Experience Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
                  >
                    {experienceLevels.map((level, index) => (
                      <option key={index} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Upload Resume/CV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    required
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Cover Letter</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us why you'd be a great fit for this position..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Submit Application
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500">
                By submitting this application, you agree to our privacy policy and terms of service.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyNow;