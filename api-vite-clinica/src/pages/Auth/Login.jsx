import React, { useState } from "react";
import ToothSensation from "../../assets/logo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import useAuth from "../../hooks/useAuth";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { auth, setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const login = async (data) => {
    let user = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/login",
      "POST",
      user
    );

    if (datos.state == "success" && !cargando) {
      localStorage.setItem("token", datos.token);
      localStorage.setItem("user", JSON.stringify(datos.user));
      setAuth(datos.user);
      navigate("/panel/users");
    } else {
      setError(datos.message);
    }
  };

  const setErrorEmail = () => {
    setError("");
  };

  if (auth._id) {
    return <Navigate to={"/panel/users"} replace={true} />;
  } else {
    return (
      <div className="login">
        <div className="containerLogin">
          <div className="imagenLogo">
            <img src={ToothSensation} className="logo" />
          </div>
          {/* <h3>¡¡Bienvenido de nuevo!!</h3> */}
          <div className="contenedorForm">
            <form onSubmit={handleSubmit(login)} className="formLogin">
              <InputLabel>Email</InputLabel>
              <InputText
                type="email"
                name="email"
              
                {...register("email")}
                onFocus={() => setErrorEmail()}
              ></InputText>
              <InputError
                message={errors.email ? errors.email?.message : error}
              ></InputError>
              
                <InputLabel>New Password</InputLabel>
                <InputText
                  type="password"
                  name="password"
                 
                  {...register("password")}
                ></InputText>
                <InputError message={errors.password?.message}></InputError>
             

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
