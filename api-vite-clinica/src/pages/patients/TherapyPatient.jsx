import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import TableTherapyPatient from "../../components/patient/TableTherapyPatient";
import TeethTable from "../../components/patient/TeethTable";

function TherapyPatient() {

  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [patientTherapies, setPatientTherapies] = useState({});
  const { id } = useParams();
  const { auth } = useAuth();

  useEffect(() => {
    getPatient();
  }, []);

  const getPatient = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/get-patient/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setPatient(datos.patient);
      setLoading(false);
    }
  };

  return (
    <>
      {!loading && (
        <>
          <HeaderSection title={"Threapy Patient"} />
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <CardBasic>
                <TeethTable
                  patient={patient._id}
                  idOdontogram={patient.odontogram}
                  clinic = {auth.id_clinic}
                />
              </CardBasic>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <CardBasic>
                <TableTherapyPatient />
              </CardBasic>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TherapyPatient;
