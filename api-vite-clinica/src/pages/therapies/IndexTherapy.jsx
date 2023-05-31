import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import TableTherapy from "../../components/therapy/TableTherapy";
import FormCreateTherapy from "../../components/therapy/FormCreateTherapy";
import Spinner from "../../components/Spinner";

function IndexTherapy() {
  const [loading, setLoading] = useState(true);
  const [therapies, setTherapies] = useState({});

  const {auth} = useAuth();

  return (
    <>
      {loading && <Spinner />}
      <HeaderSection title={"Tratamientos"} />
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12">
          <CardBasic>
            <div className="headerSection">
              <div className="headerName">
                <h4>Todos mis Tratamientos</h4>
              </div>
              <div className="headerSearch">
                <form>
                  <label>Buscar: </label>
                  <input className="inputSearch"></input>
                </form>
              </div>
            </div>
            <TableTherapy
              load={loading}
              setLoad={setLoading}
              therapies={therapies}
              setTherapies={setTherapies}
              auth={auth}
            />
          </CardBasic>
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12">
          <CardBasic>
            <span>Añadir Tratamiento</span>
            <FormCreateTherapy
              therapies={therapies}
              setTherapies={setTherapies}
              auth={auth}
            />
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default IndexTherapy;
