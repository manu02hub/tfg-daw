import React from "react";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import clinicImage from "../../assets/clinic.jpg";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import BtnsTable from "../BtnsTable";

function TableClinic() {
  const menuT = ["Clinic", "Direction", "City", "C Postal", "Actions"];

  return (
    <>
      <Table>
        <Thead menu={menuT} />
        <Tbody>
          <tr>
            <TdTable>
              <img src={clinicImage} width={50} />
              Tooth Sensation
            </TdTable>

            <TdTable>Calle Caja Magica</TdTable>

            <TdTable>Madrid</TdTable>

            <TdTable>28041</TdTable>

            <TdTable>
              <BtnsTable className={"editTable"}>
                <Link to={"clinic-edit"}>
                  <FiEdit />
                </Link>
              </BtnsTable>

              <BtnsTable className={"deleteTable"}>
                <MdDelete />
              </BtnsTable>
            </TdTable>
          </tr>
        </Tbody>
      </Table>
    </>
  );
}

export default TableClinic;
