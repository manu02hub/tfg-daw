import React from "react";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import FormCreatePatient from "../../components/patient/FormCreatePatient";
import FormCreateTutor from "../../components/patient/FormCreateTutor";

function CreatePatient() {
  return (
    <>
      <HeaderSection title={"Crear un nuevo Paciente"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <FormCreatePatient/>
          <FormCreateTutor/>
        </div>
      </div>
    </>
  );
}

export default CreatePatient;
