import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Auth/Login";
import Clinics from "../src/pages/clinics/Clinics";
import PrivateLayout from "../src/layouts/PrivateLayout";
import { AuthProvider } from "../src/context/AuthProvider";
import Logout from "../src/pages/Auth/Logout";
import Users from "../src/pages/users/Users";
import Therapies from "../src/pages/therapies/Therapies";
import ShowUser from "../src/pages/users/ShowUser";
import EditUser from "../src/pages/users/EditUser";
import CreateUser from "../src/pages/users/CreateUser";
import IndexUser from "../src/pages/users/IndexUser";
import IndexClinic from "../src/pages/clinics/IndexClinic";
import EditClinic from "../src/pages/clinics/EditClinic";
import IndexTherapie from "../src/pages/therapies/IndexTherapie";
import Cabinets from "../src/pages/cabinets/Cabinets";
import IndexCabinet from "../src/pages/cabinets/IndexCabinet";
import EditTherapie from "../src/pages/therapies/EditTherapie";
import EditCabinet from "../src/pages/cabinets/EditCabinet";

function Web() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/panel" element={<PrivateLayout />}>
            <Route path="users" element={<Users />}>
              <Route index="user-index" element={<IndexUser />}></Route>
              <Route path="user-show" element={<ShowUser />}></Route>
              <Route path="user-edit/:id" element={<EditUser />}></Route>
              <Route path="user-create" element={<CreateUser />}></Route>
            </Route>
            <Route path="clinics" element={<Clinics />}>
              <Route index="clinic-index" element={<IndexClinic />}></Route>
              <Route path="clinic-edit/:id" element={<EditClinic />}></Route>
            </Route>
            <Route path="therapies" element={<Therapies />}>
              <Route index="therapie-index" element={<IndexTherapie />}></Route>
              <Route path="therapie-edit/:id" element={<EditTherapie />}></Route>
            </Route>
            <Route path="cabinets" element={<Cabinets />}>
              <Route index="cabinet-index" element={<IndexCabinet />}></Route>
              <Route path="cabinet-edit/:id" element={<EditCabinet />}></Route>
            </Route>
          </Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Web;
