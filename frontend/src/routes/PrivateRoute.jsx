import React from 'react'
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if(!currentUser) {
    return (
      <Navigate 
        to={'/signin'}
        state={{ from: location, alert: 'Sign in to view your watchlist.' }}
        replace
      />
    );
  }

  return children;
}

export default PrivateRoute