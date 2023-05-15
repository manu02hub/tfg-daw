import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import ModalCalendarCreate from "../../components/calendar/ModalCalendarCreate";
import FullCalendarCabinet from "../../components/calendar/FullCalendarCabinet";
import TabsCabinet from "../../components/cabinet/TabsCabinet";

function IndexCalendar() {

  const [confirm, setConfirm] = useState(false);
  const [toglleTab, setToggleTab] = useState(0);
  const { auth } = useAuth();

  return (
    <>
      <HeaderSection title={"Appointment"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
          <TabsCabinet toglleTab={toglleTab} setToggleTab={setToggleTab}/>
            <FullCalendarCabinet setConfirm={setConfirm} />
          </CardBasic>
        </div>
      </div>
      <ModalCalendarCreate confirm={confirm} setConfirm={setConfirm} clinic={auth.id_clinic}/>
    </>
  );
}

export default IndexCalendar;
