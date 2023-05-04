import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import BtnsTable from "../BtnsTable";
import ModalPatientDelete from "./ModalPatientDelete";

function TablePatient({ load, setLoad, patients, setPatients }) {
  
  const [idPatient, setIdPatient] = useState(0);
  const [confirmingPatientDeletion, setConfirmingPatientDeletion] =
    useState(false);

  const menuT = ["Nº Historial", "Nombre", "Apellidos", "Email", "Nif",  "Odontograma", "Telefono", "Activo", "Acciones"];

  useEffect(() => {
    // getClinics();
  }, []);

  const getPatients = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/all-patients",
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setPatients(datos.patients);

      setLoad(false);
    }
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
                  <TdTable>
                    <img src={patientImage} width={50} />
                    {patient.name}
                  </TdTable>

                  <TdTable> {patient.direction}</TdTable>

                  <TdTable>{patient.city}</TdTable>

                  <TdTable>{patient.c_postal}</TdTable>

                  <TdTable>
                    <BtnsTable className={"editTable"}>
                      <Link to={"patient-edit/" + patient._id}>
                        <FiEdit />
                      </Link>
                    </BtnsTable>

                    <BtnsTable
                      className={"deleteTable"}
                      onClick={() => confirmPatientDeletion(clinic._id)}
                    >
                      <MdDelete />
                    </BtnsTable>
                  </TdTable>
                </tr>
              );
            })}
          </Tbody>
        )}
      </Table>
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
