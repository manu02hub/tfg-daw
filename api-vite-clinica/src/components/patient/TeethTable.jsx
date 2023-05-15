import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Table from "../Table";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import { menorMayor } from "../../helpers/MenorMayor";
import { mayorMenor } from "../../helpers/MayorMenor";
import TeethCard from "../tooth/TeethCard";

function TeethTable({ idOdontogram, setTeeth, setConfirm, patientTherapies }) {
  
  const [odontogram, setOdontogram] = useState({});

  const [loading, setLoading] = useState(true);

  const [arrayTeethUp, setArrayTeethUp] = useState([]);
  const [arrayTeethDown, setArrayTeethDown] = useState([]);
  const [indexUp, setIndexUp] = useState();
  const [indexDown, setIndexDown] = useState();

  const url = "http://localhost/img/tfg-clinic/adulto/";

  useEffect(() => {
    getOdontogram();
  }, []);

  useEffect(() => {
    checkTeeth();
  }, [patientTherapies]);

  const checkTeeth = (id) => {
    let find;
    let response = false;

    patientTherapies.forEach((element) => {

      find = element.id_tooth.indexOf(id);


      if (find != -1) {
        response = true;
      }
    });

    return response;
  };

  const changeTeeth = (teethObj) => {
    setTeeth(teethObj);
    setConfirm(true);
  };

  const getOdontogram = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "odontogram/get-odontogram/" + idOdontogram,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setOdontogram(datos.odontogram);
      getTeeth();
    }
  };

  const getTeeth = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "tooth/get-teethOdontogram/" + idOdontogram,
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

        setIndexUp([55, 54, 53, 52, 51, 61, 62, 63, 64, 65]);
        setIndexDown([85, 84, 83, 82, 81, 71, 72, 73, 74, 75]);

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
          <Tbody className={"tbodyPieces"}>
            {arrayTeethUp.filas.map((fila, indice) => {
              return (
                <tr key={indice}>
                  {fila.fila.map((teeth) => {
                    return teeth.map((t) => {
                      return (
                        <>
                          {(t.number == 14 || t.number == 54) &&
                          t.letter == "b" ? (
                            <>
                              <TdTable key={t._id}>
                                <TeethCard
                                  select={checkTeeth(t._id)}
                                  imagen={url + t.img}
                                  onClick={() => changeTeeth(t)}
                                />
                              </TdTable>
                              <TdTable />
                              <TdTable />
                              <TdTable />
                              <TdTable />
                              <TdTable />
                              <TdTable />
                            </>
                          ) : (
                            <TdTable key={t._id}>
                              <TeethCard
                                select={checkTeeth(t._id)}
                                imagen={url + t.img}
                                onClick={() => changeTeeth(t)}
                              />
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
                return <TdTable key={i}>{i}</TdTable>;
              })}
            </tr>

            <tr>
              {indexDown.map((i) => {
                return <TdTable key={i}>{i}</TdTable>;
              })}
            </tr>

            {arrayTeethDown.filas.map((fila, indice) => {
              return (
                <tr key={indice}>
                  {fila.fila.map((teeth) => {
                    return teeth.map((t) => {
                      return (
                        <>
                          {(t.number == 44 || t.number == 84) &&
                          t.letter == "b" ? (
                            <>
                              <TdTable key={t._id}>
                                <TeethCard
                                  select={checkTeeth(t._id)}
                                  imagen={url + t.img}
                                  onClick={() => changeTeeth(t)}
                                />
                              </TdTable>
                              <TdTable />
                              <TdTable />
                              <TdTable />
                              <TdTable />
                              <TdTable />
                              <TdTable />
                            </>
                          ) : (
                            <TdTable key={t._id}>
                              <TeethCard
                                select={checkTeeth(t._id)}
                                imagen={url + t.img}
                                onClick={() => changeTeeth(t)}
                              />
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
