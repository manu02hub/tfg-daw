import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";

function SearchPatient({ setPatients, idClinic }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm !== "") {
      searchPatient();
    } else {
      getPatients();
    }
  }, [searchTerm]);

  const searchPatient = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/search-patient/" + searchTerm,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setPatients(datos.patients);
    }
  };

  const getPatients = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "patient/all-patients/"+idClinic,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setPatients(datos.patients);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <label>Buscar: </label>
      <input
        type="text"
        className="inputSearch searchPatient"
        placeholder="NIF..."
        value={searchTerm}
        onChange={handleSearch}
      ></input>
    </>
  );
}

export default SearchPatient;
