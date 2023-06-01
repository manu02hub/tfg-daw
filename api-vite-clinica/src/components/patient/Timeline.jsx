import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import CardBasic from "../../components/CardBasic";

function Timeline({ patientId }) {
  const [load, setLoad] = useState(true);
  const [appointments, setAppointments] = useState({});
  const [tooth, setTooth] = useState({});
  const [therapies_has_patient, setTherapies_has_patient] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let tp;
    tp = await getTherapiesPatient();
    await getTeeth(tp);

    setLoad(false);
  };

  const getAppointmentsPatient = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "appointment/get-appointment-patient/" + patientId,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setAppointments(datos.appointments);
    }
    return datos.appointments;
  };

  const searchTherapiesPatient = async () => {
    let appointments = await getAppointmentsPatient();
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
          "therapy_has_patient/get-therapy_has_patientComplete/" +
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
      dateFormat.getDate() +
      "-" +
      Number.parseInt(dateFormat.getMonth() + 1) +
      "-" +
      dateFormat.getFullYear() +
      " " +
      hour +
      ":" +
      minutes;

    return dateFormat;
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-8 col-md-8 col-lg-8">
          <div className="timeline">
            {!load &&
              therapies_has_patient.length > 0 &&
              appointments.map((app, index) => {
                console.log(app.date);
                return (
                  <div className="container right" key={app._id}>
                    <CardBasic>
                      <div className="infoTimeline">
                        <span>{changeDateFormat(app.date)}</span>
                        {therapies_has_patient.map((th) => {
                          console.log("TH " + th.id_therapy.name);
                          return app.id_therapy_has_patient.map((t) => {
                            console.log("ID CiTA " + t);
                            return (
                              th._id == t &&
                              th.complete && (
                                <div className="therapiesDate" key={th._id}>
                                  <p>
                                    <span className="therapyName">
                                      Tratamiento:
                                    </span>
                                    {th.id_therapy.name},
                                    {tooth.map((teeth) => {
                                      return (
                                        teeth._id == th.id_tooth && (
                                          <span key={teeth._id}>
                                            {" "}
                                            Pieza:{" "}
                                            {teeth.number +
                                              "" +
                                              teeth.letter}{" "}
                                          </span>
                                        )
                                      );
                                    })}
                                  </p>
                                </div>
                              )
                            );
                          });
                        })}
                      </div>
                    </CardBasic>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-sm-8 col-md-8 col-lg-8">
          <div className="timeline">
            {!load &&
              therapies_has_patient.length > 0 &&
              therapies_has_patient.map((th, index) => {
                return appointments.map((app) => {
                  return app.id_therapy_has_patient.map((t) => {
                    return (
                      t == th._id &&
                      th.complete && (
                        <div className="container right" key={app._id}>
                          <CardBasic>
                            <div className="infoTimeline">
                              <span>{changeDateFormat(app.date)}</span>

                              <div className="therapiesDate" key={th._id}>
                                <p>
                                  <span className="therapyName">
                                    Tratamiento:
                                  </span>
                                  {th.id_therapy.name}, <span> Pieza: </span>{" "}
                                  {tooth[index].number +
                                    "" +
                                    tooth[index].letter}
                                </p>
                              </div>
                            </div>
                          </CardBasic>
                        </div>
                      )
                    );
                  });
                });
              })}
          </div>
        </div>
      </div> */}
      {!load && therapies_has_patient.length < 1 && (
        <div className="notFindSection">
          <p>No se le han realizado tratamientos aún</p>
        </div>
      )}
    </>
  );
}

export default Timeline;
