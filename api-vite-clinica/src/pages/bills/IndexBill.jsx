import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import Spinner from "../../components/Spinner";
import TableReferenceBill from "../../components/bill/TableReferenceBill";


function IndexBill() {

  const [loading, setLoading] = useState(true);
  const {auth} = useAuth();

  return (
    <>
      {loading && <Spinner />}
      <HeaderSection title={"Facturas"} />
      <div className="row">
        <div className="col-lg-10 col-md-12 col-sm-12">
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
            <TableReferenceBill
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

export default IndexBill;
