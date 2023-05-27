import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import HeaderSection from "../../components/HeaderSection";
import FormCreatePatient from "../../components/patient/FormCreatePatient";
import FormCreateTutor from "../../components/patient/FormCreateTutor";

function CreatePatient() {
  const [isMinor, setIsMinor] = useState(false);
  const [isSavedTutor, setIsSavedTutor] = useState(false);
  const [idTutor, setIdTutor] = useState(0);
  const { auth } = useAuth();
  return (
    <>
      <HeaderSection title={"Crear un nuevo Paciente"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <FormCreatePatient
            isMinor={isMinor}
            setIsMinor={setIsMinor}
            isSavedTutor={isSavedTutor}
            idTutor={idTutor}
            clinic={auth.id_clinic}
          />
          {isMinor && !isSavedTutor && (
            <FormCreateTutor
              setIsSavedTutor={setIsSavedTutor}
              setIdTutor={setIdTutor}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CreatePatient;
