import React from "react";
import CardBasic from "../../components/CardBasic";
import TableClinic from "../../components/clinic/TableClinic";
import FormCreateClinic from "../../components/clinic/FormCreateClinic";
import HeaderSection from "../../components/HeaderSection";

function IndexClinic() {
  return (
    <>
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
                  <label>Search: </label>
                  <input className="inputSearch"></input>
                </form>
              </div>
            </div>
            <TableClinic />
          </CardBasic>
        </div>

        <div className="col-lg-4 col-md-12 col-sm-12">
          <CardBasic>
            <span>Añadir Clinica</span>

            <FormCreateClinic />
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default IndexClinic;
