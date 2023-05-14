import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import BtnsTable from "../BtnsTable";
import { MdDelete } from "react-icons/md";

function TableTherapyPatient({ patientTherapies, therapies, tooth }) {
  const menuT = [
    "Pieza",
    "Tratamiento",
    "Precio",
    "Descuento",
    "Total",
    "Acciones",
  ];

  const [list, setList] = useState([]);
  const [priceTherapy, setPriceTherapy] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    listTherapyPrice();
    priceByTherapy();
    console.log("aaa");
    // totalTherapies();
  }, [patientTherapies]);

  const listTherapyPrice = () => {
    let size;
    var auxTherapies;
    var auxTooth;
    let listTherapyTeeth;
    let find = false;
    let i = 0;

    if (patientTherapies.length != 0) {
      if (patientTherapies.length == 1) {
        listTherapyTeeth = {
          therapiesTable: therapies[0],
          toothTable: tooth,
        };

        setList([...list, listTherapyTeeth]);
      } else {
        size = patientTherapies.length - 1;

        auxTooth = tooth.filter(
          (t) => t._id == patientTherapies[size].id_teeth
        );

        do {
          if (patientTherapies[size].id_therapy == list[i].therapiesTable._id) {
            find = true;
            list[i].toothTable.push(auxTooth[0]);
          } else {
            i++;
          }
        } while (!find && i < list.length);

        if (!find) {
          auxTherapies = therapies.filter(
            (t) => t._id == patientTherapies[size].id_therapy
          );

          listTherapyTeeth = {
            therapiesTable: auxTherapies[0],
            toothTable: auxTooth,
          };

          setList([...list, listTherapyTeeth]);
        }
      }
    }
  };

  const priceByTherapy = () => {
    let price = 0;
    let discount = 0;
    let teeth = 0;
    let priceTotal = 0;

    if (list.length >= 1) {
      list.forEach((element) => {
        price = element.therapiesTable.price;
        discount = element.therapiesTable.discount;
        teeth = element.toothTable.length;
        priceTotal = (price - price * (discount / 100)) * teeth;
      });
    }
  };

  return (
    <>
      {/* <Table>
        <Thead menu={menuT} />

        <Tbody>
          {list.length >= 1 &&
            list.map((therapy, index) => {
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

                  <TdTable></TdTable>

                  <TdTable>
                    <BtnsTable className={"deleteTable"}>
                      <MdDelete />
                    </BtnsTable>
                  </TdTable>
                </tr>
              );
            })}

          <tr>
            <TdTable></TdTable>

            <TdTable> </TdTable>

            <TdTable> </TdTable>

            <TdTable> </TdTable>

            <TdTable>{total} €</TdTable>

            <TdTable>
              <BtnsTable className={"showTable"}>
                <MdDelete />
              </BtnsTable>
            </TdTable>
          </tr>
        </Tbody>
      </Table> */}

      <Table>
        <Thead menu={menuT} />

        <Tbody>
          {patientTherapies.length >= 1 &&
            patientTherapies.map((therapy, index) => {
              return (
                <tr key={index}>
                  <TdTable>
                    {/* {therapy.toothTable.map((teeth) => {
                      return teeth.number + "" + teeth.letter + " ";
                    })} */}
                    {therapy.id_teeth}
                  </TdTable>

                  <TdTable>{therapy.id_therapy}</TdTable>

                  {/* <TdTable>{therapy.therapiesTable.price}</TdTable>

                  <TdTable> {therapy.therapiesTable.discount} </TdTable> */}

                  <TdTable></TdTable>

                  <TdTable>
                    <BtnsTable className={"deleteTable"}>
                      <MdDelete />
                    </BtnsTable>
                  </TdTable>
                </tr>
              );
            })}

          <tr>
            <TdTable></TdTable>

            <TdTable> </TdTable>

            <TdTable> </TdTable>

            <TdTable> </TdTable>

            <TdTable>{total} €</TdTable>

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
