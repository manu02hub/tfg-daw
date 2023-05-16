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
}) {
  const [appointments, setAppointments] = useState({});

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
    console.log(toggleTab);

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "appointment/getAppointment-cabinet/" + toggleTab,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setAppointments(datos.appointments);
      setLoading(false);
    }
  };

  return (
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
      events={appointments}
    />
  );
}

export default FullCalendarCabinet;
