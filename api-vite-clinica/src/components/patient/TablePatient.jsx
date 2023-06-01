import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import { FaTooth } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import BtnsTable from "../BtnsTable";
import ModalPatientDelete from "./ModalPatientDelete";

function TablePatient({ load, setLoad, patients, setPatients, auth }) {
  const [idPatient, setIdPatient] = useState(0);
  const [odontogram, setOdontogram] = useState({});
  const [confirmingPatientDeletion, setConfirmingPatientDeletion] =
    useState(false);

  const menuT = [
    "Nº Historial",
    "Nombre",
    "Apellidos",
    "Email",
    "Nif",
    "Odontograma",
    "Telefono",
    "Activo",
    "Acciones",
  ];

  useEffect(() => {
    getOdontograms();
    getPatients();
  }, []);

  const getPatients = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/all-patients/" + auth.id_clinic,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setPatients(datos.patients);
      setLoad(false);
    }
  };

  const getOdontograms = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "odontogram/all-odontograms",
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setOdontogram(datos.odontograms);
    }
  };

  const checkOdontogram = (id) => {
    let find = odontogram.find((o) => o._id == id);

    return find.name;
  };

  const confirmPatientDeletion = (id) => {
    setIdPatient(id);

    setConfirmingPatientDeletion(true);
  };

  return (
    <>
      <Table>
        <Thead menu={menuT} />
        {!load && (
          <Tbody>
            {patients.map((patient) => {
              return (
                <tr key={patient._id}>
                  <TdTable>{patient.history_number}</TdTable>

                  <TdTable> {patient.name}</TdTable>

                  <TdTable>{patient.surnames}</TdTable>

                  <TdTable>{patient.id_contact.email}</TdTable>

                  <TdTable>{patient.nif}</TdTable>

                  <TdTable>{checkOdontogram(patient.odontogram)}</TdTable>

                  <TdTable>{patient.id_contact.mobile_phone}</TdTable>

                  <TdTable>{patient.active ? "Activo" : "No activo"}</TdTable>

                  <TdTable>
                    <BtnsTable className={"editTable"}>
                      <Link to={"patient-edit/" + patient._id}>
                        <FiEdit />
                      </Link>
                    </BtnsTable>

                    <BtnsTable
                      className={"deleteTable"}
                      onClick={() => confirmPatientDeletion(patient._id)}
                    >
                      <MdDelete />
                    </BtnsTable>

                    <BtnsTable className={"showTable"}>
                      <Link to={"patient-show/" + patient._id}>
                        <IoDocumentText size={15} />
                      </Link>
                    </BtnsTable>

                    <BtnsTable className={"therapyTable"}>
                      <Link to={"patient-therapy/" + patient._id}>
                        <FaTooth />
                      </Link>
                    </BtnsTable>
                  </TdTable>
                </tr>
              );
            })}
          </Tbody>
        )}
      </Table>
      {!load && patients.length < 1 && (
        <div className="notFindSection">
          <p>No existen pacientes</p>
        </div>
      )}
      <ModalPatientDelete
        confirm={confirmingPatientDeletion}
        setConfirm={setConfirmingPatientDeletion}
        patientId={idPatient}
        setPatients={setPatients}
        patients={patients}
      />
    </>
  );
}

export default React.memo(TablePatient);
