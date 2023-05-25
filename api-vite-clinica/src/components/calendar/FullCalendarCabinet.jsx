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
}) {
  const currentDate = new Date();
  const calendarRef = useRef(null);

  const [loadBlock, setLoadBlock] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  const validRange = {
    start: currentDate,
  };

  useEffect(() => {
    console.log("hahbs")
    setLoading(true);
    if (toggleTab !== 0) {
      getAppointments(toggleTab);
    }
  }, [toggleTab]);

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();

    // Establece un estilo personalizado para el día seleccionado
    calendarApi.render();
  }, [blockedDays]);

  const getBlockedDays = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "dayBlocked/all-dayBlocked/" + clinic,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setBlockedDays(datos.daysBlocked);

      setLoadBlock(false);

      return datos.daysBlocked;
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

  const dayCellDidMount = async (arg) => {
    let auxDate;
    let dayCell;
    let isBlocked;
    let auxBlocked;

    const { date } = arg;

    if (loadBlock) {
      auxBlocked = await getBlockedDays();
    } else {
      auxBlocked = blockedDays;
    }

    if (auxBlocked.length >= 1) {
      auxDate = new Date(date);
      auxDate.setDate(auxDate.getDate() + 1);

      auxBlocked.map((element) => {
        isBlocked = element.date.includes(auxDate.toISOString().split("T")[0]);

        if (isBlocked) {
          dayCell = arg.el;
          dayCell.style.pointerEvents = "none";
          dayCell.classList.add("blocked-day");
        }
      });
    }
    console.log("Voy antes");
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
    setEvent(info.event);
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
        dayCellDidMount={dayCellDidMount}
        dateClick={dateClick}
        loading={!loading}
        // weekends={false}
        editable={true}
        eventDrop={handleEventDrop}
        // events={[{
         
        //   start: '2023-05-20',
        //   // end: '2023-05-17',
        //    backgroundColor:"blue",
        //   display: 'background'
        // }]}
         events={events}
        eventClick={handleEventClick}
      />
    </>
  );
}

export default FullCalendarCabinet;
