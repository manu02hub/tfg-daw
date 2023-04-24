import React from "react";
import logo from "./../../assets/logoPrivate.png";
import { FaUserAlt, FaClinicMedical, FaTooth, FaUserShield } from "react-icons/fa";
import { BsFillDoorOpenFill } from "react-icons/bs";
import NavLink from "../NavLink";

function Aside() {
  return (
    <aside className="aside">
      <div className="logoAside">
        <img src={logo}></img>
      </div>

      <div className="listadoRoutes">
        <div className="cajaListado">
          <NavLink className="cajaSelect" to={"/panel/users"}>
            <FaUserAlt className="iconoSide" />
            <span className="spanSide">Usuarios</span>
          </NavLink>
        </div>

        <div className="cajaListado">
          <NavLink className="cajaSelect" to={"/panel/clinics"}>
            <FaClinicMedical className="iconoSide" />
            <span className="spanSide">Clinicas</span>
          </NavLink>
        </div>

        <div className="cajaListado">
          <NavLink className="cajaSelect" to={"/panel/therapies"}>
            <FaTooth className="iconoSide" />
            <span className="spanSide">Tratamientos</span>
          </NavLink>
        </div>

        <div className="cajaListado">
          <NavLink className="cajaSelect" to={"/panel/gabinetes"}>
            <BsFillDoorOpenFill className="iconoSide" />
            <span className="spanSide">Gabinetes</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
