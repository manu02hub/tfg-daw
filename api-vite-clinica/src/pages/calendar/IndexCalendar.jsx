import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import ModalCalendarCreate from "../../components/calendar/ModalCalendarCreate";
import FullCalendarCabinet from "../../components/calendar/FullCalendarCabinet";
import TabsCabinet from "../../components/cabinet/TabsCabinet";
import Spinner from "../../components/Spinner";
import ModalCalendarEdit from "../../components/calendar/ModalCalendarEdit";
import ModalUnlockDay from "../../components/calendar/ModalUnlockDay";

function IndexCalendar() {
  const dateDafault = new Date();

  const [loading, setLoading] = useState(true);
  const [confirmModalCreate, setConfirmModalCreate] = useState(false);
  const [confirmModalEdit, setConfirmModalEdit] = useState(false);
  const [confirmModalUnlock, setConfirmModalUnlock] = useState(false);
  const [toglleTab, setToggleTab] = useState(0);
  const [date, setDate] = useState(dateDafault);
  const [appointments, setAppointments] = useState({});
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [blockedDays, setBlockedDays] = useState([]);
  const { auth } = useAuth();

  return (
    <>
      {toglleTab !== 0 && loading && <Spinner />}
      <HeaderSection title={"Appointment"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <TabsCabinet toglleTab={toglleTab} setToggleTab={setToggleTab} />
            {toglleTab !== 0 ? (
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
                blockedDays={blockedDays}
                setBlockedDays={setBlockedDays}
                clinic={auth.id_clinic}
                setConfirmModalUnlock={setConfirmModalUnlock}
              />
            ) : (
              <p>
                Primero necesitas tener gabinetes en tu clínica para poder crear
                citas
              </p>
            )}
          </CardBasic>
        </div>
      </div>
      {toglleTab !== 0 && (
        <>
          <ModalCalendarCreate
            confirmModalCreate={confirmModalCreate}
            setConfirmModalCreate={setConfirmModalCreate}
            auth={auth}
            toglleTab={toglleTab}
            date={date}
            events={events}
            setEvents={setEvents}
            blockedDays={blockedDays}
            setBlockedDays={setBlockedDays}
          />

          <ModalCalendarEdit
            confirmModalEdit={confirmModalEdit}
            setConfirmModalEdit={setConfirmModalEdit}
            auth={auth}
            event={event}
            setEvent={setEvent}
            events={events}
            setEvents={setEvents}
          />

          <ModalUnlockDay
            confirmModalUnlock={confirmModalUnlock}
            setConfirmModalUnlock={setConfirmModalUnlock}
            events={events}
            setEvents={setEvents}
            event={event}
            blockedDays={blockedDays}
            setBlockedDays={setBlockedDays}
            auth={auth}
          />
        </>
      )}
    </>
  );
}

export default IndexCalendar;
