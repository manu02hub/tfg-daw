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
import { FiSearch } from "react-icons/fi";

function ModalCalendarCreate({ confirm, setConfirm, clinic, toglleTab, date, appointments, setAppointments }) {
  const [errorPatient, setErrorPatient] = useState("");
  const [errorTime, setErrorTime] = useState("");

  const [patient, setPatient] = useState(0);
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedValues(selectedOptions);
  };

  const checkPatient = async (e) => {
    e.preventDefault();
    let patient = e.target.patient.value;

    if (patient == "") {
      setErrorPatient("El campo no puede estar vacío");
    } else {
      const { datos, cargando } = await PeticionAJAX(
        Global.url + "patient/searchNIF/" + patient,
        "GET"
      );

      if (datos.state == "success" && !cargando) {
        setPatient(datos.patient);
      } else {
        setErrorPatient(datos.message);
      }
    }
  };

  const addTherapy = async (e) => {
    e.preventDefault();

    let dateDefault = new Date();
    let time = e.target.time.value;
    let id_user;
    let id_therapy_has_patient;
    let id_cabinet;
    let appointment;

    if (time !== "") {
      id_user = e.target.user.value;
      id_therapy_has_patient = selectedValues;
      id_cabinet = toglleTab;
      dateDefault = date;
      dateDefault = dateDefault+"T"+time;

      appointment = {
        id_patient: patient,
        id_therapy_has_patient: id_therapy_has_patient,
        id_user: id_user,
        id_cabinet: id_cabinet,
        date: dateDefault,
      };

      const { datos, cargando } = await PeticionAJAX(
        Global.url + "appointment/create-appointment",
        "POST",
        appointment
      );

      if (datos.state == "success" && !cargando) {
        setAppointments([...appointments, datos.appointment]);
        closeModal();
      } else {
        setError(datos.message);
      }
    } else {
      setErrorTime("Seleccione la hora de la cita");
    }
  };

  const closeModal = () => {
    setErrorPatient("");
    setErrorTime("");
    setSelectedValues([]);
    setPatient("");
    setConfirm(false);
  };

  const clearError = () => {
    setErrorTime("");
  };

  return (
    <>
      {confirm && (
        <Modal show={confirm}>
          <div className="section-modal">
            <h2>Añadir Cita</h2>
            <br />
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <form className="formCreate" onSubmit={(e) => checkPatient(e)}>
                  <InputLabel>
                    Numero de Telefono o Correo del Paciente
                  </InputLabel>

                  <div className="boxSearchPatient">
                    <InputText
                      type="text"
                      name="patient"
                      // onBlur={(e) => {
                      // checkPatient(e);
                      // }}
                      // onFocus={() => clearError()}
                    ></InputText>
                    <BtnPrimary>
                      <FiSearch size={17} />
                    </BtnPrimary>
                  </div>
                </form>

                <InputError
                  message={errorPatient !== "" ? errorPatient : ""}
                ></InputError>
              </div>
            </div>

            <form className="formCreate" onSubmit={(e) => addTherapy(e)}>
              <div className="separadorForm">
                <InputLabel>Tratamientos</InputLabel>

                <SelectTherapyPatient
                  value={selectedValues}
                  onChange={handleSelectChange}
                  patient={patient}
                  name="therapy_has_patient"
                />
              </div>
              <div className="row">
                <div className="col-lg-8 col-md-12 col-sm-12">
                  <div className="separadorForm">
                    <InputLabel>User</InputLabel>
                    <SelectUserClinic clinic={clinic} name="user" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 timeMargin">
                  <div className="separadorForm">
                    <InputLabel>Time</InputLabel>
                    <InputText
                      type="time"
                      name="time"
                      onFocus={() => clearError()}
                    ></InputText>
                    <InputError
                      message={errorTime !== "" ? errorTime : ""}
                    ></InputError>
                  </div>
                </div>
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
