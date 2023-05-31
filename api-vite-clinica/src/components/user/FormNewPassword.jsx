import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { useNavigate } from "react-router-dom";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import BtnPrimary from "../BtnPrimary";

function FormNewPassword({ user, auth }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let save;
    let newUser = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/update-user/" + user._id,
      "PUT",
      newUser
    );

    if (datos.state == "success" && !cargando) {
      save = await activity(datos.user);
      if (save) {
        navigate("/panel/users");
      } else {
        setError(datos.message);
      }
    } else {
      setError(datos.message);
    }
  };

  const activity = async (user) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha editado la contraseña del usuario con correo " +
        user.email,
      action: "Editar",
      date: Date.now(),
      id_user: auth._id,
      id_clinic: auth.id_clinic,
    };

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "activity/create-activity",
      "POST",
      activity
    );

    if (datos.state == "success" && !cargando) {
      save = true;
    }

    return save;
  };

  const setErrorPass = () => {
    setError("");
  };

  return (
    <form className="formEdit" onSubmit={handleSubmit(onSubmit)}>
      {auth._id == user._id && (
        <>
          <InputLabel>Contraseña Actual</InputLabel>
          <InputText
            type="password"
            name="current"
            {...register("current")}
            onFocus={() => setErrorPass()}
          ></InputText>
          <InputError
            message={errors.current ? errors.current?.message : error}
          ></InputError>
        </>
      )}

      <div className="separadorForm">
        <InputLabel>New Contraseña</InputLabel>
        <InputText
          type="password"
          name="password"
          {...register("password")}
        ></InputText>
        <InputError message={errors.password?.message}></InputError>
      </div>

      <div className="separadorForm">
        <InputLabel>Confirmar Contraseña</InputLabel>
        <InputText
          type="password"
          name="passwordConfirmation"
          {...register("passwordConfirmation")}
        ></InputText>
        <InputError message={errors.passwordConfirmation?.message}></InputError>
      </div>
      <div className="separadorBtn">
        <BtnPrimary className={"btnsPrimary"}>Save</BtnPrimary>
      </div>
    </form>
  );
}

export default FormNewPassword;
