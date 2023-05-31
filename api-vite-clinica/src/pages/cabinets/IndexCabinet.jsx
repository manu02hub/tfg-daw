import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import Spinner from "../../components/Spinner";
import FormCreateCabinet from "../../components/cabinet/FormCreateCabinet";
import ListCabinet from "../../components/cabinet/ListCabinet";

function IndexCabinet() {

  const [loading, setLoading] = useState(true);
  const [cabinets, setCabinets] = useState({});
  const { auth } = useAuth();

  return (
    <>
      {loading && <Spinner />}
      <HeaderSection title={"Gabinetes"} />
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12">
          <div className="row">

            <ListCabinet
              auth={auth}
              load={loading}
              setLoad={setLoading}
              cabinets={cabinets}
              setCabinets={setCabinets}
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-12 col-sm-12">
          <CardBasic>
            <span>Añadir Gabinete</span>
            <FormCreateCabinet
              auth={auth}
              cabinets={cabinets}
              setCabinets={setCabinets}
            />
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default IndexCabinet;
