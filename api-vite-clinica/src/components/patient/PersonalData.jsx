import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import CardBasic from "../../components/CardBasic";
import { MdMail } from "react-icons/md";
import { HiPhone } from "react-icons/hi";
import { BiCheck } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";

function PersonalData({ patientId, setTutors }) {
  const [loading, setLoading] = useState(true);
  const [odontogram, setOdontogram] = useState({});
  const [patient, setPatient] = useState({});
  const [contact, setContact] = useState({});
  const [other, setOther] = useState({});

  useEffect(() => {
    getDataPatient();
  }, []);

  const getDataPatient = async () => {
    let patient = await getPatient();
    await getContact(patient.id_contact);
    await getOther(patient.id_other);
    await getOdontograms();

    if (patient.tutors.length > 0) {
      // setIdTutors(patient.tutors);
    }

    setLoading(false);
  };

  const getPatient = async () => {
    let patient;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/get-patient/" + patientId,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setPatient(datos.patient);
      setTutors(datos.patient.tutors);
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

  const getOther = async (id) => {
    const { datos, cargando } = await PeticionAJAX(
        Global.url + "other/get-other/" + id,
        "GET"
      );
  
      if (datos.state == "success" && !cargando) {
        setOther(datos.other);
      }
  }

  const getOdontograms = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "odontogram/all-odontograms",
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setOdontogram(datos.odontograms);
    }
  };

  const checkOdontogram = (id) => {
    let find = odontogram.find((o) => o._id == id);

    return find.name;
  };

  const datePatient = () => {
    return patient.date_birth.split("T")[0];
  };

  return (
    <>
      {!loading && (
        <CardBasic>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-9">
              <span className="namePatient">
                {patient.name + " " + patient.surnames}
              </span>
              <div className="row patientData">
                <div className="col-sm-12 col-md-4 col-lg-4">
                  <div className="patientPersonal">
                    <span>Datos Peronales</span>
                    <hr />
                    <p>
                      <span> Numero de Historial: </span>{" "}
                      {patient.history_number}
                    </p>
                    <p>
                      <span> NIF: </span> {patient.nif}
                    </p>
                    <p>
                      <span> Sexo: </span> {patient.gender}
                    </p>
                    <p>
                      <span> F Nacimiento: </span>{" "}
                      {datePatient(patient.date_birth)}
                    </p>
                    <p>
                      <span> Odontograma: </span>{" "}
                      {checkOdontogram(patient.odontogram)}
                    </p>
                    <p>
                      <span> Enfermedades: </span> {other.diseases}
                    </p>
                    <p>
                      <span> Alergias: </span> {other.allergies}
                    </p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4">
                  <div className="patientContact">
                    <span>Detalles de contacto</span>
                    <hr />
                    <div className="dataContact">
                      <MdMail />
                      <p>{contact.email}</p>
                    </div>
                    <div className="dataContact">
                      <HiPhone />
                      <p>{contact.mobile_phone}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4">
                  <div className="patientDirection">
                    <span>Dirección</span>
                    <hr />
                    <div className="dataContact">
                      <FaMapMarkerAlt />
                      <p> Calle: {patient.id_direction.street}, P {patient.id_direction.number}, {patient.id_direction.flat}</p>
                    </div>
                    <p>
                      <span> C Postal: </span> {patient.id_direction.z_code}
                    </p>
                    <p>
                      <span> Ciudad: </span> {patient.id_direction.city}
                    </p>
                    <p>
                      <span> Provincia: </span> {patient.id_direction.province}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBasic>
      )}
    </>
  );
}

export default PersonalData;
