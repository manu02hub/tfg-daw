import React from "react";
import logo from "./../../assets/logoPrivate.png";
import {
  FaUserAlt,
  FaClinicMedical,
  FaTooth,
  FaUserNurse,
  FaUsers,
  FaCalendarDay,
  FaMoneyBill,
  FaStream
} from "react-icons/fa";
import {RxActivityLog} from "react-icons/rx";
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
        <div className="cajaListado">
          <NavLink className="cajaSelect" to={"/panel/calendar"}>
            <FaCalendarDay className="iconoSide" />
            <span className="spanSide">Citas</span>
          </NavLink>
        </div>

        <div className="cajaListado">
          <NavLink className="cajaSelect" to={"/panel/patients"}>
            <FaUsers className="iconoSide" />
            <span className="spanSide">Pacientes</span>
          </NavLink>
        </div>

        {permissionsAuth &&
          (checkPermission(permissionsAuth, "gestion-admin-user") ||
            checkPermission(permissionsAuth, "gestion-clinic-user")) && (
            <div className="cajaListado">
              <NavLink className="cajaSelect" to={"/panel/users"}>
                <FaUserNurse className="iconoSide" />
                <span className="spanSide">Usuarios</span>
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

        {permissionsAuth &&
          checkPermission(permissionsAuth, "gestion-clinica") && (
            <div className="cajaListado">
              <NavLink className="cajaSelect" to={"/panel/clinics"}>
                <FaClinicMedical className="iconoSide" />
                <span className="spanSide">Clínicas</span>
              </NavLink>
            </div>
          )}

        <div className="cajaListado">
          <NavLink className="cajaSelect" to={"/panel/bills"}>
            <FaMoneyBill className="iconoSide" />
            <span className="spanSide">Facturas</span>
          </NavLink>
        </div>

        <div className="cajaListado">
          <NavLink className="cajaSelect" to={"/panel/activities"}>
            <FaStream className="iconoSide" />
            <span className="spanSide">Actividad</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
