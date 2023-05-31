import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { checkPermission } from "../../helpers/CheckPermissions";

function SearchUser({ setUsers, auth }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm !== "") {
      searchUser();
    } else {
      if (auth && checkPermission(auth.permissions, "gestion-admin-user")) {
        getUsers();
      } else {
        getUsersClinic();
      }
    }
  }, [searchTerm]);

  const searchUser = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/search-user/" + searchTerm+"/"+auth.email,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setUsers(datos.users);
    }
  };

  const getUsers = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/getAll-user/" + auth._id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setUsers(datos.allUsers);
    }
  };

  const getUsersClinic = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/getUsers-clinic/" + auth._id + "/" + auth.id_clinic,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setUsers(datos.allUsers);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <form className="searchUser">
      <input
        type="text"
        className="inputSearch"
        placeholder="Email..."
        value={searchTerm}
        onChange={handleSearch}
      ></input>
    </form>
  );
}

export default SearchUser;
