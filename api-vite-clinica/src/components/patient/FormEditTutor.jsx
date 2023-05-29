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
import BtnDelete from "../BtnDelete";
import toast, { Toaster } from "react-hot-toast";

function FormEditTutor({
  idPatient,
  idTutor,
  Idtutors,
  setIdTutors,
  tutorGet,
  setTutorGet,
  contactTutors,
  setContactTutors,
  dataTutor,
  dataContact,
}) {
  const [errorTutor, setErrorTutor] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let editTutor;
    let direction;
    let contact;
    let saveDirection;
    let saveContact;
    let saveTutor;
    let auxTutor;
    let positionTutor;
    let auxContact;
    let positionContact;

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

    editTutor = {
      name: data.name,
      surnames: data.surnames,
    };

    saveDirection = await updateDirection(direction);
    saveContact = await updateContact(contact);
    saveTutor = await updateTutor(editTutor);

    positionTutor = tutorGet.findIndex((t) => t._id === idTutor);
    auxTutor = [...tutorGet];

    positionContact = contactTutors.findIndex((c) => c._id === dataContact._id);
    auxContact = [...contactTutors];

    editTutor = {
      _id: dataTutor._id,
      name: data.name,
      surnames: data.surnames,
      id_direction: { ...direction, _id: dataTutor.id_direction._id },
    };

    contact = {
      _id: dataContact._id,
      email: data.email,
      mobile_phone: data.mobile_phone,
    };

    // direction = [...direction, tutorGet.]

    auxTutor[positionTutor] = editTutor;
    auxContact[positionContact] = contact;

    if (saveDirection && saveContact && saveTutor) {
      setTutorGet(auxTutor);
      setContactTutors(auxContact);
      toast.success("Se han editado los datos correctamente");
    } else {
      toast.error("Algo ha ido mal");
    }
  };

  const updateTutor = async (tut) => {
    let save;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "tutor/update-tutor/" + dataTutor._id,
      "PUT",
      tut
    );

    if (datos.state == "success" && !cargando) {
      save = true;
    } else {
      // setError(datos.message);
      save = false;
    }

    return save;
  };

  const updateContact = async (con) => {
    let save;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "contact/update-contact/" + dataContact._id,
      "PUT",
      con
    );

    if (datos.state == "success" && !cargando) {
      save = true;
    } else {
      save = false;
    }

    return save;
  };

  const updateDirection = async (dir) => {
    let save;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "direction/update-direction/" + dataTutor.id_direction._id,
      "PUT",
      dir
    );

    if (datos.state == "success" && !cargando) {
      save = true;
    } else {
      save = false;
    }
    return save;
  };

  const deleteTutor = async () => {
    let save;

    let auxIDTutor = Idtutors.find((tutor) => tutor !== idTutor);
    let auxTutor = tutorGet.find((tutor) => tutor._id !== idTutor);
    let auxContact = contactTutors.find(
      (contact) => contact._id !== dataContact._id
    );

    let deleteTutorPatient = {
      tutors: auxIDTutor,
    };

    setConfirmDeleteTutor(true);

      setTutorGet([auxTutor]);
      setIdTutors([auxIDTutor]);
      setContactTutors([auxContact]);

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/update-patient/" + idPatient,
      "PUT",
      deleteTutorPatient
    );

    if (datos.state == "success" && !cargando) {
      save = true;

    } else {
      // setError(datos.message);
      save = false;
    }

    return save;
  };

  const clearErrorTutor = () => {
    setErrorTutor("");
  };

  return (
    <>
      <CardBasic>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <section className="section-card">
              <h2>Edita los datos del Tutor </h2>
              <p>Rellena la información del Tutor</p>

              <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="separadorForm">
                      <InputLabel>Nombre</InputLabel>

                      <InputText
                        type="text"
                        name="name"
                        defaultValue={dataTutor.name}
                        {...register("name")}
                      ></InputText>

                      <InputError message={errors.name?.message}></InputError>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="separadorForm">
                      <InputLabel>Apellidos</InputLabel>

                      <InputText
                        type="text"
                        name="surnames"
                        defaultValue={dataTutor.surnames}
                        {...register("surnames")}
                      ></InputText>

                      <InputError
                        message={errors.surnames?.message}
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

                    <InputText
                      type="email"
                      name="email"
                      {...register("email")}
                      defaultValue={dataContact.email}
                      // onFocus={() => setErrorEmail()}
                    ></InputText>

                    <InputError
                    // message={errors.email ? errors.email?.message : error}
                    ></InputError>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <InputLabel>Número de Teléfono</InputLabel>

                    <InputText
                      type="phone"
                      name="mobile_phone"
                      {...register("mobile_phone")}
                      defaultValue={dataContact.mobile_phone}
                      // onFocus={() => setErrorEmail()}
                    ></InputText>

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

                    <InputText
                      type="text"
                      name="street"
                      {...register("street")}
                      defaultValue={dataTutor.id_direction.street}
                    ></InputText>

                    <InputError message={errors.street?.message}></InputError>
                  </div>

                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <InputLabel>Número</InputLabel>

                    <InputText
                      type="number"
                      name="number"
                      {...register("number")}
                      defaultValue={dataTutor.id_direction.number}
                    ></InputText>

                    <InputError message={errors.number?.message}></InputError>
                  </div>

                  <div className="col-lg-2 col-md-6 col-sm-12">
                    <InputLabel>Piso</InputLabel>

                    <InputText
                      type="text"
                      name="flat"
                      {...register("flat")}
                      defaultValue={dataTutor.id_direction.flat}
                    ></InputText>

                    <InputError message={errors.flat?.message}></InputError>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <InputLabel>Código Postal</InputLabel>

                    <InputText
                      type="number"
                      name="z_code"
                      {...register("z_code")}
                      defaultValue={dataTutor.id_direction.z_code}
                    ></InputText>

                    <InputError message={errors.z_code?.message}></InputError>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <InputLabel>Ciudad</InputLabel>

                    <InputText
                      type="text"
                      name="city"
                      {...register("city")}
                      defaultValue={dataTutor.id_direction.city}
                    ></InputText>

                    <InputError message={errors.city?.message}></InputError>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <InputLabel>Provincia</InputLabel>

                    <InputText
                      type="text"
                      name="province"
                      {...register("province")}
                      defaultValue={dataTutor.id_direction.province}
                    ></InputText>

                    <InputError message={errors.province?.message}></InputError>
                  </div>
                </div>
                <div className="section-btn-editTutor">
                  <div className="separadorBtn">
                    <BtnPrimary className={"btnsPrimary"}>GUARDAR</BtnPrimary>
                  </div>
                  {Idtutors.length != 1 && (
                    <div className="separadorBtn">
                      <BtnDelete type="button" onClick={() => deleteTutor()}>
                        ELIMINAR 
                      </BtnDelete>
                    </div>
                  )}
                </div>
              </form>
            </section>
          </div>
        </div>
      </CardBasic>

      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default FormEditTutor;
