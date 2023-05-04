import React, { useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import { BsPersonFillAdd } from "react-icons/bs";
import Search from "../../components/Search";
import BtnAdd from "../../components/BtnAdd";
import CardBasic from "../../components/CardBasic";
import TablePatient from "../../components/patient/TablePatient";

function IndexPatient() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState({});

  return (
    <>
      <HeaderSection title={"Pacientes"}>
        <div className="headerSearch">
          <Search />
          <BtnAdd to={""} add={"Add Patient"}>
            <BsPersonFillAdd></BsPersonFillAdd>
          </BtnAdd>
        </div>
      </HeaderSection>

      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="headerSection">
              <div className="headerName">
                <h4>Todas mis pacientes</h4>
              </div>
              <div className="headerSearch">
                <form>
                  <label>Search: </label>
                  <input className="inputSearch"></input>
                </form>
                <BtnAdd to={""} add={"Add Patient"}>
                  <BsPersonFillAdd></BsPersonFillAdd>
                </BtnAdd>
              </div>
            </div>
            <TablePatient
              load={loading}
              setLoad={setLoading}
              patients={patients}
              setPatients={setPatients}
            />
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default IndexPatient;
