import React from "react";
import logo from "./../../assets/logoPrivate.png";
import { FaUserAlt } from "react-icons/fa";

function Aside() {

  return (
    <aside className="aside">
      <div className="logoAside">
        <img src={logo}></img>
      </div>

      <div className="listadoRoutes">
        <div className="cajaListado">
          <div className="cajaSelect isActive">
            <FaUserAlt className="iconoSide" />
            <span className="spanSide">Usuarios</span>
          </div>
        </div>

        <div className="cajaListado">
          <div className="cajaSelect">
            <FaUserAlt className="iconoSide" />
            <span className="spanSide">Usuarios</span>
          </div>
        </div>

        <div className="cajaListado">
          <div className="cajaSelect">
            <FaUserAlt className="iconoSide" />
            <span className="spanSide">Usuarios</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
