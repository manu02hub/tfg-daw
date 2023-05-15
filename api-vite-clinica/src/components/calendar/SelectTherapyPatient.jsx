import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";

function SelectTherapyPatient({ patient, ...props }, ref) {
  const input = ref ? ref : useRef();
  const [loading, setLoading] = useState(true);
  const [patientTherapies, setPatientTherapies] = useState([]);
  const [teeth, setTeeth] = useState({});

  useEffect(() => {
    if (patient !== 0) {
      getTherapies_has_Patient();
    }
  }, [patient]);

  console.log(teeth);

  const getTherapies_has_Patient = async () => {
    let aux;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy_has_patient/get-therapy_has_patient/" + patient,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      aux = datos.therapy_has_patient;
      setPatientTherapies(datos.therapy_has_patient);

      aux.map(async (element, index) => {
        const { datos, cargando } = await PeticionAJAX(
          Global.url + "tooth/get-teeth/" + element.id_tooth,
          "GET"
        );

        if (datos.state == "success" && !cargando){
            console.log(datos);
            setTeeth([...teeth, datos.teeth]);
        }

        if (datos.state == "success" && !cargando && index == aux.length - 1) {
           
          setTeeth([...teeth, datos.teeth]);
          setLoading(false);
        }
      });
    } else {
      setError(datos.message);
    }
  };

  return (
    <>
      <select {...props} ref={input} multiple>
        {!loading &&
          patientTherapies.map((therapy) => {
            return (
              <option key={therapy._id} value={therapy._id}>
                {therapy.id_therapy.name}
              </option>
            );
          })}
      </select>
    </>
  );
}

export default forwardRef(SelectTherapyPatient);
