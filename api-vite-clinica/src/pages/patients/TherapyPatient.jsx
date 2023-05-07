import React from "react";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import TableTherapyPatient from "../../components/patient/TableTherapyPatient";

function TherapyPatient() {
  return (
    <>
      <HeaderSection title={"Threapy Patient"} />
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <CardBasic>
            <TableTherapyPatient/>
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default TherapyPatient;
