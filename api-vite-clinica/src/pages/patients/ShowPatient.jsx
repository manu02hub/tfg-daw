import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderSection from "../../components/HeaderSection";
import PersonalData from "../../components/patient/PersonalData";
import Timeline from "../../components/patient/Timeline";
import ListTutorData from "../../components/patient/ListTutorData";

function ShowPatient() {
  const { id } = useParams();
  const [tutors, setTutors] = useState([]);

  return (
    <>
      <HeaderSection title={"Paciente"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <PersonalData patientId={id} setTutors={setTutors} />
          {tutors.length > 0 && 
           <ListTutorData tutors={tutors} />
          }
          <HeaderSection title={"Historial del Paciente"} />
          <Timeline patientId={id} />
        </div>
      </div>
    </>
  );
}

export default ShowPatient;
