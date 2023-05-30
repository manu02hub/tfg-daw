import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import { IoDocumentText } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import BtnsTable from "../BtnsTable";

function TableReferenceBill({ load, setLoad, idClinic }) {
  const menuT = ["Referencia", "Total", "Fecha", "Acciones"];
  const [billReferences, setBillReferences] = useState({});

  useEffect(() => {
    getBillReferences();
  }, []);

  const getBillReferences = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "billReference/get-billreferences/" + idClinic,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setBillReferences(datos.billreferences);
      setLoad(false);
    }
  };

  const changeDateFormat = (date) => {

    let dateFormat = new Date(date);
    dateFormat =
      dateFormat.getDate() +
      "-" +
      Number.parseInt(dateFormat.getMonth() + 1) +
      "-" +
      dateFormat.getFullYear();

    return dateFormat;
  };

  const deleteBillReference = async(id) => {

    let auxBill;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "billReference/delete-billreference/" + id,
      "DELETE"
    );

    if (datos.state == "success" && !cargando) {

      auxBill = billReferences.filter((bill) => bill._id !== id);

      setBillReferences(auxBill);
    }
  }

  return (
    <Table>
      <Thead menu={menuT} />
      <Tbody>
        {!load &&
          billReferences.map((bill) => {
            return (
              <tr key={bill._id}>
                <TdTable>{bill.reference}</TdTable>

                <TdTable className={"total"}>{bill.total}€</TdTable>

                <TdTable>{changeDateFormat(bill.date)}</TdTable>

                <TdTable>
                  <BtnsTable className={"showTable"}>
                    <Link to={"bill-show/" + bill.reference}>
                      <IoDocumentText size={15} />
                    </Link>
                  </BtnsTable>

                  <BtnsTable
                    className={"deleteTable"}
                    onClick={() => deleteBillReference(bill._id)}
                  >
                    <MdDelete />
                  </BtnsTable>
                </TdTable>
              </tr>
            );
          })}
      </Tbody>
    </Table>
  );
}

export default TableReferenceBill;
