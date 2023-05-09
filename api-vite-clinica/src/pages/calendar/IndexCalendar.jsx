import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";

function IndexCalendar() {
  return (
    <>
      <HeaderSection title={"Appointment"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"timeGridDay"}
              headerToolbar={{
                start: "prev,next,today", // will normally be on the left. if RTL, will be on the right
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
              }}
              weekends={false}
              events={[
                { title: "event 1", date: "2023-05-09" },
                { title: "event 2", date: "2023-05-10" },
              ]}
            />
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default IndexCalendar;
