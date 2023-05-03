import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import CardCabinet from "./CardCabinet";

function ListCabinet({ clinic, load, setLoad, cabinets, setCabinets }) {
  useEffect(() => {
    getCabinets();
  }, []);

  const getCabinets = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "cabinet/all-cabinetClinic/" + clinic,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setCabinets(datos.cabinets);
      setLoad(false);
    }
  };

  return (
    <>
      {!load &&
        cabinets.map((cabinet) => {
          return (
          
              <CardCabinet key={cabinet._id} cabinet={cabinet} cabinets={cabinets} setCabinets={setCabinets} />
            
          );
        })}
    </>
  );
}

export default React.memo(ListCabinet);
