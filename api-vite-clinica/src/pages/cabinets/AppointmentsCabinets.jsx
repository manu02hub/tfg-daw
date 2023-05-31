import React from "react";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import TableAppointments from "../../components/cabinet/TableAppointments";

function AppointmentsCabinets() {
  return (
    <>
      <HeaderSection title={"Citas de hoy"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <TableAppointments />
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default AppointmentsCabinets;
