import { AcademicCapIcon, ChartBarIcon, ClockIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import LoginForm from './LoginForm';
import TabButton from './TabButton';

// import RegisterForm from './RegisterForm';


const AuthPage = () => {
const [activeTab, setActiveTab] = useState('student'); 
  // const [isLogin, setIsLogin] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

 const tabs = [
  { id: 'student', label: 'Student' },
  { id: 'faculty', label: 'Faculty' },
];


  const handleTabChange = (tabId) => {
    setIsTransitioning(true);
    setActiveTab(tabId);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Removed auth mode change handler as we're only using login now

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex flex-col bg-[#3666F6] text-white relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 bg-repeat mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col justify-between p-8 xl:p-12">
            {/* Logo and Content */}
            <div className="flex flex-col items-center">
              <div className="w-full flex justify-center mb-8">
                <img 
                 src=".\src\assets\images\logo.png"
                  alt="Campus Core Logo" 
                  className="h-24 w-auto animate-float" 
                />
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center">Welcome to Your Academic Journey</h2>
              <p className="text-blue-100 text-[0.8rem] text-center max-w-md mx-auto leading-relaxed">
                Manage your courses, track your schedule, and stay organized
                throughout your academic term with our comprehensive
                management platform.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl text-center p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="mb-4 flex justify-center">
                  <AcademicCapIcon className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-medium">Course Management</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl text-center p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="mb-4 flex justify-center">
                  <ClockIcon className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-medium">Schedule Tracking</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl text-center p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="mb-4 flex justify-center">
                  <ChartBarIcon className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-medium">Progress Analytics</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <p className="italic mb-3 text-sm leading-relaxed text-blue-50">
                "As a professor, I appreciate how simple it is to communicate schedule
                changes to my students. The platform is intuitive and saves me hours"
              </p>
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-blue-200 mr-2" />
                <p className="font-medium text-sm">Dr. Michael T., Engineering Faculty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 lg:p-12 rounded-3xl shadow-soft flex flex-col relative">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <img 
             src=".\src\assets\images\logo.png" 
              alt="Campus Core Logo" 
              className="h-20 w-auto" 
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex  text-white backdrop-blur-sm rounded-full p-1.5 shadow-sm">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  isActive={activeTab === tab.id}
                  onClick={() => handleTabChange(tab.id)}
                
                >
                  {tab.label}
                </TabButton>
              ))}
            
            </div>

          </div>
{/* <h1 className='font-semibold text-gray-500 text-[1.6rem] text-center'>Register New Admin</h1> */}
          {/* Form Container */}
          <div
            className={`flex-1 transition-opacity duration-300 pt-2 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <LoginForm userType={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;