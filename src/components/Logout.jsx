import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
export function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);

  return <Navigate to="/start-jobs/" />;
}
