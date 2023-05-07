import React from "react";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import BtnsTable from "../BtnsTable";
import { MdDelete } from "react-icons/md";

function TableTherapyPatient() {
  const menuT = ["Tratamiento", "Pieza", "Profesional", "Precio", "Acciones"];

  return (
    <>
      <Table>
        <Thead menu={menuT} />

        <Tbody>
          <tr>
            <TdTable>Empaste</TdTable>

            <TdTable> 18a</TdTable>

            <TdTable>Sergio Hervás Aragón</TdTable>

            <TdTable>50 €</TdTable>

            <TdTable>
              <BtnsTable className={"deleteTable"}>
                <MdDelete />
              </BtnsTable>
            </TdTable>
          </tr>
          <tr>
            <TdTable></TdTable>

            <TdTable> </TdTable>

            <TdTable></TdTable>

            <TdTable>100 €</TdTable>

            <TdTable>
            <BtnsTable className={"showTable"}>
            <MdDelete />
              </BtnsTable>
            </TdTable>
          </tr>
        </Tbody>
      </Table>
    </>
  );
}

export default TableTherapyPatient;
