import { Route, Routes } from "react-router-dom";
import './App.css';
import AdminPage from "./components/auth/AdminPage";
import AuthPage from './components/auth/AuthPage';
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import AdminDashboard from './pages/AdminDashboard';
import FacultyDashboard from './pages/FacultyDashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/dashboard/*" element={
          // <ProtectedRoute>
            <AdminDashboard />
          // </ProtectedRoute>
        } />
        <Route path="/faculty/dashboard/*" element={<FacultyDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
