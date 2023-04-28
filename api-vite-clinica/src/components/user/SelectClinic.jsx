import React, { useState, useEffect, forwardRef } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import SelectInput from "../SelectInput";

function SelecClinic({ valor }, ref) {
  const input = ref ? ref : useRef();
  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState({});

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

      setLoading(false);
    }
  };

  return (
    <>
      {!loading && (
        <SelectInput name={"id_clinic"} ref={input} defaultValue={valor} onChange = {event => event.target.value}>
          {clinics.map((clinic) => {
            return (
              <option key={clinic._id} value={clinic._id}>
                {clinic.name}
              </option>
            );
          })}
        </SelectInput>
      )}
    </>
  );
}

export default forwardRef(SelecClinic);
