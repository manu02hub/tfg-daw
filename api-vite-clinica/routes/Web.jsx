import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Auth/Login";
import Clinicas from "../src/pages/clinicas/Clinicas";
import PrivateLayout from "../src/layouts/PrivateLayout";
import { AuthProvider } from "../src/context/AuthProvider";
import Logout from "../src/pages/Auth/Logout";
import Usuarios from "../src/pages/usuarios/Usuarios";
import Tratamientos from "../src/pages/tratamientos/Tratamientos";
import ShowUser from "../src/pages/usuarios/ShowUser";
import EditUser from "../src/pages/usuarios/EditUser";
import CreateUser from "../src/pages/usuarios/CreateUser";
import IndexUser from "../src/pages/usuarios/IndexUser";
import IndexClinic from "../src/pages/clinicas/IndexClinic";
import EditClinic from "../src/pages/clinicas/EditClinic";
import IndexTherapie from "../src/pages/tratamientos/IndexTherapie";
import Gabinetes from "../src/pages/gabinetes/Gabinetes";
import IndexGabinete from "../src/pages/gabinetes/IndexGabinete";
import EditTherapie from "../src/pages/tratamientos/EditTherapie";

function Web() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/panel" element={<PrivateLayout />}>
            <Route path="users" element={<Usuarios />}>
              <Route index="user-index" element={<IndexUser />}></Route>
              <Route path="user-show" element={<ShowUser />}></Route>
              <Route path="user-edit/:id" element={<EditUser />}></Route>
              <Route path="user-create" element={<CreateUser />}></Route>
            </Route>
            <Route path="clinics" element={<Clinicas />}>
              <Route index="clinic-index" element={<IndexClinic />}></Route>
              <Route path="clinic-edit/:id" element={<EditClinic />}></Route>
            </Route>
            <Route path="therapies" element={<Tratamientos />}>
              <Route index="therapie-index" element={<IndexTherapie />}></Route>
              <Route path="therapie-edit/:id" element={<EditTherapie />}></Route>
            </Route>
            <Route path="gabinetes" element={<Gabinetes />}>
              <Route index="gabinete-index" element={<IndexGabinete />}></Route>
            </Route>
          </Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Web;
