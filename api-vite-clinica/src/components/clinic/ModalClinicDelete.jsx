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

function ModalClinicDelete({
  confirm,
  setConfirm,
  clinicId,
  clinics,
  setClinics,
}) {
  const [error, setError] = useState("");
  const { auth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const deleteClinic = async (data) => {
    let save;
    let clinic = data;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "clinic/delete-clinic/" + clinicId,
      "POST",
      clinic
    );

    if (datos.state == "success" && !cargando) {
      save = await activity(datos.clinic);

      if (save) {
        clinic = clinics.filter((u) => u._id !== clinicId);
        setClinics(clinic);
        closeModal();
        toast.success("Se ha eliminado la clinica correctamente");
      }
    } else {
      setError(datos.message);
    }
  };

  const activity = async (cli) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha eliminado la clínica " +
        cli.name,
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
            <h2>¿Está seguro de que quiere eliminar la clínica?</h2>
            <p>
              Una vez que se elimine su clínica, todos sus recursos y datos se
              eliminará permanentemente. Por favor, introduzca su contraseña
              para confirmar que le gustaría eliminar permanentemente su
              clínica.
            </p>

            <form className="formDelete" onSubmit={handleSubmit(deleteClinic)}>
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
                <BtnDelete>Eliminar Clínica</BtnDelete>
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

export default ModalClinicDelete;
