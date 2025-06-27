import FacultyHeader from './FacultyHeader';
import FacultyNavigation from './FacultyNavigation';
import FacultyWelcomeBanner from './FacultyWelcomeBanner';

const FacultyDashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <FacultyHeader />
      <FacultyWelcomeBanner />
      <FacultyNavigation />
      
      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default FacultyDashboardLayout;
