import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { authState } = useAuth();
  return authState?.authenticated ? (
    <Outlet/>
  ) : (
    <Navigate to="/login"/>
  );
};

export default ProtectedRoutes;