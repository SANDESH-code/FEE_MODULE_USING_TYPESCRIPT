import FacultyAnnouncements from '../components/faculty/FacultyAnnouncements';
import FacultyAttendance from '../components/faculty/FacultyAttendance';
import FacultyDashboardLayout from '../components/faculty/FacultyDashboardLayout';
import FacultySchedule from '../components/faculty/FacultySchedule';
import FacultyUpcomingEvents from '../components/faculty/FacultyUpcomingEvents';

const FacultyDashboard = () => {
  return (
    <FacultyDashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2">
          <FacultyAttendance />
          <div className="mt-6">
            <FacultySchedule />
          </div>
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-6">
          <FacultyUpcomingEvents />
          <FacultyAnnouncements />
        </div>
      </div>
    </FacultyDashboardLayout>
  );
};

export default FacultyDashboard;
