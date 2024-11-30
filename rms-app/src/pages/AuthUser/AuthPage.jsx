import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      <h1>Report Management System</h1>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Sign-Up</button> 
      <Outlet /> 
    </div>
  );
};

export default AuthPage;
