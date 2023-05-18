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

function FormEditTherapy({ id, loading, setLoading }) {
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
    let newTherapy = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy/update-therapy/" + id,
      "PUT",
      newTherapy
    );

    if (datos.state == "success" && !cargando) {
      navigate("/panel/therapies");
    } else {
      setError(datos.message);
    }
  };

  const setErrorName = () => {
    setError("");
  };

  return (
    <>
      {!loading && (
        <form className="formEdit" onSubmit={handleSubmit(onSubmit)}>
          <InputLabel>Name</InputLabel>
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
            <InputLabel>Price</InputLabel>
            <InputText
              type="number"
              name="price"
              defaultValue={therapy.price}
              {...register("price")}
            ></InputText>
            <InputError message={errors.price?.message}></InputError>
          </div>

          <div className="separadorForm">
            <InputLabel>Discount</InputLabel>
            <InputText
              type="number"
              name="discount"
              defaultValue={therapy.discount}
              {...register("discount")}
            ></InputText>
            <InputError message={errors.discount?.message}></InputError>
          </div>
          <div className="separadorBtn">
            <BtnPrimary className={"btnsPrimary"}>Save</BtnPrimary>
          </div>
        </form>
      )}
    </>
  );
}

export default FormEditTherapy;
