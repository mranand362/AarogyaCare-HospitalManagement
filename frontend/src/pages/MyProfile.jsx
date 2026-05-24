// MyProfile.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateProfile, getProfile } from '../api/profileApi';
import { toast } from 'react-toastify';

const MyProfile = () => {
  
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    dateOfBirth: '',
    bloodGroup: '',
    gender: '',
    address: '',
    city: '',
    pincode: '',
    emergencyContact: '',
    allergies: '',
    medicalConditions: '',
    profilePic: ''
  });

  // Cloudinary credentials
  const CLOUDINARY_CLOUD_NAME = 'dhvbdc2cr';
  const CLOUDINARY_UPLOAD_PRESET = 'my_profile_preset';

  // Load user profile data from API
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setFormData({
          name: data.name || user?.name || '',
          email: data.email || user?.email || '',
          role: data.role || user?.role || 'patient',
          phone: data.phone || '',
          dateOfBirth: data.dateOfBirth || '',
          bloodGroup: data.bloodGroup || '',
          gender: data.gender || '',
          address: data.address || '',
          city: data.city || '',
          pincode: data.pincode || '',
          emergencyContact: data.emergencyContact || '',
          allergies: data.allergies || '',
          medicalConditions: data.medicalConditions || '',
          profilePic: data.profilePic || ''
        });
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    
    if (user) {
      loadProfile();
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPEG, PNG, GIF, WEBP)');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    setUploadingImage(true);
    toast.info('Uploading image...');
    
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: uploadData }
      );
      
      const result = await res.json();
      
      if (result.secure_url) {
        setFormData(prev => ({ ...prev, profilePic: result.secure_url }));
        toast.success('Profile picture uploaded! Click Save to update profile.');
      } else {
        throw new Error(result.error?.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Image upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUser = await updateProfile(formData);
      
      if (setUser) {
        setUser(updatedUser);
      }
      
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...currentUser, ...updatedUser }));
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setFormData({
          name: data.name || user?.name || '',
          email: data.email || user?.email || '',
          role: data.role || user?.role || 'patient',
          phone: data.phone || '',
          dateOfBirth: data.dateOfBirth || '',
          bloodGroup: data.bloodGroup || '',
          gender: data.gender || '',
          address: data.address || '',
          city: data.city || '',
          pincode: data.pincode || '',
          emergencyContact: data.emergencyContact || '',
          allergies: data.allergies || '',
          medicalConditions: data.medicalConditions || '',
          profilePic: data.profilePic || ''
        });
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    
    loadProfile();
    setIsEditing(false);
  };

  const getInitials = () => {
    if (formData.name) {
      const nameParts = formData.name.trim().split(' ');
      if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      }
      return nameParts[0].slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const getRoleBadge = () => {
    switch(formData.role) {
      case 'doctor':
        return '👨‍⚕️ Doctor';
      case 'patient':
        return '🩺 Patient';
      case 'admin':
        return '👑 Admin';
      default:
        return '📝 User';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view your profile</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and medical details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-8 text-center">
                {/* Profile Image */}
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden">
                  {formData.profilePic ? (
                    <img src={formData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-teal-600">{getInitials()}</span>
                  )}
                </div>
                
                {/* Upload Button */}
                {isEditing && (
                  <div className="mt-2">
                    <label 
                      htmlFor="profileImageInput" 
                      className="cursor-pointer bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-full transition inline-flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {uploadingImage ? 'Uploading...' : 'Change Photo'}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      id="profileImageInput"
                      className="hidden"
                    />
                  </div>
                )}
                
                <h2 className="text-xl font-semibold text-white">{formData.name}</h2>
                <p className="text-teal-100 text-sm mt-1">{getRoleBadge()}</p>
              </div>
              
              <div className="px-6 py-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Contact Information</h3>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {formData.email}
                      </div>
                      {formData.phone ? (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {formData.phone}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Not added yet
                        </div>
                      )}
                    </div>
                  </div>

                  {(formData.bloodGroup || formData.gender || formData.dateOfBirth) && (
                    <div className="border-t pt-4">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Medical Information</h3>
                      <div className="mt-3 space-y-2">
                        {formData.bloodGroup && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Blood Group:</span>
                            <span className="font-semibold text-gray-900">{formData.bloodGroup}</span>
                          </div>
                        )}
                        {formData.gender && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Gender:</span>
                            <span className="font-semibold text-gray-900">{formData.gender}</span>
                          </div>
                        )}
                        {formData.dateOfBirth && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Date of Birth:</span>
                            <span className="font-semibold text-gray-900">{formData.dateOfBirth}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Quick Actions</h3>
                    <div className="mt-3 space-y-2">
                      <button
                        onClick={() => navigate('/appointments')}
                        className="w-full text-left px-3 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                      >
                        📅 View Appointments
                      </button>
                      <button
                        onClick={() => navigate('/doctors')}
                        className="w-full text-left px-3 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                      >
                        👨‍⚕️ Find Doctors
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Edit Form */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isEditing ? 'Edit Profile' : 'Personal Information'}
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled={true}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                    >
                      <option value="">Select Blood Group</option>
                      <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                      <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your address"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your city"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter pincode"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Emergency contact number"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                    <input
                      type="text"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Any allergies?"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pre-existing Medical Conditions</label>
                    <textarea
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows="3"
                      placeholder="Any pre-existing medical conditions?"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;