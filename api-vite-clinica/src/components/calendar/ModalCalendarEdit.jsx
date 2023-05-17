import React, { useEffect, useState } from "react";
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
import SelectPatient from "../patient/SelectPatient";

function ModalCalendarEdit({
  confirmModalEdit,
  setConfirmModalEdit,
  clinic,
  event,
  setEvent,
}) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventSelect, setEventSelect] = useState({});
  const [time, setTime] = useState("");

  useEffect(() => {
    setLoading(true);
    if (event !== null) {
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
      Global.url + "appointment/get-appointment/" + event,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setEventSelect(datos.appointment);
      changeTime(datos.appointment.date);
    }
  };

  const changeTime = (date) => {
    let time;
    let auxDate = new Date();

    if (date) {
      auxDate = new Date(date);
      time = auxDate.getHours() + ":" + auxDate.getMinutes();
      setTime(time);
      setLoading(false);
      console.log(time);
    }
  };

  const closeModal = () => {
    setSelectedValues([]);
    setEvent(null);
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
            <form className="formCreate" onSubmit={(e) => addTherapy(e)}>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <InputLabel>Patient</InputLabel>

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

                    {/* <SelectTherapyPatient
                  value={selectedValues}
                  onChange={handleSelectChange}
                  patient={patient}
                  name="therapy_has_patient"
                /> */}
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12">
                  <div className="separadorForm">
                    <InputLabel>User</InputLabel>

                    {!loading && (
                      <SelectUserClinic
                        clinic={clinic}
                        name="user"
                        defaultValue={eventSelect.id_user}
                      />
                    )}
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 timeMargin">
                  <div className="separadorForm">
                    <InputLabel>Time</InputLabel>
                    {!loading && (
                      <InputText
                        type="time"
                        name="time"
                        defaultValue={time}
                      ></InputText>
                    )}
                    {/* <InputError
                      message={errorTime !== "" ? errorTime : ""}
                    ></InputError> */}
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

export default ModalCalendarEdit;
