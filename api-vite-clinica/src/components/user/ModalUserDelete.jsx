import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import Modal from "../Modal";
import BtnDelete from "../BtnDelete";
import BtnCancel from "../BtnCancel";

function ModalUserDelete({ confirm, setConfirm, user, auth, users, setUsers }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const deleteUser = async (data) => {
    let save;
    let usuarios = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/delete-user/" + user._id,
      "POST",
      usuarios
    );

    if (datos.state == "success" && !cargando) {
      save = await activity(user);
      if (users && save) {
        usuarios = users.filter((u) => u._id !== user._id);
        closeModal();
        setUsers(usuarios);
        toast.success("Se ha eliminado el usuario correctamente");
      } else {
        closeModal();
        navigate("/panel/users");
      }
    } else {
      setError(datos.message);
    }
  };

  const activity = async (user) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha eliminado al usuario con correo " +
        user.email,
      action: "Eliminar",
      date: Date.now(),
      id_user: auth._id,
      id_clinic: auth.id_clinic,
    };

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "activity/create-activity",
      "POST",
      activity
    );

    if (datos.state == "success" && !cargando) {
      save = true;
    }

    return save;
  };

  const closeModal = () => {
    setConfirm(false);
  };

  const setErrorPass = () => {
    setError("");
  };

  return (
    <>
      {confirm && (
        <Modal show={confirm}>
          <div className="section-modal">
            <h2>¿Seguro que quiere eliminar la cuenta?</h2>
            <p>
              Una vez que se elimine su cuenta, todos sus recursos y datos se
              eliminará permanentemente. Por favor, introduzca su contraseña
              para confirmar le gustaría eliminar permanentemente su cuenta.
            </p>

            <form className="formDelete" onSubmit={handleSubmit(deleteUser)}>
              <InputLabel>Contraseña</InputLabel>

              <InputText
                type="password"
                name="password"
                {...register("password")}
                onFocus={() => setErrorPass()}
              ></InputText>

              <InputText
                type="hidden"
                name="id"
                defaultValue={auth._id}
                {...register("id")}
              ></InputText>
              <br />
              <InputError
                message={errors.password ? errors.password?.message : error}
              ></InputError>

              <div className="btnModal">
                <BtnDelete>Eliminar cuenta</BtnDelete>
                <BtnCancel type="button" onClick={() => closeModal()}>
                  Cancelar
                </BtnCancel>
              </div>
            </form>
          </div>
        </Modal>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default ModalUserDelete;
