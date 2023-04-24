import React from "react";
import CardBasic from "../../components/CardBasic";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import HeaderSection from "../../components/HeaderSection";

function EditUser() {
  return (
    <>
      <HeaderSection title={"Edit User"}/>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <section className="section-card">
                  <h2>Profile information</h2>
                  <p>
                    Update your account's profile information and email address.
                  </p>
                  <form className="formEdit">
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
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        
                          <InputLabel>Rol</InputLabel>
                          <select name="select" defaultValue={"value2"}>
                            <option value="value1">Admin</option>
                            <option value="value2">
                              Admin Clinica
                            </option>
                            <option value="value3">Trabajador</option>
                          </select>
                        
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                       
                          <InputLabel>Clinica</InputLabel>
                          <select name="select" defaultValue={"value1"}>
                            <option value="value1">Clinica 1</option>
                            <option value="value2">
                              Clinica Thoot
                            </option>
                            <option value="value3">Clinica 3</option>
                          </select>
                        
                      </div>
                    </div>
                    <div className="separadorBtn">
                      <input
                        type="submit"
                        className="btnsColor"
                        value={"Save"}
                      ></input>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </CardBasic>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-12 col-md-10 col-lg-8">
                <section className="section-card">
                  <h2>Update password</h2>
                  <p>
                    Ensure your account is using a long, random password to stay
                    secure.
                  </p>
                  <form className="formEdit">
                    <InputLabel>Current Password</InputLabel>
                    <InputText
                      type="password"
                      name="current"
                      defaultValue="aaaaaaaaa"
                    ></InputText>

                    <div className="separadorForm">
                      <InputLabel>New Password</InputLabel>
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
                    <div className="separadorBtn">
                      <input
                        type="submit"
                        className="btnsColor"
                        value={"Save"}
                      ></input>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </CardBasic>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-12 col-md-10 col-lg-8">
                <section className="section-card">
                  <h2>Delete Account</h2>
                  <p>
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                  </p>
                  <div className="separadorBtn">
                    <button className="btnDelete">Delete Account</button>
                  </div>
                </section>
              </div>
            </div>
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default EditUser;
