import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import CardBasic from "../CardBasic";
import InputLabel from "../InputLabel";
import InputText from "../InputText";
import InputError from "../InputError";
import BtnPrimary from "../BtnPrimary";
import { FiSearch } from "react-icons/fi";
import BtnReset from "../BtnReset";

function FormCreateTutor({ setIsSavedTutor, setIdTutor }) {
  const [errorTutor, setErrorTutor] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [tutor, setTutor] = useState({});
  // const [direccion, setDireccion] = useState({});
  const [contact, setContact] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const checkTutor = async (e) => {
    e.preventDefault();

    let tutorValue = e.target.tutor.value;

    if (tutorValue == "") {
      setErrorTutor("El campo no puede estar vacío");
    } else {
      const { datos, cargando } = await PeticionAJAX(
        Global.url + "contact/searchContact/" + tutorValue,
        "GET"
      );

      if (datos.state == "success" && !cargando) {
        getTutor(datos.contact);
      } else {
        console.log(tutorValue);
        setErrorTutor(datos.message);
        setTutor({});
        setContact({});
        setIdTutor({});
      }
    }
  };

  const getTutor = async (contact) => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "tutor/get-tutorContact/" + contact._id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setTutor(datos.tutor);
      setContact(contact);
      setIdTutor(datos.tutor._id);
    } else {
      setErrorTutor(datos.message);
      setTutor({});
      setContact({});
      setIdTutor(0);
    }
  };

  const reset = () => {
    setErrorTutor("");
    setTutor({});
    setContact({});
    setIdTutor(0);
  };

  const onSubmit = async (data) => {
    let newTutor;
    let direction;
    let contact;
    let id_direction;
    let id_contact;

    direction = {
      street: data.street,
      number: data.number,
      flat: data.flat,
      z_code: data.z_code,
      city: data.city,
      province: data.province,
    };

    contact = {
      email: data.email,
      mobile_phone: data.mobile_phone,
    };

    id_direction = await createDirection(direction);
    id_contact = await createContact(contact);

    newTutor = {
      name: data.name,
      surnames: data.surnames,
      id_direction: id_direction,
      id_contact: id_contact,
    };

    await createTutor(newTutor);
  };

  const save = async (e) => {
    e.preventDefault();

    if (tutor._id) {
      setIsSavedTutor(true);
      setIdTutor(tutor._id);
    }
  };

  const createTutor = async (tut) => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "tutor/create-tutor",
      "POST",
      tut
    );

    if (datos.state == "success" && !cargando) {
      setIsSavedTutor(true);
      setIdTutor(datos.tutor._id);
    } else {
      // setError(datos.message);
    }
  };

  const createContact = async (con) => {
    let contact;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "contact/create-contact",
      "POST",
      con
    );

    if (datos.state == "success" && !cargando) {
      contact = datos.contact._id;
    } else {
      // setError(datos.message);
    }

    return contact;
  };

  const createDirection = async (dir) => {
    let direction;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "direction/create-direction",
      "POST",
      dir
    );

    if (datos.state == "success" && !cargando) {
      direction = datos.direction._id;
    } else {
      // setError(datos.message);
    }
    return direction;
  };

  const clearErrorTutor = () => {
    setErrorTutor("");
  };

  return (
    <CardBasic>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <section className="section-card">
            <h2>Crea un nuevo Tutor </h2>
            <p>Rellena la información del Tutor</p>

            <div className="col-lg-12 col-md-12 col-sm-12">
              <form
                className="formCreate"
                onSubmit={(e) => {
                  checkTutor(e);
                }}
              >
                <InputLabel>Numero de Telefono o Correo del Tutor</InputLabel>

                <div className="boxSearchPatient">
                  <InputText
                    type="text"
                    name="tutor"
                    // onBlur={(e) => {
                    // checkPatient(e);
                    // }}
                    onFocus={() => clearErrorTutor()}
                  ></InputText>
                  <BtnPrimary>
                    <FiSearch size={17} />
                  </BtnPrimary>
                  <BtnReset onClick={() => reset()}>Resetear</BtnReset>
                </div>
              </form>

              <InputError
                message={errorTutor !== "" ? errorTutor : ""}
              ></InputError>
            </div>

            <form
              className="formCreate"
              onSubmit={tutor._id ? (e) => save(e) : handleSubmit(onSubmit)}
            >
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="separadorForm">
                    <InputLabel>Nombre</InputLabel>

                    {tutor._id ? (
                      <InputText
                        type="text"
                        name="name"
                        {...register("name")}
                        defaultValue={tutor.name}
                        readOnly
                      ></InputText>
                    ) : (
                      <InputText
                        type="text"
                        name="name"
                        defaultValue={""}
                        {...register("name")}
                      ></InputText>
                    )}

                    <InputError
                      message={tutor._id ? "" : errors.name?.message}
                    ></InputError>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="separadorForm">
                    <InputLabel>Apellidos</InputLabel>

                    {tutor._id ? (
                      <InputText
                        type="text"
                        name="surnames"
                        {...register("surnames")}
                        defaultValue={tutor.surnames}
                        readOnly
                      ></InputText>
                    ) : (
                      <InputText
                        type="text"
                        name="surnames"
                        defaultValue={""}
                        {...register("surnames")}
                      ></InputText>
                    )}

                    <InputError
                      message={tutor._id ? "" : errors.surnames?.message}
                    ></InputError>
                  </div>
                </div>
              </div>

              <div className="subtitleForm">
                <p>Datos de Contacto</p>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Email</InputLabel>

                  {tutor._id ? (
                    <InputText
                      type="email"
                      name="email"
                      {...register("email")}
                      defaultValue={contact._id ? contact.email : ""}
                      readOnly
                      // onFocus={() => setErrorEmail()}
                    ></InputText>
                  ) : (
                    <InputText
                      type="email"
                      name="email"
                      {...register("email")}
                      defaultValue={""}
                      // onFocus={() => setErrorEmail()}
                    ></InputText>
                  )}

                  <InputError
                  // message={errors.email ? errors.email?.message : error}
                  ></InputError>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Número de Teléfono</InputLabel>
                  {tutor._id ? (
                    <InputText
                      type="phone"
                      name="mobile_phone"
                      {...register("mobile_phone")}
                      defaultValue={contact._id ? contact.mobile_phone : ""}
                      readOnly
                      // onFocus={() => setErrorEmail()}
                    ></InputText>
                  ) : (
                    <InputText
                      type="phone"
                      name="mobile_phone"
                      {...register("mobile_phone")}
                      defaultValue={""}
                      // onFocus={() => setErrorEmail()}
                    ></InputText>
                  )}

                  <InputError
                  // message={
                  //   errors.mobile_phone ? errors.mobile_phone?.message : error
                  // }
                  ></InputError>
                </div>
              </div>

              <div className="subtitleForm">
                <p>Dirección</p>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Calle</InputLabel>
                  {tutor._id ? (
                    <InputText
                      type="text"
                      name="street"
                      {...register("street")}
                      defaultValue={tutor.id_direction.street}
                      readOnly
                    ></InputText>
                  ) : (
                    <InputText
                      type="text"
                      name="street"
                      {...register("street")}
                      defaultValue={""}
                    ></InputText>
                  )}

                  <InputError
                    message={tutor._id ? "" : errors.street?.message}
                  ></InputError>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12">
                  <InputLabel>Número</InputLabel>
                  {tutor._id ? (
                    <InputText
                      type="number"
                      name="number"
                      {...register("number")}
                      defaultValue={tutor.id_direction.number}
                      readOnly
                    ></InputText>
                  ) : (
                    <InputText
                      type="number"
                      name="number"
                      {...register("number")}
                      defaultValue={""}
                    ></InputText>
                  )}

                  <InputError
                    message={tutor._id ? "" : errors.number?.message}
                  ></InputError>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-12">
                  <InputLabel>Piso</InputLabel>
                  {tutor._id ? (
                    <InputText
                      type="text"
                      name="flat"
                      {...register("flat")}
                      defaultValue={tutor.id_direction.flat}
                      readOnly
                    ></InputText>
                  ) : (
                    <InputText
                      type="text"
                      name="flat"
                      {...register("flat")}
                      defaultValue={""}
                    ></InputText>
                  )}

                  <InputError
                    message={tutor._id ? "" : errors.flat?.message}
                  ></InputError>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  <InputLabel>Código Postal</InputLabel>
                  {tutor._id ? (
                    <InputText
                      type="number"
                      name="z_code"
                      {...register("z_code")}
                      defaultValue={tutor.id_direction.z_code}
                      readOnly
                    ></InputText>
                  ) : (
                    <InputText
                      type="number"
                      name="z_code"
                      {...register("z_code")}
                      defaultValue={""}
                    ></InputText>
                  )}

                  <InputError
                    message={tutor._id ? "" : errors.z_code?.message}
                  ></InputError>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  <InputLabel>Ciudad</InputLabel>
                  {tutor._id ? (
                    <InputText
                      type="text"
                      name="city"
                      {...register("city")}
                      defaultValue={tutor.id_direction.city}
                      readOnly
                    ></InputText>
                  ) : (
                    <InputText
                      type="text"
                      name="city"
                      {...register("city")}
                      defaultValue={""}
                    ></InputText>
                  )}

                  <InputError
                    message={tutor._id ? "" : errors.city?.message}
                  ></InputError>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  <InputLabel>Provincia</InputLabel>
                  {tutor._id ? (
                    <InputText
                      type="text"
                      name="province"
                      {...register("province")}
                      defaultValue={tutor.id_direction.province}
                      readOnly
                    ></InputText>
                  ) : (
                    <InputText
                      type="text"
                      name="province"
                      {...register("province")}
                      defaultValue={""}
                    ></InputText>
                  )}

                  <InputError
                    message={tutor._id ? "" : errors.province?.message}
                  ></InputError>
                </div>
              </div>
              <div className="separadorBtn">
                <BtnPrimary className={"btnsPrimary"}>Crear</BtnPrimary>
              </div>
            </form>
          </section>
        </div>
      </div>
    </CardBasic>
  );
}

export default FormCreateTutor;
