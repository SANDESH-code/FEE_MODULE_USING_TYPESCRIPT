import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeOff, HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ userType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

    if (!formData.email || !formData.password) {
      setMessage('Email and password are required.');
      setLoading(false);
      return;
    }

    try {
      // Simulate login check based on userType
      if (userType === 'faculty') {
        setMessage('Faculty login successful!');
        setTimeout(() => {
          navigate('/faculty/dashboard');
        }, 1000);
      } else {
        setMessage('Student login successful!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setMessage('Login failed. Please check your credentials.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Role Heading */}
      <h2 className="text-lg font-semibold text-gray-700 text-center mb-2">
        Logging in as {userType === 'faculty' ? 'faculty' : 'student'}
      </h2>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
          {userType === 'student' ? 'Student ID or Email' : 'Email Address'}
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
            className="w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:border-[#3666F6] focus:ring-1 focus:ring-[#3666F6]/20"
            placeholder={userType === 'student' ? 'Enter your student ID or email' : 'Enter your email address'}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="password" className="block text-sm text-gray-600">
            Password
          </label>
          <a href="#" className="text-sm text-[#3666F6] hover:text-blue-700">
            Forgot password?
          </a>
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
            onClick={() => setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }))}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {formData.showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="remember"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
          className="w-4 h-4 border border-gray-300 rounded text-[#3666F6] focus:ring-[#3666F6]/20"
        />
        <label htmlFor="remember" className="text-sm text-gray-600">
          Remember me
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#3666F6] text-white py-2 rounded hover:bg-blue-700 transition-colors"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {/* Message */}
      {message && (
        <p className="text-sm text-center text-red-500 mt-2">
          {message}
        </p>
      )}

      {/* Google Login */}
      <div className="mt-6">
        <p className="text-center text-sm text-gray-500 mb-4">or continue with</p>
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

      {/* Footer */}
      <div className="mt-6 text-center text-xs text-gray-400">
        © 2025 Zoro Innovations &nbsp; | &nbsp;
        <a href="#" className="hover:text-[#3666F6]">Privacy Policy</a> &nbsp; | &nbsp;
        <a href="#" className="hover:text-[#3666F6]">Terms of Service</a>
      </div>
    </form>
  );
};

export default LoginForm;
