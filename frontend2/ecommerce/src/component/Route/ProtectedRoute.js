import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
