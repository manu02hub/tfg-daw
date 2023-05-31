import React, { useState } from "react";
import CardBasic from "../../components/CardBasic";
import TableClinic from "../../components/clinic/TableClinic";
import FormCreateClinic from "../../components/clinic/FormCreateClinic";
import HeaderSection from "../../components/HeaderSection";
import Spinner from "../../components/Spinner";
import useAuth from "../../hooks/useAuth";

function IndexClinic() {
  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState({});
  const {auth} = useAuth();

  return (
    <>
      {loading && <Spinner />}
      <HeaderSection title={"Clinicas"} />
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12">
          <CardBasic>
            <div className="headerSection">
              <div className="headerName">
                <h4>Todas mis clinicas</h4>
              </div>
              <div className="headerSearch">
                <form>
                  <label>Buscar: </label>
                  <input className="inputSearch"></input>
                </form>
              </div>
            </div>
            <TableClinic
              load={loading}
              setLoad={setLoading}
              clinics={clinics}
              setClinics={setClinics}
            />
          </CardBasic>
        </div>

        <div className="col-lg-4 col-md-12 col-sm-12">
          <CardBasic>
            <span>Añadir Clinica</span>

            <FormCreateClinic clinics={clinics} setClinics={setClinics} auth={auth} />
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default IndexClinic;
