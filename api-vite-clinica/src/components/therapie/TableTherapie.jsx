import React from "react";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import BtnsTable from "../BtnsTable";

function TableTherapie() {
  const menuT = ["Therapie", "Precio", "Descuento", "Actions"];
  return (
    <>
      <Table>
        <Thead menu={menuT} />
        <Tbody>
          <tr>
            <TdTable>Empaste</TdTable>

            <TdTable>50$</TdTable>

            <TdTable>20%</TdTable>

            <TdTable>
              <BtnsTable className={"editTable"}>
                <Link to={"therapie-edit"}>
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

export default TableTherapie;
