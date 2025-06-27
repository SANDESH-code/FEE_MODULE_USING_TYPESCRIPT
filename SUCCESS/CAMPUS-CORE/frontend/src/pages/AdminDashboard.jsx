import { Navigate, Route, Routes } from 'react-router-dom';
import CourseSetup from '../components/AdminDashboard/CourseSetup';
import DashboardLayout from '../components/AdminDashboard/DashboardLayout';
import QuickReports from '../components/AdminDashboard/QuickReports';
import SystemNotifications from '../components/AdminDashboard/SystemNotifications';
import UpcomingEvents from '../components/AdminDashboard/UpcomingEvents';
import UserStats from '../components/AdminDashboard/UserStats';
import Footer from './footer';
import AnalyticsDashboard from '../components/AdminDashboard/AnalyticsDashboard';
import FeesPage from '../components/AdminDashboard/FeesPage';
import NotificationsPage from '../components/AdminDashboard/NotificationsPage';
import SchedulePage from '../components/AdminDashboard/SchedulePage';
import MessagesPage from '../components/AdminDashboard/MessagesPage';
import MentorPage from '../components/AdminDashboard/MentorPage';

const HomePage = () => {
  const currentDate = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-semibold mb-2">Welcome, Admin</h1>
        <p className="text-blue-100">{formattedDate}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <UserStats />
          <QuickReports />
        </div>
        <div className="space-y-6">
          <UpcomingEvents />
          <SystemNotifications />
        </div>
      </div>
          <Footer/>

    </div>
  );
};

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="courses" element={<CourseSetup />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="fees" element={<FeesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="mentors" element={<MentorPage/>} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;
