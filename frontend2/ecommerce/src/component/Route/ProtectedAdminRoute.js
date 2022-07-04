import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (user.role === "admin") {
    return children ? children : <Outlet />;
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
