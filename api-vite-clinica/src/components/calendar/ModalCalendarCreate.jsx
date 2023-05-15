import React, { useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import Modal from "../Modal";
import BtnPrimary from "../BtnPrimary";
import BtnCancel from "../BtnCancel";
import InputError from "../InputError";
import SelectTherapy from "../therapie/SelectTherapy";
import SelectUserClinic from "../user/SelectUserClinic";
import SelectTherapyPatient from "./SelectTherapyPatient";

function ModalCalendarCreate({ confirm, setConfirm, clinic }) {

  const [error, setError] = useState("");
  const [patient, setPatient] = useState(0);

  const checkPatient = async (e) => {
    let patient = e.target.value;

    if (patient == "") {
      setError("El campo no puede estar vacío");
    } else {
      const { datos, cargando } = await PeticionAJAX(
        Global.url + "patient/searchNIF/" + patient,
        "GET"
      );

      if (datos.state == "success" && !cargando) {
        setPatient(datos.patient);
      } else {
        setError(datos.message);
      }
    }
  };

  const closeModal = () => {
    setError("");
    setConfirm(false);
  };


  const clearError = () =>{
    setError("");
  }

  return (
    <>
      {confirm && (
        <Modal show={confirm}>
          <div className="section-modal">
            <h2>Añadir Cita</h2>
            <br />

            <form className="formCreate" onSubmit={(e) => addTherapy(e)}>
              <div className="row">
                <div className="col-lg-8 col-md-12 col-sm-12">
                  <InputLabel>
                    Numero de Telefono o Correo del Paciente
                  </InputLabel>
                  <InputText
                    type="text"
                    name="patient"
                    onBlur={(e) => {
                      checkPatient(e);
                    }}
                    onFocus={() =>clearError()}
                  ></InputText>
                   <InputError message={error !== "" ? error : ""}></InputError>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <InputLabel>Time</InputLabel>
                  <InputText type="time" ></InputText>
                </div>
              </div>

              <div className="separadorForm">
                <InputLabel>Tratamientos</InputLabel>

                <SelectTherapyPatient patient={patient}/>
              </div>

              <div className="separadorForm">
                <InputLabel>User</InputLabel>
                <SelectUserClinic clinic={clinic} />
              </div>

              {/* <InputText
                type="hidden"
                // defaultValue={patient}
                name={"id_patient"}
              ></InputText> */}

              <div className="btnModalAdd">
                <BtnPrimary className="shadow">SAVE</BtnPrimary>
                <BtnCancel type="button" onClick={() => closeModal()}>
                  Cancel
                </BtnCancel>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ModalCalendarCreate;
