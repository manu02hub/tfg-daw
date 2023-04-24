import React from "react";
import CardBasic from "../../components/CardBasic";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import HeaderSection from "../../components/HeaderSection";
import clinicImage from "../../assets/clinic.jpg";

function EditClinic() {
  return (
    <>
      <HeaderSection title={"Edit clinic"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <section className="section-card">
                  <h2>Edit your clinic </h2>
                  <p>You can change the data of clinics</p>
                  <form className="formCreate">
                    <div className="row">
                      <div className="col-lg-3 col-md-12 col-sm-12">
                        <div className="boxImg">
                          <img src={clinicImage} />
                        </div>
                      </div>
                      <div className="col-lg-9 col-md-12 col-sm-12">
                        <div className="row">
                          <div className="col-lg-10 col-md-12 col-sm-12">
                            <InputLabel>Name</InputLabel>
                            <InputText
                              name="name"
                              defaultValue="Thoot Sensation"
                            ></InputText>
                            <InputError
                              message={
                                "Tiene que tener un mínimo de 3 caracteres"
                              }
                            ></InputError>
                          </div>
                          <div className="col-lg-4 col-md-12 col-sm-12">
                            <InputLabel>Name</InputLabel>
                            <InputText
                              name="direction"
                              defaultValue="Thoot Sensation"
                            ></InputText>
                            <InputError
                              message={
                                "Tiene que tener un mínimo de 3 caracteres"
                              }
                            ></InputError>
                          </div>
                          <div className="col-lg-4 col-md-12 col-sm-12">
                            <InputLabel>City</InputLabel>
                            <InputText
                              name="city"
                              defaultValue="Madrid"
                            ></InputText>
                            <InputError
                              message={
                                "Tiene que tener un mínimo de 3 caracteres"
                              }
                            ></InputError>
                          </div>
                          <div className="col-lg-4 col-md-12 col-sm-12">
                            <InputLabel>C Postal</InputLabel>
                            <InputText
                              name="c_postal"
                              defaultValue="28041"
                            ></InputText>
                            <InputError
                              message={
                                "Tiene que tener un mínimo de 3 caracteres"
                              }
                            ></InputError>
                          </div>

                          <div className="separadorBtn btnEditClinic">
                            <input
                              type="submit"
                              className="btnsColor"
                              value={"Save"}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default EditClinic;
