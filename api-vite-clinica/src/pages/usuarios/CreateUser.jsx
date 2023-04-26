import React, { useEffect, useLayoutEffect, useState } from "react";
import CardBasic from "../../components/CardBasic";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import HeaderSection from "../../components/HeaderSection";
import { Global } from "../../helpers/Global";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";

function CreateUser() {
  const [roles, setRoles] = useState({});

  useEffect(() => {
    getRoles();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOnChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const getRoles = async () => {
    //Persistir datos en el navegador
    const request = await fetch(Global.url + "rol/getAll-roles", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    if (data.state == "success") {
      setRoles(data.roles);
    }
  };

  const onSubmit = (data) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <>
      <HeaderSection title={"Create User"} />
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
                  <form
                    className="formCreate"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <InputLabel>Name</InputLabel>
                        <InputText
                          type="text"
                          name="name"
                          {...register("name")}
                        ></InputText>
                        <InputError message={errors.name?.message}></InputError>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <InputLabel>Email</InputLabel>
                        <InputText
                          type="email"
                          name="email"
                          {...register("email")}
                        ></InputText>
                        <InputError
                          message={errors.email?.message}
                        ></InputError>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-8 col-md-10 col-sm-12">
                        <div className="separadorForm">
                          <InputLabel>Password</InputLabel>
                          <InputText
                            type="password"
                            name="password"
                            {...register("password")}
                          ></InputText>
                          <InputError
                            message={errors.password?.message}
                          ></InputError>
                        </div>

                        <div className="separadorForm">
                          <InputLabel>Confirm Password</InputLabel>
                          <InputText
                            type="password"
                            name="passwordConfirmation"
                            {...register("passwordConfirmation")}
                          ></InputText>
                          <InputError
                            message={errors.passwordConfirmation?.message}
                          ></InputError>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="separadorForm">
                          <InputLabel>Rol</InputLabel>
                          <select name="select">
                            {roles.map((rol) => {
                              <option value={rol._id}>{rol.name}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="separadorForm">
                          <InputLabel>Clinica</InputLabel>
                          <select name="select" defaultValue={"value1"}>
                            <option value="value1">Clinica 1</option>
                            <option value="value2">Clinica Thoot</option>
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
