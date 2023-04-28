import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { useNavigate } from "react-router-dom";
import CardBasic from "../../components/CardBasic";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import SelectRol from "../../components/user/SelectRol";
import SelectClinic from "../../components/user/SelectClinic";
import Spinner from "../../components/Spinner";
import HeaderSection from "../../components/HeaderSection";
import { useParams } from "react-router-dom";

function EditUser() {
  const [roles, setRoles] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    getRoles();
  }, []);

  const getUser = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/edit-user/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setUser(datos.user);
      
    }
  };

  const getRoles = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "rol/getAll-roles",
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setRoles(datos.roles);
      setLoading(false);
   
    }
  };

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
      Global.url + "user/update-user/" + id,
      "PUT",
      newUser
    );

    if (datos.state == "success" && !cargando) {
      navigate("/panel/users");
    }
  };

  return (
    <>
      <HeaderSection title={"Edit User"} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <CardBasic>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <section className="section-card">
                      <h2>Profile information</h2>
                      <p>
                        Update your account's profile information and email
                        address.
                      </p>
                      <form
                        className="formEdit"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <InputLabel>Name</InputLabel>
                            <InputText
                              type="text"
                              name="name"
                              {...register("name")}
                              defaultValue={user.name}
                            ></InputText>
                            <InputError
                              message={errors.name?.message}
                            ></InputError>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <InputLabel>Email</InputLabel>
                            <InputText
                              type="email"
                              name="email"
                              {...register("email")}
                              defaultValue={user.email}
                            ></InputText>
                            <InputError
                              message={errors.email?.message}
                            ></InputError>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <InputLabel>Rol</InputLabel>
                            {/* <SelectRol
                              name="id_rol"
                              val={user.id_rol}
                              {...register("id_rol")}
                            /> */}

                            <select
                              defaultValue={user.id_rol}
                              {...register("id_rol")}
                            >
                              
                              {roles.map((rol) => {
                                return (
                                  <option key={rol._id} value={rol._id}>
                                    {rol.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <InputLabel>Clinica </InputLabel>
                            <SelectClinic
                              valor={user.id_clinic}
                              name="id_clinic"
                              {...register("id_clinic")}
                            />
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
                        Ensure your account is using a long, random password to
                        stay secure.
                      </p>
                      <form
                        className="formEdit"
                        onSubmit={handleSubmit(onSubmit)}
                      >
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
                            name="password"
                            // {...register("password")}
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
                            // {...register("passwordConfirmation")}
                          ></InputText>
                          <InputError
                            message={errors.passwordConfirmation?.message}
                          ></InputError>
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
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Before deleting your
                        account, please download any data or information that
                        you wish to retain.
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
      )}
    </>
  );
}

export default EditUser;
