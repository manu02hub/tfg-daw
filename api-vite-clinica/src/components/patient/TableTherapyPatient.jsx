import React, { useEffect, useState } from "react";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import BtnsTable from "../BtnsTable";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { BsFileEarmarkPdfFill } from "react-icons/bs";

function TableTherapyPatient({
  patientTherapies,
  setPatientTherapies,
  listTable,
  setListTable,
  price,
  setPrice,
}) {
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

    console.log(auxPatientTherapies);

    if (index === 0) {
      auxPrice = price.shift();
      console.log(auxPrice);

    } else {

      auxPrice = price.slice(index - 1, index);
      setPrice(auxPrice);
    }

    setListTable(auxList);
    setPatientTherapies(auxPatientTherapies);
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
                <BtnsTable className={"showTable btnTherapiesTeeth"}>
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
