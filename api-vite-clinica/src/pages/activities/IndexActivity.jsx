import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import Spinner from "../../components/Spinner";
import TableActivity from "../../components/activity/TableActivity";

function IndexActivity() {

  const [loading, setLoading] = useState(true);
  const {auth} = useAuth();

  return (
    <>
      {loading && <Spinner />}
      <HeaderSection title={"Actividad de la Clínica"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            {/* <div className="headerSection">
              <div className="headerName">
                <h4>Todos mis Tratamientos</h4>
              </div>
              <div className="headerSearch">
                <form>
                  <label>Buscar: </label>
                  <input className="inputSearch"></input>
                </form>
              </div>
            </div> */}
            <TableActivity
              load={loading}
              setLoad={setLoading}
              idClinic={auth.id_clinic}
            />
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default IndexActivity;
