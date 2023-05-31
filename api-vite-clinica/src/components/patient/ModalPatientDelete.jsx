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
    let save;
    let patient = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/delete-patient/" + patientId,
      "POST",
      patient
    );

    if (datos.state == "success" && !cargando) {
      patient = patients.filter((u) => u._id !== patientId);
      setPatients(patient);
      save = await activity(datos.patient);
      if(save){
        toast.success("Se ha eliminado el paciente correctamente");
      }
      closeModal();

    } else {
      setError(datos.message);
    }
  };

  const activity = async (use) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha eliminado al usuario con nif " +
        use.nif,
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
            <h2>¿Seguro que quieres eliminar al paciente?</h2>
            <p>
            Una vez que se elimine al paciente, todos sus recursos y datos
              se eliminará permanentemente. Por favor, introduzca su contraseña para confirmar que
              le gustaría eliminar permanentemente su paciente.
            </p>

            <form className="formDelete" onSubmit={handleSubmit(deletePatient)}>
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
              
              <InputError
                message={errors.password ? errors.password?.message : error}
              ></InputError>

              <div className="btnModal">
                <BtnDelete>Eliminar Paciente</BtnDelete>
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

export default ModalPatientDelete;
