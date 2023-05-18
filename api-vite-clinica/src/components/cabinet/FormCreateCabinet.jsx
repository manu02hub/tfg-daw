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

function FormCreateCabinet({clinic, cabinets, setCabinets}) {
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
    let newCabinet = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "cabinet/create-cabinet",
      "POST",
      newCabinet
    );

    if (datos.state == "success" && !cargando) {
      setCabinets([...cabinets, datos.cabinet]);
    } else {
      setError(datos.message);
    }
  };

  const setErrorReference = () => {
    setError("");
  };

  return (
    <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
     
      <div className="separadorForm">
        <InputLabel>Reference</InputLabel>
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
          defaultValue={clinic}
          {...register("id_clinic")}
        ></InputText>
      </div>

      <div className="separadorBtn btnCreate">
        <BtnPrimary className={"btnsPrimary"}>Add Cabinet</BtnPrimary>
        <BtnReset>Reset</BtnReset>
      </div>
    </form>
  );
}

export default FormCreateCabinet;
