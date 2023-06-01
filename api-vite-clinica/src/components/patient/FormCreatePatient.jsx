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
import SelectOdontogram from "../odontogram/SelectOdontogram";

function FormCreatePatient({
  isMinor,
  setIsMinor,
  isSavedTutor,
  idTutor,
  auth,
}) {
  const dateNow = new Date();
  const [errorNif, setErrorNif] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMobilePhone, seterrorMobilePhone] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleDateChange = (event) => {
    let data;
    let dayData;
    let monthData;
    let yearData;

    let dayNow;
    let monthNow;
    let yearNow;

    let age;

    let date = event.target.value;

    data = date.split("-");
    dayData = data[2];
    monthData = data[1];
    yearData = data[0];

    dayNow = dateNow.getDate();
    monthNow = dateNow.getMonth() + 1;
    yearNow = dateNow.getFullYear();

    age = (yearNow - yearData) * 12 - (monthNow - monthData);

    if (age < 18 * 12) {
      setIsMinor(true);
    } else {
      setIsMinor(false);
    }
  };

  const onSubmit = async (data) => {
    let newPatient;
    let direction;
    let contact;
    let other;
    let id_direction;
    let id_contact;
    let id_other;
    let tutors = [];

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

    other = {
      diseases: data.diseases,
      allergies: data.allergies,
    };

    id_direction = await createDirection(direction);
    id_contact = await createContact(contact);
    id_other = await createOther(other);

    if (idTutor !== 0) {
      tutors.push(idTutor);
    }

    newPatient = {
      history_number: 1,
      name: data.name,
      surnames: data.surnames,
      nif: data.nif,
      gender: data.gender,
      date_birth: data.date_birth,
      odontogram: data.odontogram,
      id_direction: id_direction,
      id_contact: id_contact,
      id_other: id_other,
      tutors: tutors,
      id_clinic: auth.id_clinic,
    };

    await createPatient(newPatient);
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

  const createOther = async (othe) => {
    let other;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "other/create-other",
      "POST",
      othe
    );

    if (datos.state == "success" && !cargando) {
      other = datos.other._id;
    } else {
      // setError(datos.message);
    }
    return other;
  };

  const createPatient = async (pat) => {
    let save;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/create-patient",
      "POST",
      pat
    );

    if (datos.state == "success" && !cargando) {
      setErrorEmail("");
      setErrorNif("");
      seterrorMobilePhone("");
      save = await activity(datos.patient);
      if (save) {
        navigate("/panel/patients");
      }
    } else {
      // setError(datos.message);
    }
  };

  const activity = async (pat) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha creado al paciente con nif " +
        pat.nif,
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

  const clearErrorEmail = () => {
    setErrorEmail("");
  };

  const clearErrorPhone = () => {
    seterrorMobilePhone("");
  };

  const clearErrorNif = () => {
    setErrorNif("");
  };

  return (
    <CardBasic>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <section className="section-card">
            <h2>Crea un nuevo Paciente </h2>
            <p>Completa la información correspondiente</p>
            <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Nombre</InputLabel>
                  <InputText
                    type="text"
                    name="name"
                    {...register("name")}
                  ></InputText>
                  <InputError message={errors.name?.message}></InputError>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Apellidos</InputLabel>
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
                      onFocus={() => clearErrorNif()}
                    ></InputText>
                    <InputError
                      message={errors.nif ? errors.nif?.message : errorNif}
                    ></InputError>
                  </div>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-12">
                  <div className="separadorForm">
                    <InputLabel>Fecha de Nacimiento</InputLabel>
                    <InputText
                      type="date"
                      name="date_birth"
                      {...register("date_birth")}
                      onChange={handleDateChange}
                    ></InputText>
                    <InputError
                      message={errors.date_birth?.message}
                    ></InputError>
                  </div>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-6">
                  <div className="separadorForm">
                    <InputLabel>Género</InputLabel>
                    <select {...register("gender")}>
                      <option value={"Hombre"}>Hombre</option>
                      <option value={"Mujer"}>Mujer</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-6">
                  <div className="separadorForm">
                    <InputLabel>Odontograma</InputLabel>
                    <SelectOdontogram
                      {...register("odontogram")}
                      name={"odontogram"}
                    />
                  </div>
                </div>
              </div>

              <div className="subtitleForm">
                <p>Otros Datos</p>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Enfermedades</InputLabel>
                  <textarea {...register("diseases")}></textarea>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Alergías</InputLabel>
                  <textarea {...register("allergies")}></textarea>
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
                    onFocus={() => clearErrorEmail()}
                  ></InputText>

                  <InputError
                    message={errors.email ? errors.email?.message : errorEmail}
                  ></InputError>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Número de Teléfono</InputLabel>
                  <InputText
                    type="phone"
                    name="mobile_phone"
                    {...register("mobile_phone")}
                    onFocus={() => clearErrorPhone()}
                  ></InputText>

                  <InputError
                    message={
                      errors.mobile_phone
                        ? errors.mobile_phone?.message
                        : errorMobilePhone
                    }
                  ></InputError>
                </div>
              </div>

              <div className="subtitleForm">
                <p>Dirección</p>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputLabel>Calle</InputLabel>
                  <InputText
                    type="text"
                    name="street"
                    {...register("street")}
                  ></InputText>

                  <InputError message={errors.street?.message}></InputError>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12">
                  <InputLabel>Número</InputLabel>
                  <InputText
                    type="number"
                    name="number"
                    {...register("number")}
                  ></InputText>

                  <InputError message={errors.number?.message}></InputError>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-12">
                  <InputLabel>Piso</InputLabel>
                  <InputText
                    type="text"
                    name="flat"
                    {...register("flat")}
                  ></InputText>

                  <InputError message={errors.flat?.message}></InputError>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  <InputLabel>Código Postal</InputLabel>
                  <InputText
                    type="number"
                    name="z_code"
                    {...register("z_code")}
                  ></InputText>

                  <InputError message={errors.z_code?.message}></InputError>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  <InputLabel>Ciudad</InputLabel>
                  <InputText
                    type="text"
                    name="city"
                    {...register("city")}
                  ></InputText>

                  <InputError message={errors.city?.message}></InputError>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  <InputLabel>Provincia</InputLabel>
                  <InputText
                    type="text"
                    name="province"
                    {...register("province")}
                  ></InputText>

                  <InputError message={errors.province?.message}></InputError>
                </div>
              </div>

              <div className="separadorBtn">
                <BtnPrimary
                  className={"btnsPrimary"}
                  disabled={isMinor && !isSavedTutor ? true : false}
                >
                  Crear
                </BtnPrimary>
                {isMinor && !isSavedTutor && (
                  <InputError
                    message={"Tiene que rellenar antes los campos del Tutor"}
                    className="errorTutor"
                  ></InputError>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </CardBasic>
  );
}

export default FormCreatePatient;
