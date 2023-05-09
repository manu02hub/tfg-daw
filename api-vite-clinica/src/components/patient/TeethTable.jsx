import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import BtnsTable from "../BtnsTable";
import { MdDelete } from "react-icons/md";
import { ObjectSchema, object } from "yup";
import { menorMayor } from "../../helpers/MenorMayor";
import { mayorMenor } from "../../helpers/MayorMenor";

function TeethTable({ odontogram }) {
  const [loading, setLoading] = useState(true);
  const [arrayTeethUp, setArrayTeethUp] = useState([]);
  const [arrayTeethDown, setArrayTeethDown] = useState([]);
  const [indexUp, setIndexUp] = useState();
  const [indexDown, setIndexDown] = useState();

  const url = "http://localhost/img/tfg-clinic/adulto/";
  const id = "6458ef5db746a25c730d5e12";

  useEffect(() => {
    getTeeth();
  }, []);

  const getTeeth = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "tooth/get-teethOdontogram/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      if ((odontogram.name = "Adulto")) {
        setArrayTeethUp({
          filas: [
            {
              fila: [
                mayorMenor(menorMayor(datos.teeth, "c", 11, 18)),
                menorMayor(datos.teeth, "c", 21, 28),
              ],
            },
            {
              fila: [
                mayorMenor(menorMayor(datos.teeth, "b", 11, 18)),
                menorMayor(datos.teeth, "b", 21, 28),
              ],
            },
            {
              fila: [
                mayorMenor(menorMayor(datos.teeth, "a", 11, 18)),
                menorMayor(datos.teeth, "a", 21, 28),
              ],
            },
          ],
        });

        setIndexUp([
          18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
        ]);
        setIndexDown([
          48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
        ]);

        setArrayTeethDown({
          filas: [
            {
              fila: [
                mayorMenor(menorMayor(datos.teeth, "a", 41, 48)),
                menorMayor(datos.teeth, "a", 31, 38),
              ],
            },
            {
              fila: [
                mayorMenor(menorMayor(datos.teeth, "b", 41, 48)),
                menorMayor(datos.teeth, "b", 31, 38),
              ],
            },
            {
              fila: [
                mayorMenor(menorMayor(datos.teeth, "c", 41, 48)),
                menorMayor(datos.teeth, "c", 31, 38),
              ],
            },
          ],
        });
      } else {
        setArrayTeethUp({
          filas: [
            {
              fila: [
                mayorMenor(menorMayor(datos.teeth, "c", 51, 55)),
                menorMayor(datos.teeth, "c", 61, 65),
              ],
            },
            {
              fila: [
                mayorMenor(menorMayor(datos.teeth, "b", 51, 55)),
                menorMayor(datos.teeth, "b", 61, 65),
              ],
            },
            {
              fila: [
                mayorMenor(menorMayor(datos.teeth, "a", 51, 55)),
                menorMayor(datos.teeth, "a", 61, 65),
              ],
            },
          ],
        });

        setIndexUp([
          55, 54, 53, 52, 51, 61, 62, 63, 64, 65
        ]);
        setIndexDown([
          85, 84, 83, 82, 81, 71, 72, 73, 74, 75
        ]);

        setArrayTeethDown({
          filas: [
            {
              fila: [
                mayorMenor(menorMayor(datos.teeth, "a", 81, 85)),
                menorMayor(datos.teeth, "a", 71, 75),
              ],
            },
            {
              fila: [
                mayorMenor(menorMayor(datos.teeth, "b", 81, 85)),
                menorMayor(datos.teeth, "b", 71, 75),
              ],
            },
            {
              fila: [
                mayorMenor(menorMayor(datos.teeth, "c", 81, 85)),
                menorMayor(datos.teeth, "c", 71, 75),
              ],
            },
          ],
        });
      }

      setLoading(false);
    }
  };

  return (
    <>
      <Table>
        {!loading && (
          <Tbody>
            {arrayTeethUp.filas.map((fila) => {
              return (
                <tr>
                  {fila.fila.map((teeth) => {
                    return teeth.map((t) => {
                      return (
                        <>
                          {(t.number == 14 || t.number == 54) &&
                          t.letter == "b" ? (
                            <>
                              <TdTable>
                                <img src={url + t.img} />{" "}
                              </TdTable>
                              <TdTable />
                              <TdTable />
                              <TdTable />
                              <TdTable />
                              <TdTable />
                              <TdTable />
                            </>
                          ) : (
                            <TdTable>
                              <img src={url + t.img} />{" "}
                            </TdTable>
                          )}
                        </>
                      );
                    });
                  })}
                </tr>
              );
            })}

            <tr>
              {indexUp.map((i) => {
                return <TdTable>{i}</TdTable>;
              })}
            </tr>

            <tr>
              {indexDown.map((i) => {
                return <TdTable>{i}</TdTable>;
              })}
            </tr>

            {arrayTeethDown.filas.map((fila) => {
              return (
                <tr>
                  {fila.fila.map((teeth) => {
                    return teeth.map((t) => {
                      return (
                        <>
                          {(t.number == 44 || t.number == 84) &&
                          t.letter == "b" ? (
                            <>
                              <TdTable>
                                <img src={url + t.img} />{" "}
                              </TdTable>
                              <TdTable />
                              <TdTable />
                              <TdTable />
                              <TdTable />
                              <TdTable />
                              <TdTable />
                            </>
                          ) : (
                            <TdTable>
                              <img src={url + t.img} />{" "}
                            </TdTable>
                          )}
                        </>
                      );
                    });
                  })}
                </tr>
              );
            })}
          </Tbody>
        )}
      </Table>
    </>
  );
}

export default TeethTable;
