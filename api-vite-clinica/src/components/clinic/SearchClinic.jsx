import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";

function SearchClinic({ setClinics }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm !== "") {
      searchClinics();
    } else {
      getClinics();
    }
  }, [searchTerm]);

  const searchClinics = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "clinic/search-clinic/" + searchTerm,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setClinics(datos.clinics);
      console.log(datos.clinics);
    }
  };

  const getClinics = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "clinic/all-clinics",
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setClinics(datos.clinics);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="headerSearch">
      <label>Buscar: </label>
      <input
        type="text"
        className="inputSearch"
        placeholder="C/..."
        value={searchTerm}
        onChange={handleSearch}
      ></input>
    </div>
  );
}

export default SearchClinic;
