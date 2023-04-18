import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Auth/Login";
import Clinicas from "../src/pages/clinicas/Clinicas";
import PrivateLayout from "../src/layouts/PrivateLayout";
import {AuthProvider} from "../src/context/AuthProvider";
import Logout from "../src/pages/Auth/Logout";
import Usuarios from "../src/pages/usuarios/Usuarios";
import Tratamientos from "../src/pages/tratamientos/Tratamientos";

function Web() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/panel" element={<PrivateLayout />}>
            <Route path="gestion-clinicas" element={<Clinicas />}></Route>
            <Route path="gestion-usuarios" element={<Usuarios />}></Route>
            <Route path="gestion-tratamientos" element={<Tratamientos />}></Route>
          </Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Web;
