import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import TableTherapyPatient from "../../components/patient/TableTherapyPatient";
import TeethTable from "../../components/patient/TeethTable";
import ModalTooth from "../../components/tooth/ModalTooth";

function TherapyPatient() {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [teeth, setTeeth] = useState(0);

  const [patient, setPatient] = useState({});
  const [patientTherapies, setPatientTherapies] = useState([]);
  const [users, setUsers] = useState([]);
  const [therapies, setTherapies] = useState([]);
  const [tooth, setTooth] = useState([]);

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
                  setConfirm={setConfirm}
                  setTeeth={setTeeth}
                  patientTherapies={patientTherapies}
                  idOdontogram={patient.odontogram}
                  users={users}
                  setUsers={setUsers}
                  therapies={therapies}
                  setTherapies={setTherapies}
                  tooth={tooth}
                  setTooth={setTooth}
                />
              </CardBasic>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <CardBasic>
                <TableTherapyPatient
                  patientTherapies={patientTherapies}
                  setPatientTherapies={setPatientTherapies}
                />
              </CardBasic>
            </div>
          </div>
          <ModalTooth
            confirm={confirm}
            setConfirm={setConfirm}
            clinic={auth.id_clinic}
            patient={patient._id}
            teeth={teeth}
            patientTherapies={patientTherapies}
            setPatientTherapies={setPatientTherapies}
          ></ModalTooth>
        </>
      )}
    </>
  );
}

export default TherapyPatient;
