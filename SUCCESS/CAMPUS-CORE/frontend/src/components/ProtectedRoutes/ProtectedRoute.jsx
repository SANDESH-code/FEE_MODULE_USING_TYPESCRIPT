import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // ya context/state

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;