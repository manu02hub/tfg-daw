import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Auth/Login";
import Clinicas from "../src/pages/clinicas/Clinicas";
import Dashboard from "../src/pages/Dashboard";

function Web() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}></Route>
        <Route path="/panel" element={<Dashboard/>}>

        </Route>
        <Route path="/gestion-clinicas" element={<Clinicas/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Web;
