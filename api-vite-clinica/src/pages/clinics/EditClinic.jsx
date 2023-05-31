import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CardBasic from "../../components/CardBasic";
import HeaderSection from "../../components/HeaderSection";
import Spinner from "../../components/Spinner";
import FormEditClinic from "../../components/clinic/FormEditClinic";
import useAuth from "../../hooks/useAuth";

function EditClinic() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const {auth} = useAuth();

  return (
    <>
      {loading && <Spinner />}
      <HeaderSection title={"Editar clínica"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <section className="section-card">
                  <h2>Edita tu clínica </h2>
                  <p>Cambia los datos de tu clínica</p>
                   <FormEditClinic id={id} loading={loading} setLoading={setLoading} auth={auth} />
                </section>
              </div>
            </div>
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default EditClinic;
