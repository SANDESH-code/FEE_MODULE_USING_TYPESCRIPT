import { BellIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const FacultyHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/faculty/dashboard" className="flex-shrink-0">
              <img
                src="/images/conectsiksha.png"
                alt="CampusCore"
                className="h-8"
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            <button className="relative text-gray-600 hover:text-gray-900">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center space-x-3 border-l pl-6">
              <div className="flex items-center">
                <img
                  src="https://ui-avatars.com/api/?name=Dr.Kab&background=3666F6&color=fff"
                  alt="Faculty Avatar"
                  className="h-8 w-8 rounded-full ring-2 ring-gray-200"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Dr.Kab</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FacultyHeader;
