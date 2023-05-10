import React, { useState, useEffect, forwardRef } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";

function SelectOdontogram({ ...props }, ref) {
  const input = ref ? ref : useRef();
  const [loading, setLoading] = useState(true);
  const [odontograms, setOdontograms] = useState({});

  useEffect(() => {
    getOdontograms();
  }, []);

  const getOdontograms = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "odontogram/all-odontograms",
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setOdontograms(datos.odontograms);

      setLoading(false);
    }
  };

  return (
    <>
      {!loading && (
        <select {...props} ref={input}>
          {odontograms.map((odontogram) => {
            return (
              <option key={odontogram._id} value={odontogram._id}>
                {odontogram.name}
              </option>
            );
          })}
        </select>
      )}
    </>
  );
}

export default forwardRef(SelectOdontogram);
