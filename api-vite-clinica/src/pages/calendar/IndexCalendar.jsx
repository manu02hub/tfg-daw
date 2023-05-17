import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import ModalCalendarCreate from "../../components/calendar/ModalCalendarCreate";
import FullCalendarCabinet from "../../components/calendar/FullCalendarCabinet";
import TabsCabinet from "../../components/cabinet/TabsCabinet";
import Spinner from "../../components/Spinner";
import ModalCalendarEdit from "../../components/calendar/ModalCalendarEdit";

function IndexCalendar() {
  const dateDafault = new Date();

  const [loading, setLoading] = useState(true);
  const [confirmModalCreate, setConfirmModalCreate] = useState(false);
  const [confirmModalEdit, setConfirmModalEdit] = useState(false);
  const [toglleTab, setToggleTab] = useState(0);
  const [date, setDate] = useState(dateDafault);
  const [appointments, setAppointments] = useState({});
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const { auth } = useAuth();

  return (
    <>
      {loading && <Spinner />}
      <HeaderSection title={"Appointment"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <TabsCabinet toglleTab={toglleTab} setToggleTab={setToggleTab} />
            <FullCalendarCabinet
              setConfirmModalCreate={setConfirmModalCreate}
              setConfirmModalEdit={setConfirmModalEdit}
              setDate={setDate}
              toggleTab={toglleTab}
              loading={loading}
              setLoading={setLoading}
              appointments={appointments}
              setAppointments={setAppointments}
              events={events}
              setEvents={setEvents}
              setEvent={setEvent}
            />
          </CardBasic>
        </div>
      </div>
      <ModalCalendarCreate
        confirmModalCreate={confirmModalCreate}
        setConfirmModalCreate={setConfirmModalCreate}
        clinic={auth.id_clinic}
        toglleTab={toglleTab}
        date={date}
        events={events}
        setEvents={setEvents}
      />

      <ModalCalendarEdit
        confirmModalEdit={confirmModalEdit}
        setConfirmModalEdit={setConfirmModalEdit}
        clinic={auth.id_clinic}
        event={event}
        setEvent={setEvent}
        setEvents={setEvents}
      />
    </>
  );
}

export default IndexCalendar;
