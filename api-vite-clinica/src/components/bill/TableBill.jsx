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
import SelectPay from "./SelectPay";

function TableBill({ load, setLoad, reference, auth }) {
  const [bills, setBills] = useState({});

  const menuT = [
    "Cliente",
    "Nif Cliente",
    "Pieza",
    "Tratamiento",
    "Precio",
    "Iva",
    "Descuento",
    "Numero Factura",
    "Fecha Pago",
    "Pagado",
    "Acciones",
  ];

  useEffect(() => {
    getBills();
  }, []);

  const onChangePay = async (e, id) => {
    let auxBill;
    let position;
    let billUpdate;
    let billData;
    let save = false;
    let date;
    let select = e.target.value;

    if (!select) {
      date = "";
    } else {
      date = new Date();
    }

    billData = {
      is_pay: select,
      pay_day: date,
    };

    save = await updateBill(id, billData);

    if (save) {
      position = bills.findIndex((bill) => {
        return bill._id == id;
      });

      billUpdate = bills.find((bill) => {
        return bill._id == id;
      });

      billUpdate.pay_day = date;
      billUpdate.is_pay = select;

      auxBill = [...bills];

      auxBill[position] = billUpdate;

      setBills(auxBill);
    }
  };

  const getBills = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "bill/get-bills/" + reference,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setBills(datos.bills);
      setLoad(false);
    }
  };

  const updateBill = async (idBill, bill) => {
    let save = false;
    let complete;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "bill/update-bill/" + idBill,
      "PUT",
      bill
    );

    if (datos.state == "success" && !cargando) {
      complete = await activityUpdate(datos.bill);

      if (complete) {
        save = true;
      }
    }

    return save;
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

  const deleteClick = async (id, reference) => {
    let auxBill;
    let updateReference;
    let total;
    let complete = await deleteBill(id);

    auxBill = bills.filter((bill) => bill._id !== id);

    setBills(auxBill);
    total = getTotal(auxBill);

    if (complete) {
      await activityDelete(reference);

      updateReference = {
        total: total,
      };

      await updateBillReference(reference, updateReference);
    }
  };

  const deleteBill = async (idBill) => {
    let save = false;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "bill/delete-bill/" + idBill,
      "DELETE"
    );

    if (datos.state == "success" && !cargando) {
      save = true;
    }

    return save;
  };

  const updateBillReference = async (ref, obj) => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "billreference/update-billreference/" + ref,
      "PUT",
      obj
    );
  };

  const activityDelete = async (ref) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha eliminado la factura " +
        ref,
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

  const activityUpdate = async (bill) => {
    let save = false;

    let activity = {
      message:
        "El usuario con correo " +
        auth.email +
        " ha editado la factura " +
        bill.number_bill,
      action: "Editar",
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

  const getTotal = (bill) => {
    let total = 0;

    bill.map((b) => {
      total = total + b.price;
    });

    return total;
  };

  return (
    <>
      <Table>
        <Thead menu={menuT} />
        <Tbody>
          {!load &&
            bills.map((bill, index) => {
              return (
                <tr key={bill._id}>
                  <TdTable>{bill.patient}</TdTable>

                  <TdTable>{bill.nif_patient}</TdTable>

                  <TdTable>{bill.tooth}</TdTable>

                  <TdTable>{bill.therapy}</TdTable>

                  <TdTable>{bill.price}</TdTable>

                  <TdTable>{bill.IVA}</TdTable>

                  <TdTable>{bill.discount}</TdTable>

                  <TdTable>{bill.number_bill}</TdTable>

                  <TdTable>
                    {bill.pay_day ? changeDateFormat(bill.pay_day) : ""}
                  </TdTable>

                  <TdTable className={"selectTable"}>
                    <SelectPay
                      defaultValue={bill.is_pay}
                      onChange={(e) => onChangePay(e, bill._id)}
                    />
                  </TdTable>

                  <TdTable>
                    <BtnsTable
                      className={"deleteTable"}
                      onClick={() => deleteClick(bill._id, bill.number_bill)}
                    >
                      <MdDelete />
                    </BtnsTable>
                  </TdTable>
                </tr>
              );
            })}
        </Tbody>
      </Table>
      {!load && bills.length < 1 && (
        <div className="notFindSection">
          <p>No hay facturas con este número de referencia</p>
        </div>
      )}
    </>
  );
}

export default React.memo(TableBill);
