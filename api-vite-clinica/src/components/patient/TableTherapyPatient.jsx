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
        navigate("/panel/patients");
      }
    });
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
