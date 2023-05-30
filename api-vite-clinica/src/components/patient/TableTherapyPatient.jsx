import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import BtnsTable from "../BtnsTable";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import TherapyPatient from "../../pages/patients/TherapyPatient";

function TableTherapyPatient({
  patientTherapies,
  setPatientTherapies,
  listTable,
  setListTable,
  price,
  setPrice,
  idPatient,
  idClinic,
}) {
  const navigate = useNavigate();

  const menuT = [
    "Pieza",
    "Tratamiento",
    "Precio",
    "Descuento",
    "Total",
    "Acciones",
  ];

  useEffect(() => {
    calcTotal();
  }, [price]);

  const calcTotal = () => {
    let total = 0;

    price.forEach((element) => {
      total = total + element;
    });

    return total;
  };

  const deleteTherapy = (id, index) => {
    let auxList;
    let auxPatientTherapies;
    let auxPrice;

    auxList = listTable.filter((lt) => {
      return lt.therapiesTable._id !== id;
    });

    auxPatientTherapies = patientTherapies.filter((pt) => {
      return pt.id_therapy !== id;
    });

    if (index === 0) {
      auxPrice = price.shift();
    } else {
      auxPrice = price.slice(index - 1, index);
      setPrice(auxPrice);
    }

    setListTable(auxList);
    setPatientTherapies(auxPatientTherapies);
  };

  const saveTherapiesPatient = async () => {
    let patient = await getPatient();
    let billRef = await createBillReference();

    patientTherapies.forEach(async (element, index) => {
      const { datos, cargando } = await PeticionAJAX(
        Global.url + "therapy_has_patient/create-therapy_has_patient",
        "POST",
        element
      );
      if (
        datos.state == "success" &&
        !cargando &&
        index == patientTherapies.length - 1
      ) {
        createBill(datos.therapy_has_patient, billRef, patient);
        navigate("/panel/patients");
      } else if (
        datos.state == "success" &&
        !cargando &&
        index !== patientTherapies.length - 1
      ) {
        createBill(datos.therapy_has_patient, billRef, patient);
      }
    });
  };

  const createBillReference = async () => {
    let save = false;

    let billreference = {
      reference: 1,
      total: calcTotal(),
      id_patient: idPatient,
      id_clinic: idClinic,
    };

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "billreference/create-billreference",
      "POST",
      billreference
    );

    if (datos.state == "success" && !cargando) {
      save = true;
      billreference = datos.billreference;
    }

    if (save) {
      return billreference;
    }
  };

  const createBill = async (data, ref, pa) => {
    let diente;
    let precio;
    let descuento;
    let tratamiento;
    let bill;

    let i = 0;
    let j = 0;
    let findT = false;
    let findTe = false;

    do {
      if (listTable[i].therapiesTable._id == data.id_therapy) {
        tratamiento = listTable[i].therapiesTable.name;
        precio = listTable[i].therapiesTable.price;
        descuento = listTable[i].therapiesTable.discount;
        findT = true;
      } else {
        i++;
      }
    } while (i < listTable.length && !findT);

    do {
      if (listTable[i].toothTable[j]._id == data.id_tooth) {
        diente =
          listTable[i].toothTable[j].number +
          "" +
          listTable[i].toothTable[j].letter;

        findTe = true;
      } else {
        j++;
      }
    } while (j < listTable.length && !findTe);

    bill = {
      patient: pa.name + " " + pa.surnames,
      nif_patient: pa.nif,
      tooth: diente,
      therapy: tratamiento,
      price: precio,
      discount: descuento,
      number_bill: ref.reference,
      id_therapy_has_patient: data._id,
    };

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "bill/create-bill",
      "POST",
      bill
    );
    if (datos.state == "success" && !cargando) {
    }
  };

  const getPatient = async () => {
    let patient;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/get-patient/" + idPatient,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      patient = datos.patient;
    }

    return patient;
  };

  return (
    <>
      <Table>
        <Thead menu={menuT} />

        <Tbody>
          {listTable.length >= 1 &&
            listTable.map((therapy, index) => {
              return (
                <tr key={index}>
                  <TdTable>
                    {therapy.toothTable.map((teeth) => {
                      return teeth.number + "" + teeth.letter + " ";
                    })}
                  </TdTable>

                  <TdTable>{therapy.therapiesTable.name}</TdTable>

                  <TdTable>{therapy.therapiesTable.price}</TdTable>

                  <TdTable> {therapy.therapiesTable.discount} </TdTable>

                  <TdTable>{price[index]}</TdTable>

                  <TdTable>
                    <BtnsTable
                      className={"deleteTable btnTherapiesTeeth"}
                      onClick={() =>
                        deleteTherapy(therapy.therapiesTable._id, index)
                      }
                    >
                      <MdDelete />
                    </BtnsTable>
                  </TdTable>
                </tr>
              );
            })}

          {listTable.length >= 1 && (
            <tr>
              <TdTable></TdTable>

              <TdTable> </TdTable>

              <TdTable> </TdTable>

              <TdTable> </TdTable>

              <TdTable>{calcTotal()}</TdTable>

              <TdTable>
                <BtnsTable
                  className={"showTable btnTherapiesTeeth"}
                  onClick={() => saveTherapiesPatient()}
                >
                  <FaSave />
                </BtnsTable>
                <BtnsTable className={"pdf btnTherapiesTeeth"}>
                  <BsFileEarmarkPdfFill />
                </BtnsTable>
              </TdTable>
            </tr>
          )}
        </Tbody>
      </Table>
    </>
  );
}

export default TableTherapyPatient;
