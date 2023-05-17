import React, { useEffect, useState, useMemo } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

function FullCalendarCabinet({
  setConfirmModalCreate,
  setConfirmModalEdit,
  setDate,
  toggleTab,
  loading,
  setLoading,
  appointments,
  setAppointments,
  events,
  setEvents,
  setEvent,
}) {
  useEffect(() => {
    setLoading(true);
    if (toggleTab !== 0) {
      getAppointments(toggleTab);
    }
  }, [toggleTab]);

  const dateClick = (info) => {
    setConfirmModalCreate(true);
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
    // let auxTherapies = [];
    let eventCalendar;
    // let therapy;
    let idAppointment;
    let title;
    let date;

    promises = appointment.map(async (element) => {
      const { datos, cargando } = await PeticionAJAX(
        Global.url + "patient/get-patient/" + element.id_patient,
        "GET"
      );

      if (datos.state == "success" && !cargando) {
        idAppointment = element._id;
        title = datos.patient.name + " " + datos.patient.surnames;
        date = element.date;

        eventCalendar = {
          id: idAppointment,
          title: title,
          date: date,
          // description: auxTherapies,
        };

        return eventCalendar;
      }
    });

    const resolvedPromises = await Promise.all(promises);
    const event = resolvedPromises.filter((event) => event); // Filter out undefined values

    setEvents(event);

    setLoading(false);
  };

  const handleEventClick = (info) => {
    setConfirmModalEdit(true);
    setEvent(info.event.id);
    // Handle the event click logic here
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
        loading={!loading}
        // weekends={false}
        events={events}
        eventClick={handleEventClick}
      />
    </>
  );
}

export default FullCalendarCabinet;
