import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Therapies() {
  const { auth } = useAuth();

  return (
     <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="section-information">
          {auth._id ? <Outlet /> : <Navigate to={"/"} replace={true} />}
        </div>
      </div>
    </div>
  );
}

export default Therapies;
