import React, { useState } from "react";
import ToothSensation from "../../assets/logo.png";
import { Navigate } from "react-router-dom";

function Login() {
  const [estado, setStado] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    setStado(true);

    console.log("presiono");

  };

  if (estado) {
    return <Navigate to={"/panel"} replace={true} />;
  }

  return (
    <div className="login">
      <div className="containerLogin">
        <div className="imagenLogo">
          <img src={ToothSensation} className="logo" />
        </div>
        {/* <h3>¡¡Bienvenido de nuevo!!</h3> */}
        <div className="contenedorForm">
          <form onSubmit={(e) => submit(e)}>
            <input type="email" placeholder="Correo Electronico"></input>
            <input type="password" placeholder="Password"></input>
            <div className="contenedorLink">
              {/* <Link>Forgot your password?</Link> */}
            </div>
            <input type="submit" value={"Iniciar Sesión"}></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
