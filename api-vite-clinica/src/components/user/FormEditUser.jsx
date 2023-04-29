import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { useNavigate } from "react-router-dom";
import InputLabel from "../InputLabel";
import InputText from "../InputText";
import InputError from "../InputError";
import SelectRol from "./SelectRol";
import SelectClinic from "./SelectClinic";

function FormEditUser({ user }) {

  const navigate = useNavigate();

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
      Global.url + "user/update-user/" + user._id,
      "PUT",
      newUser
    );

    if (datos.state == "success" && !cargando) {
      navigate("/panel/users");
    }
  };

  return (
    <form className="formEdit" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <InputLabel>Name</InputLabel>
          <InputText
            type="text"
            name="name"
            {...register("name")}
            defaultValue={user.name}
          ></InputText>
          <InputError message={errors.name?.message}></InputError>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <InputLabel>Email</InputLabel>
          <InputText
            type="email"
            name="email"
            {...register("email")}
            defaultValue={user.email}
          ></InputText>
          <InputError message={errors.email?.message}></InputError>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <InputLabel>Rol</InputLabel>
          <SelectRol
            name="id_rol"
            defaultValue={user.id_rol}
            {...register("id_rol")}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <InputLabel>Clinica </InputLabel>
          <SelectClinic
            name="id_clinic"
            defaultValue={user.id_clinic}
            {...register("id_clinic")}
          />
        </div>
      </div>
      <div className="separadorBtn">
        <input type="submit" className="btnsColor" value={"Save"}></input>
      </div>
    </form>
  );
}

export default FormEditUser;
