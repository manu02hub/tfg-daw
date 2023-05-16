import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";

function SelectTherapyPatient({ patient, ...props }, ref) {
  const input = ref ? ref : useRef();
  const [loading, setLoading] = useState(true);
  const [patientTherapies, setPatientTherapies] = useState({});
  const [teeth, setTeeth] = useState([]);

  useEffect(() => {
    if (patient !== 0) {
      getTherapies_has_Patient();
    }
  }, [patient]);

  const getTherapies_has_Patient = async () => {
    let aux;
    let promises = [];
    let resolvedPromises;
    let teethAux;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy_has_patient/get-therapy_has_patient/" + patient,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      aux = datos.therapy_has_patient;
      setPatientTherapies(datos.therapy_has_patient);
    } else {
      setError(datos.message);
    }

    promises = aux.map(async (element) => {
      const { datos, cargando } = await PeticionAJAX(
        Global.url + "tooth/get-teeth/" + element.id_tooth,
        "GET"
      );

      if (datos.state == "success" && !cargando) {
        return datos.teeth;
      }
    });

    resolvedPromises = await Promise.all(promises);
    teethAux = resolvedPromises.filter((teeth) => teeth); // Filter out undefined values

    setTeeth(teethAux);
    setLoading(false);
  };

  return (
    <>
      <select {...props} ref={input} multiple>
        {!loading &&
          patientTherapies.map((therapy,index) => {
            return (
              <option key={therapy._id} value={therapy._id}>
                {teeth[index].number + ""+ teeth[index].letter}  {therapy.id_therapy.name}
              </option>
            );
          })}
      </select>
    </>
  );
}

export default forwardRef(SelectTherapyPatient);
