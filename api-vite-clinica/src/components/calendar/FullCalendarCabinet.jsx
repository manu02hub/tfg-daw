import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

function FullCalendarCabinet({
  setConfirm,
  setDate,
  toggleTab,
  loading,
  setLoading,
  appointments,
  setAppointments,
}) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (toggleTab !== 0) {
      getAppointments(toggleTab);
    }
  }, [toggleTab]);

  const dateClick = (info) => {
    setConfirm(true);
    setDate(info.dateStr);
  };

  const getAppointments = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "appointment/getAppointment-cabinet/" + toggleTab,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setAppointments(datos.appointments);
      therapy_has_patient(datos.appointments);
      // setLoading(false);
    }
  };

  const therapy_has_patient = async (appointment) => {
    let promises = [];
    let auxTherapies = [];
    let therapy;
    let idAppointment;
    let title;
    let description;
    let date;

    promises = appointment.map(async (element) => {
      for (
        let index = 0;
        index < element.id_therapy_has_patient.length;
        index++
      ) {
        const { datos, cargando } = await PeticionAJAX(
          Global.url +
            "therapy_has_patient/get-therapy_has_patientById/" +
            element.id_therapy_has_patient[index],
          "GET"
        );

        if (datos.state == "success" && !cargando) {
          therapy = datos.therapy_has_patient[0].id_therapy;

          auxTherapies.push(therapy);
        }
      }

      const { datos, cargando } = await PeticionAJAX(
        Global.url + "patient/get-patient/" + element.id_patient,
        "GET"
      );

      if (datos.state == "success" && !cargando) {
        idAppointment = element._id;
        title = datos.patient.name;
        date = element.date;
      }
    });

    const resolvedPromises = await Promise.all(promises);
    const pa = resolvedPromises.filter((event) => event); // Filter out undefined values

    let event = {
      id: idAppointment,
      title: title,
      date: date,
      // description: auxTherapies,
    };

    setEvents([...events, event]);

    // const resolvedPromises = await Promise.all(promises);
    // const pa = resolvedPromises.filter((teeth) => teeth); // Filter out undefined values

    setLoading(false);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <p>{eventInfo.timeText}</p>
        <p>{eventInfo.event.title}</p>
        {/* {eventInfo.event.extendedProps.descripcion.map((des) => {
          return des.name;
        })} */}
      </div>
    );
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        //  locale={esLocale}
        // initialView={"timeGridDay"}
        headerToolbar={{
          start: "prev,next,today", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek", // will normally be on the right. if RTL, will be on the left
        }}
        dayHeaderFormat={{ weekday: "long" }}
        hiddenDays={[0]}
        dateClick={(info) => {
          dateClick(info);
        }}
        // weekends={false}
        loading={!loading && getAppointments}
        events={events}
        eventContent={renderEventContent}
      />
    </>
  );
}

export default FullCalendarCabinet;
