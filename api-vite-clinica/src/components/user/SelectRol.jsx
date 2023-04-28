import React, { useState, useEffect, forwardRef } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import SelectInput from "../SelectInput";

function SelectRol({ val }, ref) {
  const input = ref ? ref : useRef();
  
  const [roles, setRoles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoles();
    
  }, []);

  const getRoles = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "rol/getAll-roles",
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setRoles(datos.roles);
      setLoading(false);
   
    }
  };

  const handleChange = (event) => {
    console.log(event.target.value);
  
   
  };

  return (
    <>
      {!loading && (
        <SelectInput
          name={"id_rol"}
          ref={input}
          defaultValue={val}
          onChange ={(event) => handleChange(event)}
        >
          {roles.map((rol) => {
            return (
              <option key={rol._id} value={rol._id}>
                {rol.name}
              </option>
            );
          })}
        </SelectInput>
      )}
    </>
  );
}

export default forwardRef(SelectRol);
