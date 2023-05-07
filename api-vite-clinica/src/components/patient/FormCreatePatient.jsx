import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import CardBasic from "../CardBasic";
import InputLabel from "../InputLabel";
import InputText from "../InputText";
import InputError from "../InputError";
import BtnPrimary from "../BtnPrimary";

function FormCreatePatient() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const { form, changed } = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setError("");
    let newPatient = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/create-patient",
      "POST",
      newPatient
    );

    if (datos.state == "success" && !cargando) {
      navigate("/panel/patients");
    } else {
      setError(datos.message);
    }
  };

  const setErrorPhone = () => {
    setError("");
  };

  return (
    <CardBasic>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <section className="section-card">
            <h2>Create a new patient </h2>
            <p>Complete profile information.</p>
            <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Name</InputLabel>
                  <InputText
                    type="text"
                    name="name"
                    {...register("name")}
                  ></InputText>
                  <InputError message={errors.name?.message}></InputError>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Surnames</InputLabel>
                  <InputText
                    type="text"
                    name="surnames"
                    {...register("surnames")}
                  ></InputText>

                  <InputError message={errors.surnames?.message}></InputError>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="separadorForm">
                    <InputLabel>Nif</InputLabel>
                    <InputText
                      type="text"
                      name="nif"
                      {...register("nif")}
                    ></InputText>
                    <InputError message={errors.nif?.message}></InputError>
                  </div>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-12">
                  <div className="separadorForm">
                    <InputLabel>Date of Birthday</InputLabel>
                    <InputText
                      type="date"
                      name="date_birth"
                      {...register("date_birth")}
                    ></InputText>
                    <InputError
                      message={errors.date_birth?.message}
                    ></InputError>
                  </div>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-6">
                  <div className="separadorForm">
                    <InputLabel>Gender</InputLabel>
                    <select  {...register("gender")}>
                      <option value={"M"}>M</option>
                      <option value={"W"}>W</option>
                    
                    </select>
                  </div>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-6">
                  <div className="separadorForm">
                    <InputLabel>Odontogram</InputLabel>
                    <select  {...register("odontogram")}>
                      <option value={0}>Adulto</option>
                      <option value={1}>Infantil</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="subtitleForm">
                <p>Datos de Contacto</p>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Email</InputLabel>
                  <InputText
                    type="email"
                    name="email"
                    {...register("email")}
                    onFocus={() => setErrorEmail()}
                  ></InputText>

                  <InputError
                    message={errors.email ? errors.email?.message : error}
                  ></InputError>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Mobile phone</InputLabel>
                  <InputText
                    type="phone"
                    name="mobile_phone"
                    {...register("mobile_phone")}
                    onFocus={() => setErrorPhone()}
                  ></InputText>

                  <InputError
                    message={
                      errors.mobile_phone ? errors.mobile_phone?.message : error
                    }
                  ></InputError>
                </div>
              </div>

              <div className="subtitleForm">
                <p>Direccion</p>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Street</InputLabel>
                  <InputText
                    type="text"
                    name="street"
                    {...register("street")}
                  
                  ></InputText>

                  <InputError
                    message={errors.street ? errors.street?.message : error}
                  ></InputError>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12">
                  <InputLabel>Number</InputLabel>
                  <InputText
                    type="number"
                    name="number"
                    {...register("number")}
                  ></InputText>

                  <InputError
                    message={errors.number ? errors.number?.message : error}
                  ></InputError>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-12">
                  <InputLabel>Flat</InputLabel>
                  <InputText
                    type="text"
                    name="flat"
                    {...register("flat")}
                  ></InputText>

                  <InputError
                    message={errors.flat ? errors.flat?.message : error}
                  ></InputError>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  <InputLabel>Zip Code</InputLabel>
                  <InputText
                    type="number"
                    name="z_postal"
                    {...register("z_postal")}
                  ></InputText>

                  <InputError message={errors.z_postal?.message}></InputError>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  <InputLabel>City</InputLabel>
                  <InputText
                    type="text"
                    name="city"
                    {...register("city")}
                  ></InputText>

                  <InputError message={errors.city?.message}></InputError>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  <InputLabel>Province</InputLabel>
                  <InputText
                    type="text"
                    name="province"
                    {...register("province")}
                  ></InputText>

                  <InputError message={errors.province?.message}></InputError>
                </div>
              </div>

              <div className="separadorBtn">
                <BtnPrimary>Crear</BtnPrimary>
              </div>
            </form>
          </section>
        </div>
      </div>
    </CardBasic>
  );
}

export default FormCreatePatient;