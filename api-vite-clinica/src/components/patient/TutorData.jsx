import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import CardBasic from "../../components/CardBasic";
import { MdMail } from "react-icons/md";
import { HiPhone } from "react-icons/hi";
import { BiCheck } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";

function TutorData({ idTutor }) {
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState({});
  const [tutor, setTutor] = useState({});

  useEffect(() => {
    getDataTutor();
  }, []);

  const getDataTutor = async () => {
    let tutor = await getTutor();
    await getContact(tutor.id_contact);

    setLoading(false);
  };

  const getTutor = async () => {
    let tutor;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "tutor/get-tutor/" + idTutor,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setTutor(datos.tutor);
      tutor = datos.tutor;
    }

    return tutor;
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

  return (
    <>
      {!loading && (
        
          <div className="col-lg-6 col-md-12 col-sm-12">
            <CardBasic>
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <span className="namePatient">
                    {tutor.name + " " + tutor.surnames}
                  </span>
                  <div className="row patientData">
                    <div className="col-sm-12 col-md-12 col-lg-5">
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
                    <div className="col-sm-12 col-md-12 col-lg-7">
                      <div className="patientDirection">
                        <span>Dirección</span>
                        <hr />
                        <div className="dataContact">
                          <FaMapMarkerAlt />
                          <p>
                            {" "}
                            Calle: {tutor.id_direction.street}, P{" "}
                            {tutor.id_direction.number},{" "}
                            {tutor.id_direction.flat}
                          </p>
                        </div>
                        <p>
                          <span> C Postal: </span> {tutor.id_direction.z_code}
                        </p>
                        <p>
                          <span> Ciudad: </span> {tutor.id_direction.city}
                        </p>
                        <p>
                          <span> Provincia: </span>{" "}
                          {tutor.id_direction.province}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBasic>
          </div>
      )}
    </>
  );
}

export default TutorData;
