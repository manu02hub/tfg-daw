import React from "react";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import Spinner from "../../components/Spinner";
import TableBill from "../../components/bill/TableBill";

function EditBill() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {!loading && <Spinner />}
      <HeaderSection title={"Facturas"} />
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
            <TableBill
              load={loading}
              setLoad={setLoading}
              //    therapies={therapies}
              //    setTherapies={setTherapies}
            />
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default EditBill;
