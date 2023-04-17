import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Auth/Login";
import Clinicas from "../src/pages/clinicas/Clinicas";
import PrivateLayout from "../src/layouts/PrivateLayout";
import {AuthProvider} from "../src/context/AuthProvider";

function Web() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path="/panel" element={<PrivateLayout />}>
            <Route path="gestion-clinicas" element={<Clinicas />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Web;
