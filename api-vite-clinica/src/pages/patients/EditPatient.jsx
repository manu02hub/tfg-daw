import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import FormEditPatient from "../../components/patient/FormEditPatient";
import FormEditTutor from "../../components/patient/FormEditTutor";
import FormCreateTutor from "../../components/patient/FormCreateTutor";
import ListFormEdit from "../../components/patient/ListFormEdit";
import useAuth from "../../hooks/useAuth";

function EditPatient() {
  const [loading, setLoading] = useState(true);
  const [tutorGet, setTutorGet] = useState({});
  const [contactTutors, setContactTutors] = useState({});

  const [Idtutors, setIdTutors] = useState([]);
  const [confirmNewTutor, setConfirmNewTutor] = useState(false);
  const [isSavedTutor, setIsSavedTutor] = useState(false);
  const [idTutor, setIdTutor] = useState(0);
  const [isMinor, setIsMinor] = useState(false);

  const { id } = useParams();
  const {auth} = useAuth();

  const addTutor = () => {
    setConfirmNewTutor(true);
  };

  return (
    <>
      <HeaderSection title={"Editar Paciente"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <FormEditPatient
            id={id}
            Idtutors={Idtutors}
            setIdTutors={setIdTutors}
            isSavedTutor={isSavedTutor}
            idTutor={idTutor}
            isMinor={isMinor}
            setIsMinor={setIsMinor}
            auth={auth}
          />

          {Idtutors.length <= 1 && !confirmNewTutor && (
            <CardBasic>
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <section className="section-card">
                    <h2>Añade un nuevo Tutor </h2>
                    <p>Todavía puede asignar un tutor a este paciente</p>
                    <div className="separadorBtn">
                      <button
                        type="button"
                        className="btnsPrimary"
                        onClick={() => addTutor()}
                      >
                        Añadir
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </CardBasic>
          )}

          {Idtutors.length >= 1 && (
            <ListFormEdit
              // key={id}
              idPatient={id}
              Idtutors={Idtutors}
              setIdTutors={setIdTutors}
              tutorGet={tutorGet}
              setTutorGet={setTutorGet}
              contactTutors={contactTutors}
              setContactTutors={setContactTutors}
              loading={loading}
              setLoading={setLoading}
            />
          )}

          {Idtutors.length < 2 && confirmNewTutor && (
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

export default EditPatient;
