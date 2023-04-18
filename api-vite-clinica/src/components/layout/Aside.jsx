import React from "react";
import logo from "./../../assets/logoPrivate.png";
import { FaUserAlt, FaClinicMedical, FaTooth } from "react-icons/fa";
import NavLink from "../NavLink";

function Aside() {
  return (
    <aside className="aside">
      <div className="logoAside">
        <img src={logo}></img>
      </div>

      <div className="listadoRoutes">
        <div className="cajaListado">
          <NavLink className="cajaSelect" to={"/panel/gestion-usuarios"}>
            <FaUserAlt className="iconoSide" />
            <span className="spanSide">Usuarios</span>
          </NavLink>
        </div>

        <div className="cajaListado">
          <NavLink className="cajaSelect" to={"/panel/gestion-clinicas"}>
            <FaClinicMedical className="iconoSide" />
            <span className="spanSide">Clinicas</span>
          </NavLink>
        </div>

        <div className="cajaListado">
          <NavLink className="cajaSelect" to={"/panel/gestion-tratamientos"}>
            <FaTooth className="iconoSide" />
            <span className="spanSide">Tratamientos</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
