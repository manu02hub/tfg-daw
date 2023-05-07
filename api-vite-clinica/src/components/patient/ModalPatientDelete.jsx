import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import toast, { Toaster } from "react-hot-toast";
import InputLabel from "../InputLabel";
import InputText from "../InputText";
import InputError from "../InputError";
import Modal from "../Modal";
import BtnDelete from "../BtnDelete";
import BtnCancel from "../BtnCancel";
import useAuth from "../../hooks/useAuth";

function ModalPatientDelete({confirm, setConfirm, patientId, patients, setPatients}) {
  const [error, setError] = useState("");
  const {auth} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const deletePatient = async (data) => {
    let patient = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/delete-patient/" + patientId,
      "POST",
      patient
    );

    if (datos.state == "success" && !cargando) {
      patient = patients.filter((u) => u._id !== patientId);
      setPatients(patient);
      closeModal();
      toast.success("Se ha eliminado el paciente correctamente");

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

            <form className="formDelete" onSubmit={handleSubmit(deletePatient)}>
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

export default ModalPatientDelete;