import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import CardBasic from "../CardBasic";
import BtnPrimary from "../BtnPrimary";

function FormEditCabinet({ id, loading, setLoading, auth }) {
  const [cabinet, setCabinet] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCabinet();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getCabinet = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "cabinet/get-cabinet/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setCabinet(datos.cabinet);
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    let save;
    let newCabinet = data;

    setError("");

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "cabinet/update-cabinet/" + id,
      "PUT",
      newCabinet
    );

    if (datos.state == "success" && !cargando) {
      save = await activity(datos.cabinet);
      if (save) {
        navigate("/panel/cabinets");
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
        " ha editado el gabinete " +
        cab.reference,
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

  const setErrorReference = () => {
    setError("");
  };

  return (
    <>
      {!loading && (
        <form className="formEdit" onSubmit={handleSubmit(onSubmit)}>
          <InputLabel>Gabinete</InputLabel>
          <InputText
            type="text"
            name="reference"
            defaultValue={cabinet.reference}
            {...register("reference")}
            onFocus={() => setErrorReference()}
          ></InputText>
          <InputError
            message={errors.reference ? errors.reference?.message : error}
          ></InputError>

          <div className="separadorBtn">
            <BtnPrimary className={"btnsPrimary"}>Guardar</BtnPrimary>
          </div>
        </form>
      )}
    </>
  );
}

export default FormEditCabinet;
