import React, { useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import BtnsTable from "../BtnsTable";
import { MdDelete } from "react-icons/md";

function TableTherapyPatient({ patientTherapies }) {
  const menuT = ["Pieza", "Tratamiento", "Profesional", "Precio", "Acciones"];
  const [loading, setLoading] = useState(true);

  // const getTherapy = async (id) => {
  //   let therapy;

  //   const { datos, cargando } = await PeticionAJAX(
  //     Global.url + "therapy/get-therapy/" + id,
  //     "GET"
  //   );

  //   if (datos.state == "success" && !cargando) {
  //     // setOdontogram(datos.odontogram);
  //     // getTeeth();
  //     therapy = datos.therapy;
  //   }

  //   return therapy;
  // };

  // const getUser = async (id) => {
  //   let user;

  //   const { datos, cargando } = await PeticionAJAX(
  //     Global.url + "user/get-user/" + id,
  //     "GET"
  //   );

  //   if (datos.state == "success" && !cargando) {
  //     // setOdontogram(datos.odontogram);
  //     // getTeeth();
  //     user = datos.user;
  //     setLoading(false)
  //   }

  //   return user;
  // };

  // const getTeeth = async (id) => {
  //   let teeth;

  //   const { datos, cargando } = await PeticionAJAX(
  //     Global.url + "tooth/get-teeth/" + id,
  //     "GET"
  //   );

  //   if (datos.state == "success" && !cargando) {
  //     // setOdontogram(datos.odontogram);
  //     // getTeeth();
  //     teeth = datos.teeth;
  //   }

  //   return teeth;
  // };

  return (
    <>
      <Table>
        <Thead menu={menuT} />

        <Tbody>
          {patientTherapies.length >= 1 &&
            patientTherapies.map((pt, index) => {
              return (
                <tr key={index}>
                  <TdTable>
                    
                    {pt.id_teeth.map((t) => {
                      return t;
                    })}
                  </TdTable>

                  <TdTable>{pt.id_therapy}</TdTable>

                  <TdTable>{pt.id_user}</TdTable>

                  <TdTable>50 €</TdTable>

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
