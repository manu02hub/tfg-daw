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

function FormCreateCabinet({auth, cabinets, setCabinets}) {
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
    let newCabinet = data;

    setError("");

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "cabinet/create-cabinet",
      "POST",
      newCabinet
    );

    if (datos.state == "success" && !cargando) {
      save = await activity(datos.cabinet);
      if(save){
        setCabinets([...cabinets, datos.cabinet]);
      }
      
    } else {
      setError(datos.message);
    }
  };

  const activity = async (cab) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha creado el gabinete " +
        cab.reference,
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

  const setErrorReference = () => {
    setError("");
  };

  return (
    <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
     
      <div className="separadorForm">
        <InputLabel>Referencia</InputLabel>
        <InputText
          type="text"
          name="reference"
          {...register("reference")}
          onFocus={() => setErrorReference()}
        ></InputText>
        <InputError
          message={errors.reference ? errors.reference?.message : error}
        ></InputError>
        <InputText
          type="hidden"
          name="id_clinic"
          defaultValue={auth.id_clinic}
          {...register("id_clinic")}
        ></InputText>
      </div>

      <div className="separadorBtn btnCreate">
        <BtnPrimary className={"btnsPrimary"}>Añadir Gabinete</BtnPrimary>
        <BtnReset>Resetear</BtnReset>
      </div>
    </form>
  );
}

export default FormCreateCabinet;
