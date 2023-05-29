import React from "react";
import { useParams } from "react-router-dom";
import HeaderSection from "../../components/HeaderSection";
import PersonalData from "../../components/patient/PersonalData";
import Timeline from "../../components/patient/Timeline";


function ShowPatient() {

  const { id } = useParams();

  return (
    <>
      <HeaderSection title={"Paciente"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <PersonalData patientId={id} />
          <HeaderSection title={"Histoy Patient"} />
          <Timeline patientId={id}/>
        </div>
      </div>
    </>
  );
}

export default ShowPatient;
