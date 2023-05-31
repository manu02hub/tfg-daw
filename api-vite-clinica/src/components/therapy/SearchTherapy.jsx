import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";

function SearchTherapy({ setTherapies }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm !== "") {
      searchTherapies();
    } else {
      getTherapies();
    }
  }, [searchTerm]);

  const searchTherapies = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy/search-therapy/" + searchTerm,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setTherapies(datos.therapies);
    }
  };

  const getTherapies = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "therapy/all-therapies",
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setTherapies(datos.therapies);
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
        placeholder="Nombre..."
        value={searchTerm}
        onChange={handleSearch}
      ></input>
    </div>
  );
}

export default SearchTherapy;
