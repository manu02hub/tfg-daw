import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import toast, { Toaster } from "react-hot-toast";

function FormEditPatient({
  id,
  Idtutors,
  setIdTutors,
  isSavedTutor,
  idTutor,
  isMinor,
  setIsMinor,
}) {
  const dateNow = new Date();
  const [loading, setLoading] = useState(true);
  const [odontogram, setOdontogram] = useState({});
  const [patient, setPatient] = useState({});
  const [contact, setContact] = useState({});
  const [other, setOther] = useState({});
  const [error, setError] = useState("");
  const [errorDate, setErrorDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getDataPatient();
  }, []);

  useEffect(() => {
    asignTutor();
  }, [isSavedTutor]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getDataPatient = async () => {
    let patient = await getPatient();
    await getContact(patient.id_contact);
    await getOther(patient.id_other);
    await getOdontograms();

    if (patient.tutors.length > 0) {
      setIdTutors(patient.tutors);
    }

    setLoading(false);
  };

  const getPatient = async () => {
    let patient;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/get-patient/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setPatient(datos.patient);
      patient = datos.patient;
    }

    return patient;
  };

  const getContact = async (id) => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "contact/get-contact/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setContact(datos.contact);
    }
  };

  const getOdontograms = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "odontogram/all-odontograms",
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setOdontogram(datos.odontograms);
    }
  };

  const getOther = async (id) => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "other/get-other/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setOther(datos.other);
    }
  };

  const checkOdontogram = (id) => {
    let find = odontogram.find((o) => o._id == id);

    return find._id;
  };

  const datePatient = () => {
    return patient.date_birth.split("T")[0];
  };

  const onSubmit = async (data) => {
    let editPatient;
    let direction;
    let contact;
    let other;
    let saveDirection;
    let saveContact;
    let savePatient;
    let saveOther;

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

    editPatient = {
      name: data.name,
      surnames: data.surnames,
      nif: data.nif,
      gender: data.gender,
      date_birth: data.date_birth,
      odontogram: data.odontogram,
    };

    other = {
      diseases: data.diseases,
      allergies: data.allergies
    }

    saveDirection = await updateDirection(direction);
    saveContact = await updateContact(contact);
    savePatient = await updatePatient(editPatient);
    saveOther = await updateOther(other);

    if (saveDirection && saveContact && savePatient) {
      toast.success("Se han editado los datos correctamente");
    } else {
      toast.error("Algo ha ido mal");
    }
  };

  const updatePatient = async (pat) => {
    let save;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/update-patient/" + patient._id,
      "PUT",
      pat
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
      Global.url + "contact/update-contact/" + contact._id,
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
      Global.url + "direction/update-direction/" + patient.id_direction._id,
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

  const updateOther = async (oth) => {
    let save;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "other/update-other/" + patient.id_other,
      "PUT",
      oth
    );

    if (datos.state == "success" && !cargando) {
      save = true;
    } else {
      save = false;
    }
    return save;
  };

  const asignTutor = async () => {
    let tutors;
    let patientTutor;
    let save;

    if (isSavedTutor && idTutor !== 0) {
      tutors = Idtutors;
      tutors.push(idTutor);

      patientTutor = {
        tutors: tutors,
      };

      console.log(patientTutor);

      save = await updatePatient(patientTutor);

      if (save) {
        console.log("Añade tutor");
        // setIdTutors([...Idtutors, idTutor]);
        // setConfirmNewTutor(false);
        navigate("/panel/patients");
      }
    }
  };

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
      setErrorDate("Tienes que asignarle un tutor");
    } else {
      setIsMinor(false);
    }
  };

  const setErrorPhone = () => {
    setError("");
  };

  return (
    <>
      {!loading && (
        <CardBasic>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <section className="section-card">
                <h2>Edita los datos del paciente </h2>
                <p>Completa con la información necesaria</p>
                <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <InputLabel>Nombre</InputLabel>
                      <InputText
                        type="text"
                        name="name"
                        {...register("name")}
                        defaultValue={patient.name}
                      ></InputText>
                      <InputError message={errors.name?.message}></InputError>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <InputLabel>Apellidos</InputLabel>
                      <InputText
                        type="text"
                        name="surnames"
                        {...register("surnames")}
                        defaultValue={patient.surnames}
                      ></InputText>

                      <InputError
                        message={errors.surnames?.message}
                      ></InputError>
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
                          defaultValue={patient.nif}
                        ></InputText>
                        <InputError message={errors.nif?.message}></InputError>
                      </div>
                    </div>

                    <div className="col-lg-2 col-md-6 col-sm-12">
                      <div className="separadorForm">
                        <InputLabel>Fecha de Nacimiento</InputLabel>
                        <InputText
                          type="date"
                          name="date_birth"
                          {...register("date_birth")}
                          defaultValue={datePatient()}
                          onChange={handleDateChange}
                        ></InputText>
                        <InputError
                          message={
                            errors.date_birth
                              ? errors.date_birth?.message
                              : errorDate
                          }
                        ></InputError>
                      </div>
                    </div>

                    <div className="col-lg-2 col-md-6 col-sm-6">
                      <div className="separadorForm">
                        <InputLabel>Género</InputLabel>
                        <select
                          {...register("gender")}
                          defaultValue={patient.gender}
                        >
                          <option value={"Hombre"}>M</option>
                          <option value={"Mujer"}>W</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-2 col-md-6 col-sm-6">
                      <div className="separadorForm">
                        <InputLabel>Odontograma</InputLabel>
                        <SelectOdontogram
                          {...register("odontogram")}
                          name={"odontogram"}
                          defaultValue={checkOdontogram(patient.odontogram)}
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
                      <textarea {...register("diseases")}  defaultValue={other.diseases}></textarea>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <InputLabel>Alergías</InputLabel>
                      <textarea {...register("allergies")} defaultValue={other.allergies}></textarea>
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
                        defaultValue={contact.email}
                        onFocus={() => setErrorEmail()}
                      ></InputText>

                      <InputError
                        message={errors.email ? errors.email?.message : error}
                      ></InputError>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <InputLabel>Número de Teléfono</InputLabel>
                      <InputText
                        type="phone"
                        name="mobile_phone"
                        {...register("mobile_phone")}
                        defaultValue={contact.mobile_phone}
                        onFocus={() => setErrorPhone()}
                      ></InputText>

                      <InputError
                        message={
                          errors.mobile_phone
                            ? errors.mobile_phone?.message
                            : error
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
                        defaultValue={patient.id_direction.street}
                      ></InputText>

                      <InputError message={errors.street?.message}></InputError>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <InputLabel>Número</InputLabel>
                      <InputText
                        type="number"
                        name="number"
                        {...register("number")}
                        defaultValue={patient.id_direction.number}
                      ></InputText>

                      <InputError
                        message={errors.province?.number}
                      ></InputError>
                    </div>

                    <div className="col-lg-2 col-md-6 col-sm-12">
                      <InputLabel>Piso</InputLabel>
                      <InputText
                        type="text"
                        name="flat"
                        {...register("flat")}
                        defaultValue={patient.id_direction.flat}
                      ></InputText>

                      <InputError message={errors.flat?.message}></InputError>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <InputLabel>Código Postal</InputLabel>
                      <InputText
                        type="number"
                        name="z_code"
                        {...register("z_code")}
                        defaultValue={patient.id_direction.z_code}
                      ></InputText>

                      <InputError
                        message={errors.z_postal?.message}
                      ></InputError>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <InputLabel>Ciudad</InputLabel>
                      <InputText
                        type="text"
                        name="city"
                        {...register("city")}
                        defaultValue={patient.id_direction.city}
                      ></InputText>

                      <InputError message={errors.city?.message}></InputError>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <InputLabel>Provincia</InputLabel>
                      <InputText
                        type="text"
                        name="province"
                        {...register("province")}
                        defaultValue={patient.id_direction.province}
                      ></InputText>

                      <InputError
                        message={errors.province?.message}
                      ></InputError>
                    </div>
                  </div>

                  <div className="separadorBtn">
                    <BtnPrimary
                      className={"btnsPrimary"}
                      disabled={isMinor && Idtutors.length < 1 ? true : false}
                    >
                      Guardar
                    </BtnPrimary>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </CardBasic>
      )}

      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default FormEditPatient;
