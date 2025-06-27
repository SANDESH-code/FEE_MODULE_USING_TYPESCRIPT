import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeOff, HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdBusiness } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const AdminForm = ({ userType }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    password: '',
    rememberMe: false,
    showPassword: false,
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (userType === 'register') {
      if (!formData.fullName || !formData.email || !formData.organization || !formData.password) {
        setMessage('All fields are required.');
        setLoading(false);
        return;
      }

      console.log('Registering:', formData.fullName, formData.email, formData.organization);
      setMessage('Registration successful!');

      setTimeout(() => {
        navigate('/admin/login');
      }, 1000);
    } else {
      if (!formData.email || !formData.password) {
        setMessage('Email and Password are required.');
        setLoading(false);
        return;
      }

      console.log('Logging in:', formData.email);
      setMessage('Login successful!');

      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-center text-gray-600 mb-4">
        {userType === 'register' ? 'Register New Admin' : 'Admin Login'}
      </h2>

      {/* Full Name (Only for Register) */}
      {userType === 'register' && (
        <div>
          <label htmlFor="fullName" className="block text-sm text-gray-500 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:border-[#3666F6] focus:ring-1 focus:ring-[#3666F6]/20"
            placeholder="Enter your full name"
          />
        </div>
      )}

      {/* Organization Name (Only for Register) */}
      {userType === 'register' && (
        <div>
          <label htmlFor="organization" className="block text-sm text-gray-500 mb-1">
            Organization Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdBusiness className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="organization"
              id="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:border-[#3666F6] focus:ring-1 focus:ring-[#3666F6]/20"
              placeholder="Enter your organization"
            />
          </div>
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm text-gray-500 mb-1">
          {userType === 'register' ? 'Email Address' : 'Admin Email'}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiOutlineMail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2.5 border rounded-xl text-gray-600 focus:outline-none focus:border-[#3666F6] focus:ring-1 focus:ring-[#3666F6]/20"
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="password" className="block text-sm text-gray-500">
            Password
          </label>
          {userType === 'login' && (
            <a href="#" className="text-sm text-[#3666F6] hover:text-blue-700">
              Forgot password?
            </a>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={formData.showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-2.5 border rounded-xl focus:outline-none focus:border-[#3666F6] focus:ring-1 focus:ring-[#3666F6]/20"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }))
            }
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {formData.showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Remember Me (Only for login) */}
      {userType === 'login' && (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 border border-gray-300 rounded text-[#3666F6] focus:ring-[#3666F6]/20"
          />
          <label htmlFor="remember" className="text-sm text-gray-500">
            Remember me
          </label>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#3666F6] text-white py-2 rounded hover:bg-blue-700 transition-colors"
      >
        {loading
          ? userType === 'register'
            ? 'Registering...'
            : 'Logging in...'
          : userType === 'register'
          ? 'Register'
          : 'Login'}
      </button>

      {/* Error/Success Message */}
      {message && (
        <p className="text-sm text-center text-red-500 mt-2">{message}</p>
      )}

      {/* Google Auth Placeholder */}
      <div className="mt-6">
        <p className="text-center text-sm text-gray-400 mb-4">or continue with</p>
        <div className="flex justify-center">
          <button
            type="button"
            className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-full shadow-sm bg-white text-gray-700 hover:bg-gray-100 transition"
          >
            <FcGoogle className="w-5 h-5" />
            <span>Log In with Google</span>
          </button>
        </div>
      </div>

      {/* Footer (Privacy and Terms) */}
      <div className="mt-6 text-center text-xs text-gray-400">
        © 2025 Zoro Innovations &nbsp; | &nbsp;
        <a href="#" className="hover:text-[#3666F6]">Privacy Policy</a> &nbsp; | &nbsp;
        <a href="#" className="hover:text-[#3666F6]">Terms of Service</a>
      </div>
    </form>
  );
};

export default AdminForm;
