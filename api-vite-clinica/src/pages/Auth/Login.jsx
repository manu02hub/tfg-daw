import React, { useState } from "react";
import ToothSensation from "../../assets/logo.png";
import { Navigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

function Login() {
  const [estado, setStado] = useState(false);
  const { form, changed } = useForm({});
  const { auth, setAuth } = useAuth();

  const login = async (e) => {
    e.preventDefault();

    //Datos del formulario
    let userLogin = form;

    console.log(userLogin);

    //Persistir datos en el navegador
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userLogin),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await request.json();

    console.log(data);

    if (data.state == "success") {
      setStado(true);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    setAuth(data.user)
  };

  if (auth._id) {
    return <Navigate to={"/panel/gestion-clinicas"} replace={true} />;
  } else {

    if (estado) {
     
      return <Navigate to={"/panel/gestion-clinicas"} replace={true} />;
    }

    return (
      <div className="login">
        <div className="containerLogin">
          <div className="imagenLogo">
            <img src={ToothSensation} className="logo" />
          </div>
          {/* <h3>¡¡Bienvenido de nuevo!!</h3> */}
          <div className="contenedorForm">
            <form onSubmit={(e) => login(e)}>
              <input
                type="email"
                placeholder="Correo Electronico"
                onChange={changed}
                name="email"
              ></input>
              <input
                type="password"
                placeholder="Password"
                onChange={changed}
                name="password"
              ></input>
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
}

export default Login;
