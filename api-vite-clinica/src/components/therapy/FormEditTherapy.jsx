import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { useNavigate } from "react-router-dom";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import BtnPrimary from "../BtnPrimary";

function FormEditTherapy({ id, loading, setLoading, auth }) {
  const [error, setError] = useState("");
  const [therapy, setTherapy] = useState(id);
  const navigate = useNavigate();

  useEffect(() => {
    getTherapy();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getTherapy = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy/get-therapy/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setTherapy(datos.therapy);
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setError("");
    let save;
    let newTherapy = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy/update-therapy/" + id,
      "PUT",
      newTherapy
    );

    if (datos.state == "success" && !cargando) {
      save = await activity();

      if (save) {
        navigate("/panel/therapies");
      }
    } else {
      setError(datos.message);
    }
  };

  const activity = async () => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha editado al tratamiento con nombre " +
        therapy.name,
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

  const setErrorName = () => {
    setError("");
  };

  return (
    <>
      {!loading && (
        <form className="formEdit" onSubmit={handleSubmit(onSubmit)}>
          <InputLabel>Nombre</InputLabel>
          <InputText
            type="text"
            name="name"
            defaultValue={therapy.name}
            {...register("name")}
            onFocus={() => setErrorName()}
          ></InputText>
          <InputError
            message={errors.name ? errors.name?.message : error}
          ></InputError>

          <div className="separadorForm">
            <InputLabel>Precio</InputLabel>
            <InputText
              type="number"
              name="price"
              defaultValue={therapy.price}
              {...register("price")}
            ></InputText>
            <InputError message={errors.price?.message}></InputError>
          </div>

          <div className="separadorForm">
            <InputLabel>Descuento</InputLabel>
            <InputText
              type="number"
              name="discount"
              defaultValue={therapy.discount}
              {...register("discount")}
            ></InputText>
            <InputError message={errors.discount?.message}></InputError>
          </div>
          <div className="separadorBtn">
            <BtnPrimary className={"btnsPrimary"}>Guardar</BtnPrimary>
          </div>
        </form>
      )}
    </>
  );
}

export default FormEditTherapy;
