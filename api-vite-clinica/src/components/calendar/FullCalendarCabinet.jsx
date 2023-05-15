import React from "react";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

function FullCalendarCabinet({ setConfirm }) {
  const dateClick = (info) => {
    setConfirm(true);
    console.log("Clicked on: " + info.dateStr);
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
      events={[
        { title: "event 1", date: "2023-05-09T10:30:00" },
        { title: "event 2", date: "2023-05-12T10:30:00" },
      ]}
    />
  );
}

export default FullCalendarCabinet;
