import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
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
  patient,
  teeth,
  patientTherapies,
  setPatientTherapies,
  therapies,
  setTherapies,
  tooth,
  setTooth,
}) {
  const [list, setList] = useState([]);

  const getTherapy = async (id) => {
    let therapy;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy/get-therapy/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      therapy = datos.therapy;
    }

    return therapy;
  };

  const getTeeth = async (id) => {
    let teethGet;
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "tooth/get-teeth/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      teethGet = datos.teeth;
      // console.log(teethGet);
    }

    return teethGet;
  };

  const findTherapy = async (therapiesArr, id) => {
    let therapyGet;
    let i = 0;
    let find = false;

    if (therapiesArr.length < 1) {
      therapyGet = await getTherapy(id);
      setTherapies([...therapiesArr, therapyGet]);
    } else {
      do {
        if (therapiesArr[i]._id == id) {
          find = true;
        } else {
          i++;
        }
      } while (!find && i < therapiesArr.length);

      if (!find) {
        therapyGet = await getTherapy(id);
        setTherapies([...therapiesArr, therapyGet]);
      }
    }
  };

  const findTooth = async (toothArr, id) => {
    let teethGet;
    let i = 0;
    let find = false;

    if (toothArr.length < 1) {
      teethGet = await getTeeth(id);
      setTooth([...toothArr, teethGet]);
    } else {
      do {
        if (toothArr[i]._id == id) {
          find = true;
        } else {
          i++;
        }
      } while (!find && i < toothArr.length);

      if (!find) {
        teethGet = await getTeeth(id);
        setTooth([...toothArr, teethGet]);
      }
    }
  };

  const addTherapy = async (e) => {
    e.preventDefault();

    let auxTooth;
    let auxTherapies;
    let find;
    let i = 0;

    let id_patient = e.target.id_patient.value;
    let id_therapy = e.target.id_therapy.value;
    let id_teeth = teeth._id;
    let complete = false;

    let therapy_has_patient = {
      id_patient: id_patient,
      id_therapy: id_therapy,
      id_teeth: id_teeth,
      complete: complete,
    };

    await findTherapy(therapies, id_therapy);
    await findTooth(tooth, id_teeth);

    if (list.length == 0) {

      listTherapyTeeth = {
        therapiesTable: therapies,
        toothTable: tooth,
      };

      setList([...list, listTherapyTeeth]);

    } else {

      auxTooth = tooth.filter((t) => t._id == id_teeth);

      do {
        if (list[i].therapiesTable._id == id_therapy) {
          find = true;
          list[i].toothTable.push(auxTooth[0]);
        } else {
          i++;
        }
      } while (!find && i < list.length);

      if (!find) {

        auxTherapies = therapies.filter(
          (t) => t._id == id_therapy
        );

        listTherapyTeeth = {
          therapiesTable: auxTherapies[0],
          toothTable: auxTooth,
        };

        setList([...list, listTherapyTeeth]);
      }
    }

    setPatientTherapies([...patientTherapies, therapy_has_patient]);

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
