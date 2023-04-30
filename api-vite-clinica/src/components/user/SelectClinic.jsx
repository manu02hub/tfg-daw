import React, { useState, useEffect, forwardRef } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { checkPermission } from "../../helpers/CheckPermissions";

function SelecClinic({ auth, ...props }, ref) {
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
        <select {...props} ref={input}>
          {clinics.map((clinic) => {
            if (
              auth &&
              checkPermission(auth.permissions, "add-adminClinic")
            ) {
              return (
                clinic._id == auth.id_clinic && (
                  <option key={clinic._id} value={clinic._id}>
                    {clinic.name}
                  </option>
                )
              );
            } else {

              return (
                <option key={clinic._id} value={clinic._id}>
                  {clinic.name}
                </option>
              );
            }

            // if (
            //   auth &&
            //   checkPermission(auth.permissions, "gestion-admin-user")
            // ) {
            //   return (
            //     <option key={clinic._id} value={clinic._id}>
            //       {clinic.name}
            //     </option>
            //   );
            // }
          })}
        </select>
      )}
    </>
  );
}

export default forwardRef(SelecClinic);
