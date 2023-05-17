import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";

function SelectPatient({ patient, ...props }, ref) {
  const input = ref ? ref : useRef();
  const [loading, setLoading] = useState(true);
  const [patientSelect, setPatientSelect] = useState({});

  useEffect(() => {
    getPatient();
  }, []);

  const getPatient = async () => {

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/get-patient/" + patient,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setPatientSelect(datos.patient);
      setLoading(false);
    }
  };

  return (
    <>
      <select {...props} ref={input}>
        {!loading && patientSelect && (
          <option key={patientSelect._id} value={patientSelect._id}>
            {patientSelect.name}
          </option>
        )}
      </select>
    </>
  );
}

export default forwardRef(SelectPatient);
