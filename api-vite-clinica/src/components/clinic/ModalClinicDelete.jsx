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
import useAuth from "../../hooks/useAuth";

function ModalClinicDelete({confirm, setConfirm, clinicId, clinics, setClinics}) {
  const [error, setError] = useState("");
  const {auth} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const deleteClinic = async (data) => {
    let clinic = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "clinic/delete-clinic/" + clinicId,
      "POST",
      clinic
    );

    if (datos.state == "success" && !cargando) {
      clinic = clinics.filter((u) => u._id !== clinicId);
      setClinics(clinic);
      closeModal();
      toast.success("Se ha eliminado la clinica correctamente");

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
            <h2>Are you sure you want to delete clinic?</h2>
            <p>
              Once your clinic is deleted, all of its resources and data will
              be permanently deleted. Please enter your password to confirm you
              would like to permanently delete your clnic.
            </p>

            <form className="formDelete" onSubmit={handleSubmit(deleteClinic)}>
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
              
              <InputError
                message={errors.password ? errors.password?.message : error}
              ></InputError>

              <div className="btnModal">
                <BtnDelete>Delete Clinic</BtnDelete>
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

export default ModalClinicDelete;
