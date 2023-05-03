import React from "react";
import logo from "./../../assets/logoPrivate.png";
import {
  FaUserAlt,
  FaClinicMedical,
  FaTooth,
  FaUserShield,
} from "react-icons/fa";
import { BsFillDoorOpenFill } from "react-icons/bs";
import NavLink from "../NavLink";
import { checkPermission } from "../../helpers/CheckPermissions";

function Aside({ permissionsAuth }) {
  return (
    <aside className="aside">
      <div className="logoAside">
        <img src={logo}></img>
      </div>
      <div className="listadoRoutes">
        {permissionsAuth &&
          (checkPermission(permissionsAuth, "gestion-admin-user") ||
            checkPermission(permissionsAuth, "gestion-clinic-user")) && (
            <div className="cajaListado">
              <NavLink className="cajaSelect" to={"/panel/users"}>
                <FaUserAlt className="iconoSide" />
                <span className="spanSide">Usuarios</span>
              </NavLink>
            </div>
          )}

        {permissionsAuth &&
          checkPermission(permissionsAuth, "gestion-clinica") && (
            <div className="cajaListado">
              <NavLink className="cajaSelect" to={"/panel/clinics"}>
                <FaClinicMedical className="iconoSide" />
                <span className="spanSide">Clinicas</span>
              </NavLink>
            </div>
          )}

        {permissionsAuth &&
          checkPermission(permissionsAuth, "gestion-tratamientos") && (
            <div className="cajaListado">
              <NavLink className="cajaSelect" to={"/panel/therapies"}>
                <FaTooth className="iconoSide" />
                <span className="spanSide">Tratamientos</span>
              </NavLink>
            </div>
          )}

        {permissionsAuth &&
          checkPermission(permissionsAuth, "gestion-gabinetes") && (
            <div className="cajaListado">
              <NavLink className="cajaSelect" to={"/panel/cabinets"}>
                <BsFillDoorOpenFill className="iconoSide" />
                <span className="spanSide">Gabinetes</span>
              </NavLink>
            </div>
          )}
      </div>
    </aside>
  );
}

export default Aside;
