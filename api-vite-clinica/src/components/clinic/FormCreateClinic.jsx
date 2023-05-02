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

function FormCreateClinic({ clinics, setClinics }) {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {

    setError("");
    let newClinic = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "clinic/create-clinic",
      "POST",
      newClinic
    );

    if (datos.state == "success" && !cargando) {
      setClinics([...clinics, datos.clinic]);
    } else {
      setError(datos.message);
    }
  };

  const setErrorDirection = () => {
    setError("");
  };

  return (
    <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
      <div className="separadorForm">
        <InputLabel>Name</InputLabel>
        <InputText type="text" name="name" {...register("name")}></InputText>
        <InputError message={errors.name?.message}></InputError>
      </div>

      <div className="separadorForm">
        <InputLabel>Direction</InputLabel>
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
        <InputLabel>City</InputLabel>
        <InputText type="text" name="city" {...register("city")}></InputText>
        <InputError message={errors.city?.message}></InputError>
      </div>

      <div className="separadorForm">
        <InputLabel>Codigo Postal</InputLabel>
        <InputText
          type="number"
          name="c_postal"
          {...register("c_postal")}
        ></InputText>
        <InputError message={errors.c_postal?.message}></InputError>
      </div>

      <div className="separadorBtn btnCreate">
        <BtnPrimary>Add Clinic</BtnPrimary>
        <BtnReset>Reset</BtnReset>
      </div>
    </form>
  );
}

export default FormCreateClinic;
