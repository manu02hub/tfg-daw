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

function FormCreateTherapie({ therapies, setTherapies }) {
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
        <InputLabel>Name</InputLabel>
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
        <InputLabel>Price</InputLabel>
        <InputText
          type="number"
          name="price"
          {...register("price")}
        ></InputText>
        <InputError message={errors.price?.message}></InputError>
      </div>

      <div className="separadorForm">
        <InputLabel>Discount</InputLabel>
        <InputText
          type="number"
          name="discount"
          {...register("discount")}
        ></InputText>
        <InputError message={errors.discount?.message}></InputError>
      </div>

      <div className="separadorBtn btnCreate">
        <div className="separadorBtn btnCreate">
          <BtnPrimary>Add Therapy</BtnPrimary>
          <BtnReset>Reset</BtnReset>
        </div>
      </div>
    </form>
  );
}

export default FormCreateTherapie;
