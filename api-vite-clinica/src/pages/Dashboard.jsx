import React from "react";
import logo from "./../assets/logoPrivate.png";
import PrivateLayout from "../layouts/PrivateLayout";
import { FaUserAlt } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div>
      <div className="contenedorPrivate">
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
        <div className="privateRight">
          <header className="header">
            <div className="banner">
              <h2>Buenos días !!</h2>
            </div>
            <div className="nombreUsu">
              <h5>Manuel Alonso</h5>
            </div>
          </header>
          <section className="sectionPrivate">
            
          </section>
        </div>
      </div>
    </div>
  );
}
