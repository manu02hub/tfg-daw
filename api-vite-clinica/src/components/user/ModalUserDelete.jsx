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
    let usuarios = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/delete-user/" + user._id,
      "POST",
      usuarios
    );

    if (datos.state == "success" && !cargando) {
      if (users) {
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
            <h2>Are you sure you want to delete your account?</h2>
            <p>
              Once your account is deleted, all of its resources and data will
              be permanently deleted. Please enter your password to confirm you
              would like to permanently delete your account.
            </p>

            <form className="formDelete" onSubmit={handleSubmit(deleteUser)}>
              <InputLabel>Password</InputLabel>

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
                <BtnDelete>Delete Account</BtnDelete>
                <BtnCancel type="button" onClick={() => closeModal()}>
                  Cancel
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
