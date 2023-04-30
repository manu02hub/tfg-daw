import React, { useState, useEffect, forwardRef } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { checkPermission } from "../../helpers/CheckPermissions";

function SelectRol({ auth, ...props }, ref) {
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

  return (
    <>
      {!loading && (
        <select {...props} ref={input}>
          {roles.map((rol) => {
            if (auth && checkPermission(auth.permissions, "add-adminClinic")) {
              let aux = rol.id_permissions.filter(
                (id) => id == auth.permissions._id
              );
              return (
                !checkPermission(rol.id_permissions, "add-admins") && (
                  <option key={rol._id} value={rol._id}>
                    {rol.name}
                  </option>
                )
              );
            } else {
              return (
                <option key={rol._id} value={rol._id}>
                  {rol.name}
                </option>
              );
            }
          })}
        </select>
      )}
    </>
  );
}

export default forwardRef(SelectRol);
