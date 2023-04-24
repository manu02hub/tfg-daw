import React from "react";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import TableTherapie from "../../components/therapie/TableTherapie";
import FormCreateTherapie from "../../components/therapie/FormCreateTherapie";

function IndexTherapie() {
  return (
    <>
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
                  <label>Search: </label>
                  <input className="inputSearch"></input>
                </form>
              </div>
            </div>
            <TableTherapie />
          </CardBasic>
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12">
          <CardBasic>
            <span>Añadir Clinica</span>
            <FormCreateTherapie />
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default IndexTherapie;
