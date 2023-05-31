import React, { useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import BtnPrimary from "../BtnPrimary";
import BtnReset from "../BtnReset";

function FormCreateClinic({ clinics, setClinics, auth }) {
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
    let newClinic = data;

    setError("");

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "clinic/create-clinic",
      "POST",
      newClinic
    );

    if (datos.state == "success" && !cargando) {
      save = await activity(datos.clinic);
      if (save) {
        setClinics([...clinics, datos.clinic]);
      }
    } else {
      setError(datos.message);
    }
  };

  const activity = async (cli) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha creado la clínica " +
        cli.name,
      action: "Crear",
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

  const setErrorDirection = () => {
    setError("");
  };

  return (
    <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
      <div className="separadorForm">
        <InputLabel>Nombre</InputLabel>
        <InputText type="text" name="name" {...register("name")}></InputText>
        <InputError message={errors.name?.message}></InputError>
      </div>

      <div className="separadorForm">
        <InputLabel>Dirección</InputLabel>
        <InputText
          type="text"
          name="direction"
          placerholder="C/xxx,XX"
          {...register("direction")}
          onFocus={() => setErrorDirection()}
        ></InputText>
        <InputError
          message={errors.direction ? errors.direction?.message : error}
        ></InputError>
      </div>

      <div className="separadorForm">
        <InputLabel>Ciudad</InputLabel>
        <InputText type="text" name="city" {...register("city")}></InputText>
        <InputError message={errors.city?.message}></InputError>
      </div>

      <div className="separadorForm">
        <InputLabel>Codigo Postal</InputLabel>
        <InputText
          type="number"
          name="z_code"
          {...register("z_code")}
        ></InputText>
        <InputError message={errors.z_code?.message}></InputError>
      </div>

      <div className="separadorBtn btnCreate">
        <BtnPrimary className={"btnsPrimary"}>Añadir Clínica</BtnPrimary>
        <BtnReset>Resetear</BtnReset>
      </div>
    </form>
  );
}

export default FormCreateClinic;
