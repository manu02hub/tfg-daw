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

  useEffect(() => {
    listTherapyPrice();
  }, [patientTherapies]);

  const [list, setList] = useState([]);
  const priceTherapy = useState([]);

  console.log(list);

  const listTherapyPrice = () => {
    let size;
    var auxTherapies = [];
    var auxTooth = [];
    let listTherapyTeeth;

    console.log("Longitud patinet" + patientTherapies.length);

    if (patientTherapies.length != 0) {
      if (patientTherapies.length == 1) {
        listTherapyTeeth = {
          therapiesTable: therapies,
          toothTable: tooth,
        };

        setList([...list, listTherapyTeeth]);
      } else {
        
        size = patientTherapies.length - 1;

        let find = list.indexOf(
          (ltp) => patientTherapies[size].id_therapy == ltp.therapies[0]._id
        );
        auxTooth = tooth.filter(
          (t) => t._id == patientTherapies[size].id_teeth
        );

        if (find != -1) {
          list[find].teeth.push(auxTooth);
        } else {
          auxTherapies = therapies.filter(
            (t) => t._id == patientTherapies[size].id_therapy
          );
          listTherapyTeeth = {
            therapiesTable: auxTherapies,
            toothTable: auxTooth,
          };
          setList([...list, listTherapyTeeth]);
        }
      }
    }
  };

  // useEffect(() => {
  //   price();
  // }, [patientTherapies]);

  const getToothByTherapy = (therapy) => {
    let aux;

    if (therapies.length >= 1) {
      aux = patientTherapies.filter((pt) => pt.id_therapy == therapy._id);
    }

    return aux;
  };

  const price = (therapy) => {
    let aux = [];

    if (patientTherapies.length >= 1) {
      aux = getToothByTherapy(therapy);
    }

    return aux.length;
  };

  return (
    <>
      <Table>
        <Thead menu={menuT} />

        <Tbody>
          {therapies.length >= 1 &&
            therapies.map((therapy, index) => {
              return (
                <tr key={index}>
                  <TdTable>
                    {getToothByTherapy(therapy).map((teeth) => {
                      return tooth.map((t) => {
                        if (t._id == teeth.id_teeth) {
                          return t.number + "" + t.letter + " ";
                        }
                      });
                    })}
                  </TdTable>

                  <TdTable>{therapy.name}</TdTable>

                  <TdTable>{therapy.price}</TdTable>

                  <TdTable> {therapy.discount} </TdTable>

                  <TdTable>
                    {" "}
                    {(therapy.price -
                      therapy.price * (therapy.discount / 100)) *
                      price(therapy)}{" "}
                  </TdTable>

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

            <TdTable> €</TdTable>

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
