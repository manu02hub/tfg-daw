import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Tab from "../Tab";
import Tabs from "../Tabs";

function TabsUser({ auth, usuarios, loading, showUser }) {
  const [toglleTab, setToggleTab] = useState(1);

  const change = (index, val) => {
    if (index !== val) {
      setToggleTab(index);
      loading(true);
      showUser(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [toglleTab]);

  const getAllUsers = () => {
    switch (toglleTab) {
      case 1:
        getUsers();
        break;
      case 2:
        getUsersClinic();
        break;
    }
  };

  const getUsers = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/getAll-user/" + auth._id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      usuarios(datos.allUsers);
      loading(false);
    }
  };

  const getUsersClinic = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/getUsers-clinic/" + auth._id + "/" + auth.id_clinic,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      usuarios(datos.allUsers);
      loading(false);
    }
  };

  return (
    <Tabs>
      <Tab
        isActive={toglleTab}
        val={1}
        text={"Todos los usuarios"}
        onClick={() => change(1, toglleTab)}
      ></Tab>
      <Tab
        isActive={toglleTab}
        val={2}
        text={"Usuarios de la Clinica"}
        onClick={() => change(2, toglleTab)}
      ></Tab>
    </Tabs>
  );
}

export default TabsUser;
