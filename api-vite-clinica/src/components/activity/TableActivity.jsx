import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";

function TableActivity({ load, setLoad, idClinic }) {
  const menuT = ["Actividad", "Acción", "Fecha"];

  const [activities, setActivities] = useState({});

  useEffect(() => {
    getActivity();
  }, []);

  const getActivity = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "activity/get-activities/" + idClinic,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setActivities(datos.activities);
      setLoad(false);
    }
  };

  const changeDateFormat = (date) => {
    let dateFormat = new Date(date);

    let hour = dateFormat.getHours();
    let minutes = dateFormat.getMinutes();

    if (hour < 10) {
      hour = "0" + hour;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    dateFormat =
      hour +
      ":" +
      minutes +
      " " +
      dateFormat.getDate() +
      "-" +
      Number.parseInt(dateFormat.getMonth() + 1) +
      "-" +
      dateFormat.getFullYear();

    return dateFormat;
  };

  const checkAction = (action) => {
    let className;

    switch (action) {
      case "Crear":
        className = "trCreate";
        break;
      case "Eliminar":
        className = "trDelete";
        break;
      case "Editar":
        className = "trEdit";
        break;
      case "Login":
        className = "trLogin";
        break;
      case "Asignar Tratamiento":
        className = "trAsignar";
        break;
      case "Bloquear":
        className = "trBloquear";
        break;
      case "Desbloquear":
        className = "trDesbloquear";
        break;
    }

    return className;
  };

  return (
    <>
      <Table>
        <Thead menu={menuT} />
        <Tbody>
          {!load &&
            activities.map((activity) => {
              return (
                <tr key={activity._id} className={checkAction(activity.action)}>
                  <TdTable>{activity.message}</TdTable>

                  <TdTable>{activity.action}</TdTable>

                  <TdTable>{changeDateFormat(activity.date)}</TdTable>
                </tr>
              );
            })}
        </Tbody>
      </Table>
      {!load && activities.length < 1 && (
        <div className="notFindSection">
          <p>No se ha realizado ninguna acción en esta clínica</p>
        </div>
      )}
    </>
  );
}

export default TableActivity;
