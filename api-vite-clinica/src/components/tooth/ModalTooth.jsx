import React, { useEffect, useState } from "react";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import Modal from "../Modal";
import BtnPrimary from "../BtnPrimary";
import BtnCancel from "../BtnCancel";
import SelectTherapy from "../therapie/SelectTherapy";
import SelectUserClinic from "../user/SelectUserClinic";

function ModalTooth({
  confirm,
  setConfirm,
  clinic,
  patient,
  teeth,
  patientTherapies,
  setPatientTherapies,
  users,
  setUsers,
  therapies,
  setTherapies,
  tooth,
  setTooth,
}) {

  const getTherapy = async (id) => {
    let therapy;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy/get-therapy/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      // setOdontogram(datos.odontogram);
      // getTeeth();
      therapy = datos.therapy;
    }

    return therapy;
  };

  const getUser = async (id) => {
    let user;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/get-user/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      // setOdontogram(datos.odontogram);
      // getTeeth();
      user = datos.user;
      setLoading(false);
    }

    return user;
  };

  const getTeeth = async (id) => {
    let teeth;
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "tooth/get-teeth/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      // setOdontogram(datos.odontogram);
      // getTeeth();
      teeth = datos.teeth;
    }

    return teeth;
  };


  const findUser = (users) =>{

    if(users.length < 1){

    }else{
      
    }
  }

  const findTherapies = (therapies) =>{

    if(therapies.length < 1){

    }else{
      
    }
  }


  const findTooth = (tooth) =>{

    if(tooth.length < 1){

    }else{
      
    }
  }


  const addTherapy = (e) => {
    e.preventDefault();

    let encontrado;
    let i = 0;

    let id_patient = e.target.id_patient.value;
    let id_therapy = e.target.id_therapy.value;
    let id_teeth = teeth._id;
    let id_user = e.target.id_user.value;
    let complete = false;

    let therapy_has_patient = {
      id_patient: id_patient,
      id_therapy: id_therapy,
      id_teeth: [id_teeth],
      id_user: id_user,
      complete: complete,
    };

    if (patientTherapies.length >= 1) {
      do {
        if (patientTherapies[i].id_therapy == id_therapy) {
          patientTherapies[i].id_teeth.push(id_teeth);
          encontrado = true;
        } else {
          i++;
        }
      } while (!encontrado && i < patientTherapies.length);

      if (!encontrado) {
        setPatientTherapies([...patientTherapies, therapy_has_patient]);
      }
    } else {
      setPatientTherapies([...patientTherapies, therapy_has_patient]);
    }

    closeModal();
  };

  const closeModal = () => {
    setConfirm(false);
  };

  return (
    <>
      {confirm && (
        <Modal show={confirm}>
          <div className="section-modal">
            <h2>Añadir Tratamiento</h2>
            <br />

            <form className="formCreate" onSubmit={(e) => addTherapy(e)}>
              <InputLabel>Pieza</InputLabel>

              <select name="id_teeth">
                <option value={teeth._id}>{teeth.number + teeth.letter}</option>
              </select>

              <div className="separadorForm">
                <InputLabel>Terapia</InputLabel>
                <SelectTherapy name="id_therapy" />
              </div>

              <div className="separadorForm">
                <InputLabel>Clinico</InputLabel>
                <SelectUserClinic clinic={clinic} name={"id_user"} />
              </div>

              <InputText
                type="hidden"
                defaultValue={patient}
                name={"id_patient"}
              ></InputText>

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

export default ModalTooth;
