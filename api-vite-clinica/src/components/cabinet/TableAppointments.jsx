import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import BtnsTable from "../BtnsTable";
import { MdDelete, MdCheck, MdClose } from "react-icons/md";

function TableAppointments() {
  const [errorBd, setErrorBd] = useState("");
  const [load, setLoad] = useState(true);

  const [patients, setPatients] = useState({});
  const [tooth, setTooth] = useState({});
  const [therapy_has_patient, setTherapies_has_patient] = useState({});
  const [appointments, setAppointments] = useState({});

  const menuT = ["Cliente", "Tratamiento", "Pieza", "Fecha", "Accion"];
  const dateToday = new Date();
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let tp;
    tp = await getTherapiesPatient();
    await getPatients(tp);
    await getTeeth(tp);

    setLoad(false);
  };

  const getPatients = async (tp) => {
    const promises = tp.map(async (element) => {
      const { datos, cargando } = await PeticionAJAX(
        Global.url + "patient/get-patient/" + element.id_patient,
        "GET"
      );

      if (datos.state === "success" && !cargando) {
        return datos.patient;
      } else {
        setErrorBd("Algo ha ido mal");
      }
    });

    const resolvedPromises = await Promise.all(promises);
    const patient = resolvedPromises.filter((patient) => patient); // Filtrar los valores undefined
    setPatients(patient);
  };

  const getTeeth = async (tp) => {
    const promises = tp.map(async (element) => {
      const { datos, cargando } = await PeticionAJAX(
        Global.url + "tooth/get-teeth/" + element.id_tooth,
        "GET"
      );

      if (datos.state == "success" && !cargando) {
        return datos.teeth;
      }
    });

    const resolvedPromises = await Promise.all(promises);
    const tooth = resolvedPromises.filter((tooth) => tooth); // Filtrar los valores undefined
    setTooth(tooth);
  };

  const getAppointmentsToday = async () => {
    let auxAppointment;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "appointment/getAppointment-cabinet/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      auxAppointment = datos.appointments.filter((appointment) => {
        return (
          appointment.date.split("T")[0] ==
          dateToday.toISOString().split("T")[0]
        );
      });

      setAppointments(auxAppointment);
    }
    return auxAppointment;
  };

  const searchTherapiesPatient = async () => {
    let appointments = await getAppointmentsToday();
    let idsTP = [];

    appointments.forEach((element) => {
      element.id_therapy_has_patient.map((tp) => {
        idsTP.push(tp);
      });
    });

    return idsTP;
  };

  const getTherapiesPatient = async () => {
    const tp = await searchTherapiesPatient();

    const promises = tp.map(async (element) => {
      const { datos, cargando } = await PeticionAJAX(
        Global.url +
          "therapy_has_patient/get-therapy_has_patientById/" +
          element,
        "GET"
      );

      if (datos.state === "success" && !cargando) {
        return datos.therapy_has_patient;
      } else {
        setErrorBd("Algo ha ido mal");
      }
    });

    const resolvedPromises = await Promise.all(promises);
    const tpFind = resolvedPromises.filter(
      (therapy_has_patien) => therapy_has_patien
    ); // Filtrar los valores undefined
    setTherapies_has_patient(tpFind);
    return tpFind;
  };

  const changeDateFormat = (idpaciente) => {
    let dateFormat;
    let aux;

    aux = appointments.find((appointment) => {
      return appointment.id_patient == idpaciente;
    });

    dateFormat = new Date(aux.date);

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

  const updateTherapy_has_Patient = async (id, index) => {
    let tp = {
      complete: true,
    };

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy_has_patient/update-therapy_has_patient/" + id,
      "PUT",
      tp
    );

    if (datos.state === "success" && !cargando) {
      deleteInterface(id, index);
      console.log(datos.therapy_has_patient)
    } else {
      setErrorBd("Algo ha ido mal");
    }
  };

//   const deleteAppointment = async (id, index) => {
//     const { datos, cargando } = await PeticionAJAX(
//       Global.url + "appointment/delete-appointment/" + id,
//       "DELETE"
//     );

//     if (datos.state === "success" && !cargando) {
//       deleteInterface(id, index);
//     } else {
//       setErrorBd("Algo ha ido mal");
//     }
//   };

  const deleteInterface = (id, index) => {
    let aux;
    let auxPatient;
    let auxTooth;

    aux = therapy_has_patient.filter((element) => {
      return element._id !== id;
    });

    auxPatient = [...patients];
    auxTooth = [...tooth];

    auxPatient.splice(index, 1);
    auxTooth.splice(index, 1);

    setPatients(auxPatient);
    setTooth(auxTooth);

    setTherapies_has_patient(aux);
  };

  return (
    <>
      <Table>
        <Thead menu={menuT} />
        {!load && (
          <Tbody>
            {therapy_has_patient.map((th, index) => {
              return (
                <tr key={th._id}>
                  <TdTable>
                    {" "}
                    {patients[index].name + " " + patients[index].surnames}
                  </TdTable>

                  <TdTable>{th.id_therapy.name}</TdTable>

                  <TdTable>
                    {tooth[index].number + "" + tooth[index].letter}
                  </TdTable>

                  <TdTable>{changeDateFormat(patients[index]._id)}</TdTable>

                  <TdTable>
                    <BtnsTable
                      className={"checkTable"}
                      onClick={() => updateTherapy_has_Patient(th._id, index)}
                    >
                      <MdCheck />
                    </BtnsTable>

                    {/* <BtnsTable
                      className={"deleteTable"}
                      onClick={() => deleteInterface(th._id, index)}
                    >
                      <MdClose />
                    </BtnsTable> */}
                  </TdTable>
                </tr>
              );
            })}
          </Tbody>
        )}
      </Table>
    </>
  );
}

export default TableAppointments;
