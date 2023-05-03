import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Users() {
  const { auth } = useAuth();
  return (
    
        <div className="section-information">
          {auth._id ? <Outlet /> : <Navigate to={"/"} replace={true} />}
        </div>
  
  );
}

export default Users;
