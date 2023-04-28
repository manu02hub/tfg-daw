import React from "react";
import { useNavigate } from "react-router-dom";
import CardBasic from "../../components/CardBasic";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import HeaderSection from "../../components/HeaderSection";
import { Global } from "../../helpers/Global";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import SelectRol from "../../components/user/SelectRol";
import SelectClinic from "../../components/user/SelectClinic";

function CreateUser() {
  const navigate = useNavigate();
  // const { form, changed } = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let newUser = data;
    console.log(newUser);

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/create-user",
      "POST",
      newUser
    );

    if (datos.state == "success" && !cargando) {
      navigate("/panel/users");
    }
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
                          <SelectRol {...register("id_rol")} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="separadorForm">
                          <InputLabel>Clinica</InputLabel>
                          <SelectClinic {...register("id_clinic")} />
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
