import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { useNavigate } from "react-router-dom";
import clinicImage from "../../assets/clinic.jpg";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import BtnPrimary from "../BtnPrimary";

function FormEditClinic({ id, loading, setLoading }) {
  const [error, setError] = useState("");
  const [clinic, setClinic] = useState(id);
  const navigate = useNavigate();

  useEffect(() => {
    getClinic();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getClinic = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "clinic/get-clinic/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setClinic(datos.clinic);
      setLoading(false);
    } 
  };

  const onSubmit = async (data) => {
    setError("");
    let newClinic = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "clinic/update-clinic/" + id,
      "PUT",
      newClinic
    );

    if (datos.state == "success" && !cargando) {
      navigate("/panel/clinics");
    } else {
      setError(datos.message);
    }
  };

  const setErrorDirection = () => {
    setError("");
  };

  return (
    <>
      {!loading && (
        <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="boxImg">
                <img src={clinicImage} />
              </div>
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-lg-10 col-md-12 col-sm-12">
                  <InputLabel>Name</InputLabel>
                  <InputText
                    type="text"
                    name="name"
                    {...register("name")}
                    defaultValue={clinic.name}
                  ></InputText>
                  <InputError message={errors.name?.message}></InputError>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <InputLabel>Direction</InputLabel>
                  <InputText
                    type="text"
                    name="direction"
                    placerholder="C/xxx,XX"
                    defaultValue={clinic.direction}
                    {...register("direction")}
                    onFocus={() => setErrorDirection()}
                  ></InputText>
                  <InputError
                    message={
                      errors.direction ? errors.direction?.message : error
                    }
                  ></InputError>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <InputLabel>City</InputLabel>
                  <InputText
                    type="text"
                    name="city"
                    defaultValue={clinic.city}
                    {...register("city")}
                  ></InputText>
                  <InputError message={errors.city?.message}></InputError>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <InputLabel>Codigo Postal</InputLabel>
                  <InputText
                    type="number"
                    name="c_postal"
                    defaultValue={clinic.c_postal}
                    {...register("c_postal")}
                  ></InputText>
                  <InputError message={errors.c_postal?.message}></InputError>
                </div>

                <div className="separadorBtn btnEditClinic">
                  <BtnPrimary>Save</BtnPrimary>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default FormEditClinic;
