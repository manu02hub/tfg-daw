import React from "react";
import { MdMail } from "react-icons/md";
import { HiPhone } from "react-icons/hi";
import { BiCheck } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";

function ShowPatient() {
  return (
    <>
      <HeaderSection title={"Paciente"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-9">
                <span className="namePatient">Manuel Alonso Martín</span>
                <div className="row patientData">
                  <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="patientPersonal">
                      <span>Datos Peronales</span>
                      <hr />
                      <p>
                        <span> Numero de Historial: </span> 000001
                      </p>
                      <p>
                        <span> NIF: </span> 51261070G
                      </p>
                      <p>
                        <span> Sexo: </span> Hombre <span> Edad: </span> 20
                      </p>
                      <p>
                        <span> Odontograma: </span> Adulto
                      </p>
                      <p>
                        <span> Enfermedades: </span> Ninguna
                      </p>
                      <p>
                        <span> Alergias: </span> Ninguna
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="patientContact">
                      <span>Detalles de contacto</span>
                      <hr />
                      <div className="dataContact">
                        <MdMail />
                        <p>manuel@gmail.com</p>
                      </div>
                      <div className="dataContact">
                        <HiPhone />
                        <p>649923077</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="patientDirection">
                      <span>Dirección</span>
                      <hr />
                      <div className="dataContact">
                        <FaMapMarkerAlt />
                        <p> Calle: Torrox, P 26, 6D</p>
                      </div>
                      <p>
                        <span> CPostal: </span> 28041
                      </p>
                      <p>
                        <span> Ciudad: </span> Madrid
                      </p>
                      <p>
                        <span> Provincia: </span> Madrid
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBasic>

          <HeaderSection title={"Histoy Patient"} />
          <div className="row">
            <div className="col-sm-8 col-md-8 col-lg-8">
              <div className="timeline">
                <div className="container right">
                  <CardBasic>
                    <div className="infoTimeline">
                      <span>30 de Mayo de 2023</span>
                      <div className="therapiesDate">
                        <p>
                          <span className="therapyName"> Tratamiento: </span>{" "}
                          Empaste, <span> Pieza: </span> 18a
                        </p>
                        <p>
                          <span> Enfermero: </span> Sergio Hervás Aragón
                        </p>
                      </div>
                      <div className="therapiesDate">
                        <p>
                          <span className="therapyName"> Tratamiento: </span>{" "}
                          Empaste, <span> Pieza: </span> 18a
                        </p>
                        <p>
                          <span> Enfermero: </span> Sergio Hervás Aragón
                        </p>
                      </div>
                    </div>
                  </CardBasic>
                </div>
                <div className="container right">
                  <CardBasic>
                    <div className="infoTimeline">
                      <span>30 de Mayo de 2023</span>
                      <div className="therapiesDate">
                        <p>
                          <span className="therapyName"> Tratamiento: </span>{" "}
                          Empaste, <span> Pieza: </span> 18a
                        </p>
                        <p>
                          <span> Enfermero: </span> Sergio Hervás Aragón
                        </p>
                      </div>
                    </div>
                  </CardBasic>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowPatient;
