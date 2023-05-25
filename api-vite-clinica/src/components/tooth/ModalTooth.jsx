import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import Modal from "../Modal";
import BtnPrimary from "../BtnPrimary";
import BtnCancel from "../BtnCancel";
import SelectTherapy from "../therapy/SelectTherapy";
import SelectUserClinic from "../user/SelectUserClinic";

function ModalTooth({
  confirm,
  setConfirm,
  patient,
  teeth,
  patientTherapies,
  setPatientTherapies,
  listTable,
  setListTable,
  price,
  setPrice,
}) {
  const [therapies, setTherapies] = useState([]);
  const [tooth, setTooth] = useState([]);

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
    let auxTherapy;
    let priceTherapy;
    let discount;
    let listTherapyTeeth;
    let find;
    let i = 0;
    let auxPrice;

    let id_patient = e.target.id_patient.value;
    let id_therapy = e.target.id_therapy.value;
    let id_tooth = teeth._id;
    let complete = false;

    let therapy_has_patient = {
      id_patient: id_patient,
      id_therapy: id_therapy,
      id_tooth: id_tooth,
      complete: complete,
    };

    // await findTherapy(therapies, id_therapy);
    // await findTooth(tooth, id_teeth);

    //Si la lista es 0
    if (listTable.length == 0) {
      //Recogemos la terapia y la pieza dental de la base de datos con los ids recogidos del form
      auxTherapy = await getTherapy(id_therapy);
      auxTooth = await getTeeth(id_tooth);

      //Lo almacenamos en un objeto
      listTherapyTeeth = {
        therapiesTable: auxTherapy,
        toothTable: [auxTooth],
      };

      //Calculamos el precio de la terapia por una pieza
      discount = auxTherapy.discount;
      priceTherapy = auxTherapy.price - auxTherapy.price * (discount / 100);

      //Seteamos los arrays
      setListTable([...listTable, listTherapyTeeth]);
      setPrice([...price, priceTherapy]);

      // En caso de que el array tenga datos
    } else {

      //Recogemos la nueva pieza
      auxTooth = await getTeeth(id_tooth);
      //Variable auxiliar donde guardamos el array de precios de las terapias* piezas
      auxPrice = price;

      do {
        //si el tratamiento existe añadimos la nueva pieza
        if (listTable[i].therapiesTable._id == id_therapy) {
          find = true;
          //Recogemos el descuento
          discount = listTable[i].therapiesTable.discount;

          //Calculamos el precio
          priceTherapy =
            listTable[i].therapiesTable.price -
            listTable[i].therapiesTable.price * (discount / 100);
            //Añadimos la pieza nueva
          listTable[i].toothTable.push(auxTooth);

          //Seteamos el precio por elnumero de piezas
          auxPrice[i] = priceTherapy * listTable[i].toothTable.length;

          //Seteamos la variable
          setPrice(auxPrice);
        } else {
          i++;
        }
      } while (!find && i < listTable.length);

      //Si no encuentra la terapia
      if (!find) {

        //Recogemos de la bd la nueva terapia
        auxTherapy = await getTherapy(id_therapy);

        //Creamos nuevo objeto
        listTherapyTeeth = {
          therapiesTable: auxTherapy,
          toothTable: [auxTooth],
        };

        //Recogemos el descuento y calculamos el precio
        discount = auxTherapy.discount;
        priceTherapy = auxTherapy.price - auxTherapy.price * (discount / 100);

        //Seteamos variables
        setListTable([...listTable, listTherapyTeeth]);
        setPrice([...price, priceTherapy]);
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
                <InputLabel>Tratamiento</InputLabel>
                <SelectTherapy name="id_therapy" />
              </div>

              <InputText
                type="hidden"
                defaultValue={patient}
                name={"id_patient"}
              ></InputText>

              <div className="btnModalAdd">
                <BtnPrimary className="btnsPrimary shadow">GUARDAR</BtnPrimary>
                <BtnCancel type="button" onClick={() => closeModal()}>
                  Cancelar
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
