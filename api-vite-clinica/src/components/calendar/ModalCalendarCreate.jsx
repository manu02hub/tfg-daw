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

function ModalCalendarCreate({
  confirmModalCreate,
  setConfirmModalCreate,
  clinic,
  toglleTab,
  date,
  events,
  setEvents,
  blockedDays,
  setBlockedDays,
}) {
  const [errorPatient, setErrorPatient] = useState("");
  const [errorTime, setErrorTime] = useState("");

  const [patient, setPatient] = useState({});
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
    let patientValue = e.target.patient.value;

    if (patientValue == "") {
      setErrorPatient("El campo no puede estar vacío");
    } else {
      const { datos, cargando } = await PeticionAJAX(
        Global.url + "patient/searchNIF/" + patientValue,
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
      dateDefault = dateDefault + "T" + time;

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
        therapy_has_patient(datos.appointment);
        // setAppointments([...appointments, datos.appointment]);

        closeModal();
      } else {
        setError(datos.message);
      }
    } else {
      setErrorTime("Seleccione la hora de la cita");
    }
  };

  const therapy_has_patient = async (appointments) => {
    let promises = [];
    let therapy;

    promises = appointments.id_therapy_has_patient.map(async (element) => {
      const { datos, cargando } = await PeticionAJAX(
        Global.url +
          "therapy_has_patient/get-therapy_has_patientById/" +
          element,
        "GET"
      );

      if (datos.state == "success" && !cargando) {
        therapy = datos.therapy_has_patient;
      }
    });

    const resolvedPromises = await Promise.all(promises);
    const therapies = resolvedPromises.filter((the) => the); // Filter out undefined values

    // setEvents(event);

    // setLoading(false);

    await createEvent(therapies, appointments);
  };

  const createEvent = async (thera, appointment) => {
    let newEvent = {
      id: appointment._id,
      title: patient.name + " " + patient.surnames,
      description: thera,
      date: appointment.date,
    };

    setEvents([...events, newEvent]);
  };

  const blockDay = async () => {
    let found;
    let blockDay;

    found = events.find((element) => {
      return element.date.split("T")[0] == date;
    });

    if (!found) {
      blockDay = {
        date: date,
        id_clinic: clinic,
      };

      const { datos, cargando } = await PeticionAJAX(
        Global.url + "dayBlocked/create-dayBlocked",
        "POST",
        blockDay
      );

      if (datos.state == "success" && !cargando) {
        setBlockedDays([...blockedDays, blockDay]);
        closeModal();
      }
    }
  };

  const closeModal = () => {
    setErrorPatient("");
    setErrorTime("");
    setSelectedValues([]);
    setPatient("");
    setConfirmModalCreate(false);
  };

  const clearError = () => {
    setErrorTime("");
  };

  return (
    <>
      {confirmModalCreate && (
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
                  patient={patient._id}
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

              <div className="btnModalAdd">
                <BtnPrimary className="btnsPrimary shadow">SAVE</BtnPrimary>
                <button
                  type="button"
                  className="btnBlock shadow"
                  onClick={() => blockDay()}
                >
                  Block day
                </button>
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
