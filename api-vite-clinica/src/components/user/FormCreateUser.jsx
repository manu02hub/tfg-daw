import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import SelectRol from "../../components/user/SelectRol";
import SelectClinic from "../../components/user/SelectClinic";
import BtnPrimary from "../BtnPrimary";

function FormCreateUser({ auth }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // const { form, changed } = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setError("");
    let newUser = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/create-user",
      "POST",
      newUser
    );

    if (datos.state == "success" && !cargando) {
      navigate("/panel/users");
    } else {
      setError(datos.message);
    }
  };

  const setErrorEmail = () =>{
    setError("");
  }

  return (
    <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <InputLabel>Name</InputLabel>
          <InputText type="text" name="name" {...register("name")}></InputText>
          <InputError message={errors.name?.message}></InputError>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <InputLabel>Email</InputLabel>
          <InputText
            type="email"
            name="email"
            {...register("email")}
            onFocus={() => setErrorEmail()}
          ></InputText>

          
          <InputError message={errors.email ? errors.email?.message : error }></InputError>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="separadorForm">
            <InputLabel>Password</InputLabel>
            <InputText
              type="password"
              name="password"
              {...register("password")}
            ></InputText>
            <InputError message={errors.password?.message}></InputError>
          </div>

          <div className="separadorForm">
            <InputLabel>Confirm Password</InputLabel>
            <InputText
              type="password"
              name="passwordConfirmation"
              {...register("passwordConfirmation")}
            ></InputText>
            <InputError
              message={errors.passwordConfirmation?.message}
            ></InputError>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="separadorForm">
            <InputLabel>Rol</InputLabel>
            <SelectRol name="id_rol" auth={auth} {...register("id_rol")} />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="separadorForm">
            <InputLabel>Clinica</InputLabel>
            <SelectClinic
              name="id_clinic"
              auth={auth}
              {...register("id_clinic")}
            />
          </div>
        </div>
      </div>

      <div className="separadorBtn">
        <BtnPrimary className={"btnsPrimary"}>Crear</BtnPrimary>
      </div>
    </form>
  );
}

export default FormCreateUser;
