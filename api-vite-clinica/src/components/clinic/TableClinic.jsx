import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import clinicImage from "../../assets/clinic.jpg";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import BtnsTable from "../BtnsTable";
import ModalClinicDelete from "./ModalClinicDelete";

function TableClinic({ load, setLoad, clinics, setClinics }) {
  
  const [idClinic, setIdClinic] = useState(0);
  const [confirmingClinicDeletion, setConfirmingClinicDeletion] =
    useState(false);

  const menuT = ["Clínica", "Dirección", "Ciudad", "C Postal", "Acciones"];

  useEffect(() => {
    getClinics();
  }, []);

  const getClinics = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "clinic/all-clinics",
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setClinics(datos.clinics);

      setLoad(false);
    }
  };

  const confirmClinicDeletion = (id) => {
    setIdClinic(id);

    setConfirmingClinicDeletion(true);
  };

  return (
    <>
      <Table>
        <Thead menu={menuT} />
        {!load && (
          <Tbody>
            {clinics.map((clinic) => {
              return (
                <tr key={clinic._id}>
                  <TdTable>
                    <img src={clinicImage} width={50} />
                    {clinic.name}
                  </TdTable>

                  <TdTable> {clinic.direction}</TdTable>

                  <TdTable>{clinic.city}</TdTable>

                  <TdTable>{clinic.z_code}</TdTable>

                  <TdTable>
                    <BtnsTable className={"editTable"}>
                      <Link to={"clinic-edit/" + clinic._id}>
                        <FiEdit />
                      </Link>
                    </BtnsTable>

                    <BtnsTable
                      className={"deleteTable"}
                      onClick={() => confirmClinicDeletion(clinic._id)}
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
      {!load && clinics.length < 1 && (
        <div className="notFindSection">
          <p>No existen clínicas</p>
        </div>
      )}
      <ModalClinicDelete
        confirm={confirmingClinicDeletion}
        setConfirm={setConfirmingClinicDeletion}
        clinicId={idClinic}
        setClinics={setClinics}
        clinics={clinics}
      />
    </>
  );
}

export default React.memo(TableClinic);
