import React, { useState } from 'react';
import {
  BellIcon,
  BookOpenIcon,
  CalendarIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  HomeIcon,
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { CreditCardIcon } from '@heroicons/react/24/outline';


const navigationItems = [
  { name: 'Home', icon: HomeIcon, href: '/admin/dashboard/home' },
  { name: 'Schedule', icon: CalendarIcon, href: '/admin/dashboard/schedule' },
  { name: 'Course Setup', icon: BookOpenIcon, href: '/admin/dashboard/courses' },
  { name: 'Analytics', icon: ChartBarIcon, href: '/admin/dashboard/analytics' },
  { name: 'Fees', icon: CreditCardIcon, href: '/admin/dashboard/fees' },
  { name: 'Notification', icon: BellIcon, href: '/admin/dashboard/notifications' },
  { name: 'Message', icon: ChatBubbleLeftIcon, href: '/admin/dashboard/messages' },
  { name: 'Mentor', icon: UserGroupIcon, href: '/admin/dashboard/mentors' },
];

const DashboardLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/dashboard">
              <img src="frontend/src/assets/images/logo.png" alt="Campus Core" className="h-10 w-auto" />
            </Link>

            {/* Mobile Toggle */}
            <div className="lg:hidden">
              <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
                {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>

            {/* Icons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 p-2">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              <button className="relative text-gray-500 hover:text-gray-700 p-2">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              </button>
              <div className="flex items-center gap-2 border-l pl-4">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-gray-200"
                  src="https://ui-avatars.com/api/?name=Dev&background=3666F6&color=fff"
                  alt="User"
                />
                <span className="text-sm font-medium text-gray-700">DEVANSH</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Blue Banner */}
      <div className="relative bg-[#3666F6] overflow-hidden shadow-sm">
        <div className="absolute inset-0">
          <img
            src="/images/pattern.png"
            alt="Background Pattern"
            className="w-full h-full object-cover opacity-10 mix-blend-overlay"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-white">
              <h1 className="text-2xl font-semibold">Welcome back, Dev!</h1>
              <p className="mt-1 text-sm opacity-90">Mon June 16, 2025 | Spring Semester 2025</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <span className="block text-xs text-white/80">Next Class</span>
              <span className="block text-sm font-medium text-white">College Club Mathematics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Large screens navbar */}
          <div className="hidden lg:flex h-14 items-center justify-start space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#3666F6] hover:bg-gray-100 rounded-md transition"
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="lg:hidden py-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#3666F6] hover:bg-gray-100 rounded-md transition"
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
