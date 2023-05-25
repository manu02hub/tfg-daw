import React, { useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import InputLabel from "../InputLabel";
import InputText from "../InputText";
import InputError from "../InputError";
import BtnPrimary from "../BtnPrimary";
import BtnReset from "../BtnReset";

function FormCreateTherapy({ therapies, setTherapies }) {
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
    let therapy = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy/create-therapy",
      "POST",
      therapy
    );

    if (datos.state == "success" && !cargando) {
      
      setTherapies([...therapies, datos.therapy]);
    } else {
      setError(datos.message);
    }
  };

  const setErrorName = () => {
    setError("");
  };

  return (
    <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
      <div className="separadorForm">
        <InputLabel>Nombre</InputLabel>
        <InputText
          type="text"
          name="name"
          {...register("name")}
          onFocus={() => setErrorName()}
        ></InputText>
        <InputError
          message={errors.name ? errors.name?.message : error}
        ></InputError>
      </div>

      <div className="separadorForm">
        <InputLabel>Precio</InputLabel>
        <InputText
          type="number"
          name="price"
          {...register("price")}
        ></InputText>
        <InputError message={errors.price?.message}></InputError>
      </div>

      <div className="separadorForm">
        <InputLabel>Descuento</InputLabel>
        <InputText
          type="number"
          name="discount"
          {...register("discount")}
        ></InputText>
        <InputError message={errors.discount?.message}></InputError>
      </div>

      <div className="separadorBtn btnCreate">
        <div className="separadorBtn btnCreate">
          <BtnPrimary className={"btnsPrimary"}>Añadir Tratamiento</BtnPrimary>
          <BtnReset>Resetear</BtnReset>
        </div>
      </div>
    </form>
  );
}

export default FormCreateTherapy;
