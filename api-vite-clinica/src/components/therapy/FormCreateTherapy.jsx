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

function FormCreateTherapy({ therapies, setTherapies, auth }) {
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
    let therapy = data;

    setError("");

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy/create-therapy",
      "POST",
      therapy
    );

    if (datos.state == "success" && !cargando) {

      save = await activity(datos.therapy);

      if(save){
        setTherapies([...therapies, datos.therapy]);
      }
      
    } else {
      setError(datos.message);
    }
  };

  const setErrorName = () => {
    setError("");
  };

  const activity = async (trat) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha creado el tratamiento " +
        trat.name,
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
