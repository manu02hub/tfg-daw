import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import Modal from "../Modal";
import BtnPrimary from "../BtnPrimary";
import BtnCancel from "../BtnCancel";
import SelectUserClinic from "../user/SelectUserClinic";
import SelectTherapyPatient from "./SelectTherapyPatient";
import SelectPatient from "../patient/SelectPatient";

function ModalCalendarEdit({
  confirmModalEdit,
  setConfirmModalEdit,
  auth,
  event,
  setEvent,
  events,
  setEvents,
}) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventSelect, setEventSelect] = useState({});
  const [time, setTime] = useState("");

  useEffect(() => {
    setLoading(true);
    if (event.id) {
      getEvent();
    }
  }, [confirmModalEdit]);

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedValues(selectedOptions);
  };

  const getEvent = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "appointment/get-appointment/" + event.id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setEventSelect(datos.appointment);
      changeTime(datos.appointment.date);
    }
  };

  const changeTime = (date) => {
    let time;
    let hora;
    let auxDate = new Date();

    if (date) {
      auxDate = new Date(date);

      if (auxDate.getHours() < 10) {
        hora = "0" + auxDate.getHours();
      }else{
        hora = auxDate.getHours();
      }
      time = hora + ":" + auxDate.getMinutes();
      console.log(time);
      setTime(time);
      setLoading(false);
    }
  };

  const updateEvent = async (e) => {
    e.preventDefault();

    let indexTime;
    let auxTime;
    let dateDefault = new Date(event.startStr);
    let time = e.target.time.value;
    let id_user;
    let id_therapy_has_patient;
    let appointment;
    let updateEvent;

    if (selectedValues.length >= 1) {
      id_therapy_has_patient = selectedValues;
    } else {
      id_therapy_has_patient = eventSelect.id_therapy_has_patient;
    }

    id_user = e.target.user.value;
    auxTime = time.split(":");
    dateDefault.setHours(auxTime[0]);
    dateDefault.setMinutes(auxTime[1]);
    dateDefault = dateDefault.toISOString();

    appointment = {
      id_patient: e.target.patient.value,
      id_therapy_has_patient: id_therapy_has_patient,
      id_user: id_user,
      date: dateDefault,
    };

    updateEvent = {
      id: event.id,
      title: event.title,
      date: dateDefault,
    };

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "appointment/update-appointment/" + event.id,
      "PUT",
      appointment
    );

    if (datos.state == "success" && !cargando) {

      await activityUpdate(event);

      indexTime = events.findIndex((event) => event.id === updateEvent.id);
      auxTime = [...events];
      auxTime[indexTime] = updateEvent;
      setEvents(auxTime);

      closeModal();
    }
  };

  const deleteEvent = async (id) => {
    let auxEvents;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "appointment/delete-appointment/" + id,
      "DELETE"
    );

    if (datos.state == "success" && !cargando) {
      
      await activityDelete(event);

      auxEvents = events.filter((event) => event.id !== id);
      setEvents(auxEvents);

      closeModal();
    } else {
      setError(datos.message);
    }
  };

  const activityDelete = async (event) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha eliminado la cita al paciente " +
        event.title,
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

  const activityUpdate = async (event) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha editado la cita del paciente " +
        event.title,
      action: "Editar",
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
    setSelectedValues([]);
    setEvent({});
    setLoading(true);
    setConfirmModalEdit(false);
  };

  return (
    <>
      {confirmModalEdit && (
        <Modal show={confirm}>
          <div className="section-modal">
            <h2>Editar Cita</h2>
            <br />
            <form className="formCreate" onSubmit={(e) => updateEvent(e)}>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <InputLabel>Paciente</InputLabel>

                  {!loading && (
                    <SelectPatient
                      patient={eventSelect.id_patient}
                      name="patient"
                      defaultValue={event}
                    />
                  )}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="separadorForm">
                    <InputLabel>Tratamientos</InputLabel>

                    {!loading && (
                      <SelectTherapyPatient
                        onChange={handleSelectChange}
                        patient={eventSelect.id_patient}
                        name="therapy_has_patient"
                        value={eventSelect.id_therapy_has_patient}
                      />
                    )}
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12">
                  <div className="separadorForm">
                    <InputLabel>Profesional</InputLabel>

                    {!loading && (
                      <SelectUserClinic
                        clinic={auth.id_clinic}
                        name="user"
                        defaultValue={eventSelect.id_user}
                      />
                    )}
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 timeMargin">
                  <div className="separadorForm">
                    <InputLabel>Hora</InputLabel>
                    {!loading && (
                      <InputText
                        type="time"
                        name="time"
                        defaultValue={time}
                      ></InputText>
                    )}
                  </div>
                </div>
              </div>

              <div className="btnModalAdd">
                <button
                  type="button"
                  className="btnDelete shadow"
                  onClick={() => deleteEvent(event.id)}
                >
                  ELIMINAR
                </button>
                <BtnPrimary className="btnsEdit shadow">EDITAR</BtnPrimary>
                <BtnCancel type="button" onClick={() => closeModal()}>
                  CANCELAR
                </BtnCancel>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ModalCalendarEdit;
