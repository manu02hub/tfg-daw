import React, { useEffect, useLayoutEffect, useState } from "react";
import Aside from "../components/layout/Aside";
import Header from "../components/layout/Header";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateLayout() {

  const { auth } = useAuth();
  console.log(auth);

  return (
    <div>
      <div className="contenedorPrivate">
        <Aside permissionsAuth={auth.permissions} />
        <div className="privateRight">
          <Header />
          <section className="sectionPrivate">
            {auth._id ? <Outlet /> : <Navigate to={"/"} replace={true} />}
            {/* <Outlet/> */}
          </section>
        </div>
      </div>
    </div>
  );
}
