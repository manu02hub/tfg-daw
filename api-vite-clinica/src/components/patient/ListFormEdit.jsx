import React, { useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import FormEditTutor from "./FormEditTutor";

function ListFormEdit({
  idPatient,
  Idtutors,
  setIdTutors,
  setConfirmDeleteTutor,
  tutorGet,
  setTutorGet,
  contactTutors,
  setContactTutors,
  loading,
  setLoading,
}) {

  useEffect(() => {
    dataTutor();
  }, []);

  const dataTutor = async () => {
    let tutors;
    tutors = await getTutor();
    await getContactTutors(tutors);
  };

  const getTutor = async () => {
    let promises = [];
    let auxTutor;

    promises = Idtutors.map(async (element) => {
      const { datos, cargando } = await PeticionAJAX(
        Global.url + "tutor/get-tutor/" + element,
        "GET"
      );

      if (datos.state == "success" && !cargando) {
        // setTutorGet(datos.tutor);
        auxTutor = datos.tutor;
        // setDirectionGet(datos.tutor.id_direction);
      }

      return auxTutor;
    });

    const resolvedPromises = await Promise.all(promises);
    const tut = resolvedPromises.filter((tut) => tut); // Filter out undefined values

    setTutorGet(tut);
    // console.log(tut.id_direction)
    // setDirectionGet(tut.id_direction);

    return tut;
  };

  const getContactTutors = async (tut) => {
    let promises = [];
    let auxContact;

    promises = tut.map(async (element) => {
      const { datos, cargando } = await PeticionAJAX(
        Global.url + "contact/get-contact/" + element.id_contact,
        "GET"
      );

      if (datos.state == "success" && !cargando) {
        auxContact = datos.contact;
      }

      return auxContact;
    });

    const resolvedPromises = await Promise.all(promises);
    const con = resolvedPromises.filter((con) => con); // Filter out undefined values
    setContactTutors(con);

    setLoading(false);
  };

  return (
    <>
    {console.log(tutorGet)}
      {!loading &&
        tutorGet.map((idT, index) => {
          return (
            <FormEditTutor
              key={idT._id}
              idTutor={idT._id}
              idPatient={idPatient}
              Idtutors={Idtutors}
              setIdTutors={setIdTutors}
              setConfirmDeleteTutor={setConfirmDeleteTutor}
              tutorGet={tutorGet}
              setTutorGet={setTutorGet}
              dataTutor={idT}
              contactTutors={contactTutors}
              setContactTutors={setContactTutors}
              dataContact={contactTutors[index]}
            />
          );
        })}
    </>
  );
}

export default ListFormEdit;
