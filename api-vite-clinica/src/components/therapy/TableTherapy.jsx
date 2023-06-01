import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import BtnsTable from "../BtnsTable";
// import ModalClinicDelete from "./ModalClinicDelete";

function TableTherapy({ load, setLoad, therapies, setTherapies, auth }) {
  const [idClinic, setIdClinic] = useState(0);
  const [confirmingClinicDeletion, setConfirmingClinicDeletion] =
    useState(false);

  const menuT = ["Tratamiento", "Precio", "Descuento", "Total", "Acciones"];

  useEffect(() => {
    getTherapies();
  }, []);

  const getTherapies = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy/all-therapies",
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setTherapies(datos.therapies);

      setLoad(false);
    }
  };

  const totalPrice = (price, discount) => {
    let total;

    total = price - price * (discount / 100);

    return total;
  };

  const deleteTherapy = async(id)  =>{

    let auxTherapies;
    let save;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy/delete-therapy/"+id,
      "DELETE"
    );

    if (datos.state == "success" && !cargando) {

      save = await activity(datos.therapy);

      if(save){
        auxTherapies = therapies.filter(thera => thera._id !== id);

        setTherapies(auxTherapies);
      }

    }
  };

  const activity = async (therapy) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha eliminado el tratamiento con nombre " +
        therapy.name,
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

  const confirmClinicDeletion = (id) => {
    setConfirmingClinicDeletion(true);
  };

  return (
    <>
      <Table>
        <Thead menu={menuT} />
        <Tbody>
          {!load &&
            therapies.map((therapy) => {
              return (
                <tr key={therapy._id}>
                  <TdTable>{therapy.name}</TdTable>

                  <TdTable>{therapy.price}€</TdTable>

                  <TdTable>{therapy.discount}%</TdTable>

                  <TdTable className={"total"}>
                    {totalPrice(therapy.price, therapy.discount)} €
                  </TdTable>

                  <TdTable>
                    <BtnsTable className={"editTable"}>
                      <Link to={"therapie-edit/" + therapy._id}>
                        <FiEdit />
                      </Link>
                    </BtnsTable>

                    <BtnsTable className={"deleteTable"} onClick={()=> deleteTherapy(therapy._id)}>
                      <MdDelete />
                    </BtnsTable>
                  </TdTable>
                </tr>
              );
            })}
        </Tbody>
      </Table>
      {!load && therapies.length < 1 && (
        <div className="notFindSection">
          <p>No existen tratamientos</p>
        </div>
      )}
    </>
  );
}

export default React.memo(TableTherapy);
