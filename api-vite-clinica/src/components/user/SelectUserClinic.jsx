import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";

function SelectUserClinic({ clinic, ...props }, ref) {
  const input = ref ? ref : useRef();
  const [loading, setLoading] = useState(true);
  const [usersClinic, setUsersClinic] = useState({});

  useEffect(() => {
    getUsersClnic();
  }, [clinic]);

  const getUsersClnic = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/getUsers-clinic/" + clinic,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setUsersClinic(datos.allUsers);

      setLoading(false);
    }
  };

  return (
    <>
      {!loading && (
        <select {...props} ref={input}>
          {usersClinic.map((user) => {
            return (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            );
          })}
        </select>
      )}
    </>
  );
}

export default forwardRef(SelectUserClinic);
