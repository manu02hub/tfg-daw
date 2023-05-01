import React, {useState} from "react";
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
import BtnPrimary from "../BtnPrimary";

function FormEditUser({ user, auth }) {

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let newUser = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/update-user/" + user._id,
      "PUT",
      newUser
    );

    if (datos.state == "success" && !cargando) {
      navigate("/panel/users");
    }else {
      setError(datos.message);
    }
  };

  const setErrorEmail = () =>{
    setError("");
   
  }

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
            onFocus={() => setErrorEmail()}
          ></InputText>
          <InputError message={errors.email ? errors.email?.message : error }></InputError>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <InputLabel>Rol</InputLabel>
          <SelectRol
            name="id_rol"
            defaultValue={user.id_rol}
            auth={auth}
            {...register("id_rol")}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <InputLabel>Clinica </InputLabel>
          <SelectClinic
            name="id_clinic"
            defaultValue={user.id_clinic}
            auth={auth}
            {...register("id_clinic")}
          />
        </div>
      </div>
      <div className="separadorBtn">
        <BtnPrimary >Save</BtnPrimary>
      </div>
    </form>
  );
}

export default FormEditUser;
