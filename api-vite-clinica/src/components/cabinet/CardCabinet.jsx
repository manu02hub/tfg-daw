import React from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import CardBasic from "../CardBasic";
import BtnsTable from "../BtnsTable";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaCalendarDay } from "react-icons/fa";

function CardCabinet({ cabinet, cabinets, setCabinets, auth }) {
  const deleteCabinet = async (id) => {
    let auxCabinet;
    let save;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "cabinet/delete-cabinet/" + id,
      "DELETE"
    );

    if (datos.state == "success" && !cargando) {

      save = await activity(datos.cabinet);

      if(save){
        auxCabinet = cabinets.filter((cabi) => cabi._id !== id);

        setCabinets(auxCabinet);
      }
    }
  };

  const activity = async (cab) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha eliminado el gabinete " +
        cab.reference,
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

  return (
    <>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <CardBasic className="boxCabinet">
          <div className="boxCardCabinet">
            <div className="dataCabinet">
              <p>Referencia</p>
              <span>{cabinet.reference}</span>
            </div>
            <div className="btnsCardCabinet">
              <BtnsTable className={"editTable"}>
                <Link to={"cabinet-edit/" + cabinet._id}>
                  <FiEdit />
                </Link>
              </BtnsTable>

              <BtnsTable
                className={"deleteTable"}
                onClick={() => deleteCabinet(cabinet._id)}
              >
                <MdDelete />
              </BtnsTable>

              <BtnsTable className={"appointmentsTable"}>
                <Link to={"cabinet-appointments/" + cabinet._id}>
                  <FaCalendarDay />
                </Link>
              </BtnsTable>
            </div>
          </div>
        </CardBasic>
      </div>
    </>
  );
}

export default CardCabinet;
