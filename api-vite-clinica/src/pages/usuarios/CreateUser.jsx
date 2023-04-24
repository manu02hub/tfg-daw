import React from "react";
import CardBasic from "../../components/CardBasic";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import HeaderSection from "../../components/HeaderSection";

function CreateUser() {
  return (
    <>
      <HeaderSection title={"Create User"}/>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <section className="section-card">
                  <h2>Create a new account for workers </h2>
                  <p>
                    Update your account's profile information and email address.
                  </p>
                  <form className="formCreate">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <InputLabel>Name</InputLabel>
                        <InputText
                          name="name"
                          defaultValue="Manuel Alonso Martín"
                        ></InputText>
                        <InputError
                          message={"Tiene que tener un mínimo de 3 caracteres"}
                        ></InputError>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <InputLabel>Email</InputLabel>
                        <InputText
                          type="email"
                          name="email"
                          defaultValue="manuel@gmail.com"
                        ></InputText>
                        <InputError
                          message={"Tiene que tener un mínimo de 3 caracteres"}
                        ></InputError>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-8 col-md-10 col-sm-12">
                        <div className="separadorForm">
                          <InputLabel>Password</InputLabel>
                          <InputText
                            type="password"
                            name="newPassword"
                            defaultValue="aaaaaaaaa"
                          ></InputText>
                        </div>

                        <div className="separadorForm">
                          <InputLabel>Confirm Password</InputLabel>
                          <InputText
                            type="password"
                            name="confirmPassword"
                            defaultValue="aaaaaaaaa"
                          ></InputText>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="separadorForm">
                          <InputLabel>Rol</InputLabel>
                          <select name="select" defaultValue={'value2'}>
                            <option value="value1">Admin</option>
                            <option value="value2" >
                              Admin Clinica
                            </option>
                            <option value="value3">Trabajador</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="separadorForm">
                          <InputLabel>Clinica</InputLabel>
                          <select name="select" defaultValue={'value1'}>
                            <option value="value1">Clinica 1</option>
                            <option value="value2" >
                              Clinica Thoot
                            </option>
                            <option value="value3">Clinica 3</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="separadorBtn">
                      <input
                        type="submit"
                        className="btnsColor"
                        value={"Crear"}
                      ></input>
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

export default CreateUser;
