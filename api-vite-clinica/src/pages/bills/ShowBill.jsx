import React,{useState} from "react";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import Spinner from "../../components/Spinner";
import TableBill from "../../components/bill/TableBill";
import { useParams } from "react-router-dom";

function ShowBill() {
  const [loading, setLoading] = useState(true);

  const {id} = useParams();
  return (
    <>
      {loading && <Spinner />}
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
              reference={id}
            />
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default ShowBill;
