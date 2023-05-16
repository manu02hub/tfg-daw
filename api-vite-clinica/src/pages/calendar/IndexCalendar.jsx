import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import ModalCalendarCreate from "../../components/calendar/ModalCalendarCreate";
import FullCalendarCabinet from "../../components/calendar/FullCalendarCabinet";
import TabsCabinet from "../../components/cabinet/TabsCabinet";
import Spinner from "../../components/Spinner";

function IndexCalendar() {
  const dateDafault = new Date();
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [toglleTab, setToggleTab] = useState(0);
  const [date, setDate] = useState(dateDafault);
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
              setConfirm={setConfirm}
              setDate={setDate}
              toggleTab={toglleTab}
              loading={loading}
              setLoading={setLoading}
            />
          </CardBasic>
        </div>
      </div>
      <ModalCalendarCreate
        confirm={confirm}
        setConfirm={setConfirm}
        clinic={auth.id_clinic}
        toglleTab={toglleTab}
        date={date}
      />
    </>
  );
}

export default IndexCalendar;
