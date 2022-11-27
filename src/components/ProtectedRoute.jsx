import React from "react";
import { useUserAuth } from "../firebaseAuth/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  
  if (user?.emailVerified) {
    return children;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
