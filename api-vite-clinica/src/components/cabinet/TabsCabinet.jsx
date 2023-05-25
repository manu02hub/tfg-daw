import React, { useState, useEffect } from "react";
import Tab from "../../components/Tab";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { Global } from "../../helpers/Global";

function TabsCabinet({ toglleTab, setToggleTab }) {
  const [cabinets, setCabinets] = useState({});
  const [loading, setLoading] = useState(true);

  const change = (index, val) => {
    if (index !== val) {
      setToggleTab(index);
      //   loading(true);
    }
  };

  useEffect(() => {
    getAllCabinets();
  }, []);

  const getAllCabinets = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "cabinet/all-cabinets",
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setCabinets(datos.cabinets);
      setToggleTab(datos.cabinets[0]._id);
      setLoading(false);
    }
  };

  const getCalendarCabinet = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/getAll-user/" + auth._id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      usuarios(datos.allUsers);
      loading(false);
    }
  };

  return (
    <>
      <div className="section-calendar-tabs">
        <span>Gabinetes de la clínica</span>
        <br />
      </div>
      <div className="tabs-calendar">
        {!loading && (
          <>
            {cabinets.map((cabinet, index) => {
              return (
                <Tab key={index}
                  isActive={toglleTab}
                  val={cabinet._id}
                  text={cabinet.reference}
                  onClick={() => change(cabinet._id, toglleTab)}
                ></Tab>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

export default TabsCabinet;
