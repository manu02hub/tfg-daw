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
      <HeaderSection title={"Show Patient"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-9 col-md-9 col-lg-9">
                <span className="namePatient">Manuel Alonso Martín</span>
                <div className="patientData">
                  <div className="patientPersonal">
                    <span>Personal Data</span>
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
                  <div className="patientContact">
                    <span>Contact details</span>
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

                  <div className="patientDirection">
                    <span>Direction</span>
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
          </CardBasic>

          <CardBasic>
            <span>Historial del Paciente</span>
            <div className="row">
              <div className="col-sm-8 col-md-8 col-lg-8">
                <div className="timeline">
                  <div className="section-timeline">
                    <div className="date">
                      <p>24 Mayo de 2022</p>
                    </div>
                    <div className="therapies">
                      <div className="circleLine">
                        <div className="circleBox">
                          <div className="circle">
                           
                          </div>
                        </div>
                        <hr />
                      </div>
                      <div className="therapy">
                        <div className="therapyInfo">
                          <CardBasic>
                            <p>Tratamientos</p>
                          </CardBasic>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default ShowPatient;
