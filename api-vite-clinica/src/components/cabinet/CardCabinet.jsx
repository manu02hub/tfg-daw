import React from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import CardBasic from "../CardBasic";
import BtnsTable from "../BtnsTable";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaCalendarDay } from "react-icons/fa";

function CardCabinet({ cabinet, cabinets, setCabinets }) {
  const deleteCabinet = async (id) => {
    let auxCabinet;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "cabinet/delete-cabinet/" + id,
      "DELETE"
    );

    if (datos.state == "success" && !cargando) {
      auxCabinet = cabinets.filter((cabi) => cabi._id !== id);

      setCabinets(auxCabinet);
    }
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
            <div className="dataCabinet">
              <p>Nº de citas de hoy</p>
              <span>
                {" "}
                <FaCalendarDay size={12} /> 15
              </span>
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
            </div>
          </div>
        </CardBasic>
      </div>
    </>
  );
}

export default CardCabinet;
