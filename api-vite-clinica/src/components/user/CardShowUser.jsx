import React from 'react';
import CardBasic from "../../components/CardBasic";
import userImage from "../../assets/user.jpg";
import clinicImage from "../../assets/clinic.jpg";

function CardShowUser() {
  return (
    <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-lg-5 col-md-12 col-sm-12">
                <div className="boxShowUser">
                  <div className="boxShowImg">
                    <img src={userImage}></img>
                  </div>
                  <div className="cardShowUser">
                    <h3>Manuel Alonso Martín</h3>
                    <p>manuel@gmail.com</p>
                    <p>Admin-Clinica</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12">
                <section className="sectionShowClinic">
                  <div className="sectionInfoClinic">
                    <h3>Clinica ToothSensation </h3>
                    <div className="boxInfoclinic">
                      <div className="columnClinic">
                        <span>
                          Direccion
                          {/* font-size: 0.8rem; font-weight: 500; */}
                        </span>
                        <p>Calle Torrox, 26</p>
                      </div>
                      <div className="columnClinic">
                        <span>
                          Ciudad
                          {/* font-size: 0.8rem; font-weight: 500; */}
                        </span>
                        <p>Barcelona</p>
                      </div>
                      <div className="columnClinic">
                        <span>
                          Codigo Postal
                          {/* font-size: 0.8rem; font-weight: 500; */}
                        </span>
                        <p>28041</p>
                      </div>
                    </div>
                  </div>

                  <div className="sectionImgClinic">
                    <img src={clinicImage}></img>
                  </div>
                </section>
              </div>
            </div>
          </CardBasic>
        </div>
      </div>
  )
}

export default CardShowUser