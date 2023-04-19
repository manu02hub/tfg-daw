import React, { createContext, useEffect, useState } from "react";
import { Global } from "../helpers/Global";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    //Sacara datos del usuario identificado

    let respuesta;
    let userObj;
    let userId;
    let request;
    let data;

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      setAuth({});
      setLoading(false);
    } else {
      //Transformar los datos a en Objeto en javascript
      userObj = JSON.parse(user);

      userId = userObj._id;

      //Peticion ajax que compruebe el token y me devuelva los datos del usuario

      request = await fetch(Global.url + "user/get-user/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Authorization: token,
        },
      });

      data = await request.json();

      console.log(data.user);

      //Seteo estado auth
      setAuth(data.user);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
