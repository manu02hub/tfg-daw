import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";

function SelectTherapy({ ...props }, ref) {

    const input = ref ? ref : useRef();
    const [loading, setLoading] = useState(true);
    const [therapies, setTherapies] = useState({});
  
    useEffect(() => {
        getTherapies();
    }, []);
  
    const getTherapies = async () => {
      const { datos, cargando } = await PeticionAJAX(
        Global.url + "therapy/all-therapies",
        "GET"
      );
  
      if (datos.state == "success" && !cargando) {
        setTherapies(datos.therapies);
  
        setLoading(false);
      }
    };

  return (
    <>
    {!loading && (
      <select {...props} ref={input}>
        {therapies.map((therapy) => {
          return (
            <option key={therapy._id} value={therapy._id}>
              {therapy.name}
            </option>
          );
        })}
      </select>
    )}
  </>
  )
}

export default forwardRef(SelectTherapy);