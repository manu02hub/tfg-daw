import React, { useEffect, useState, useRef } from "react";
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
  blockedDays,
  setBlockedDays,
  clinic,
  setConfirmModalUnlock
}) {
  const currentDate = new Date();
  const calendarRef = useRef(null);

  const [selectedDay, setSelectedDay] = useState(null);

  const validRange = {
    start: currentDate,
  };

  useEffect(() => {
    if (toggleTab !== 0) {
      showAllEvents();
      setLoading(false);
    }
  }, [toggleTab]);

  // useEffect(() => {
  //   const calendarApi = calendarRef.current.getApi();

  //   // Establece un estilo personalizado para el día seleccionado
  //   calendarApi.render();
  // }, [blockedDays]);

  // const dayCellDidMount = async (arg) => {
  //   let auxDate;
  //   let dayCell;
  //   let isBlocked;
  //   let auxBlocked;

  //   const { date } = arg;

  //   if (loadBlock) {
  //     auxBlocked = await getBlockedDays();
  //   } else {
  //     auxBlocked = blockedDays;
  //   }

  //   if (auxBlocked.length >= 1) {
  //     auxDate = new Date(date);
  //     auxDate.setDate(auxDate.getDate() + 1);

  //     auxBlocked.map((element) => {
  //       isBlocked = element.date.includes(auxDate.toISOString().split("T")[0]);

  //       if (isBlocked) {
  //         dayCell = arg.el;
  //         dayCell.style.pointerEvents = "none";
  //         dayCell.classList.add("blocked-day");
  //       }
  //     });
  //   }
  //   console.log("Voy antes");
  // };

  const getAppointments = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "appointment/getAppointment-cabinet/" + toggleTab,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setAppointments(datos.appointments);
      return await therapy_has_patientToEvent(datos.appointments);
    }
  };

  const therapy_has_patientToEvent = async (appointment) => {
    let promises = [];
    let eventCalendar;
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
        };
        return eventCalendar;
      }
    });

    const resolvedPromises = await Promise.all(promises);
    const event = resolvedPromises.filter((event) => event); // Filter out undefined values

    return event;
    // setEvents(event);
  };

  const getBlockedDays = async () => {
    let appointment;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "dayBlocked/all-dayBlocked/" + clinic,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setBlockedDays(datos.daysBlocked);
      return await convertDaysBlocked_toEvent(datos.daysBlocked);
    }
  };

  const convertDaysBlocked_toEvent = async (blocked) => {
    let promises = [];
    let eventCalendar;
    let id;
    let date;

    promises = blocked.map(async (element) => {
      id = element._id;
      date = element.date.split("T")[0];

      eventCalendar = {
        id: id,
        date: date,
        backgroundColor: "blue",
        display: "background",
      };

      return eventCalendar;
    });

    const resolvedPromises = await Promise.all(promises);
    const event = resolvedPromises.filter((event) => event);

    return event;
  };

  const showAllEvents = async () => {
    let arrayAux = [];
    let auxBlocked;
    let auxAppointment;

    auxBlocked = await getBlockedDays();
    auxAppointment = await getAppointments();

    auxBlocked.map((element) => {
      arrayAux.push(element);
    });

    auxAppointment.map((element) => {
      arrayAux.push(element);
    });

    setEvents(arrayAux);
  };

  const handleEventDrop = async (arg) => {
    // Maneja el evento de deslizamiento aquí
    let appointment;
    const newStartDay = arg.event.start; // Obtener el día del mes para la fecha de inicio

    console.log("Día de inicio:", newStartDay.toISOString());
    console.log(arg.event.id);

    const isDayBlocked = blockedDays.find(
      (element) =>
        element.date.split("T")[0] == newStartDay.toISOString().split("T")[0]
    );

    if (isDayBlocked) {
      // Cancelar el arrastre del evento
      arg.revert();
      console.log("No se puede deslizar el evento en un día bloqueado");
    } else {
      appointment = {
        date: newStartDay,
      };

      await PeticionAJAX(
        Global.url + "appointment/update-appointment/" + arg.event.id,
        "PUT",
        appointment
      );
    }
  };

  const handleEventClick = (info) => {
    let found;
    let dateSelect = new Date(info.event.start);

    console.log(dateSelect.toISOString());

    dateSelect.setDate(info.event.start.getDate() + 1);

    dateSelect = dateSelect.toISOString();

    console.log(dateSelect);

    found = blockedDays.find((element) => {
     return element.date.split("T")[0] == dateSelect.split("T")[0]
    });

    if (!found) {
      setEvent(info.event);
      setConfirmModalEdit(true);
    }else{
      setEvent(info.event);
      setConfirmModalUnlock(true);
    }
  };

  const dateClick = (info) => {
    let found;

    found = blockedDays.find(
      (element) => element.date.split("T")[0] == info.dateStr
    );

    if (!found) {
      setConfirmModalCreate(true);
      setDate(info.dateStr);
    }
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        locale={esLocale}
        // initialView={"timeGridDay"}
        headerToolbar={{
          start: "prev,next,today", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek", // will normally be on the right. if RTL, will be on the left
        }}
        ref={calendarRef}
        validRange={validRange}
        dayHeaderFormat={{ weekday: "long" }}
        hiddenDays={[0]}
        // dayCellDidMount={dayCellDidMount}
        dateClick={dateClick}
        loading={!loading}
        // weekends={false}
        editable={true}
        eventDrop={handleEventDrop}
        events={events}
        eventClick={handleEventClick}
      />
    </>
  );
}

export default FullCalendarCabinet;
