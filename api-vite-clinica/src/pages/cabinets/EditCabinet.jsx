import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderSection from "../../components/HeaderSection";
import CardBasic from "../../components/CardBasic";
import FormEditCabinet from "../../components/cabinet/FormEditCabinet";

function EditCabinet() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  return (
    <>
      <HeaderSection title={"Edit Cabinet"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-12 col-md-10 col-lg-8">
                <section className="section-card">
                  <h2>Editar Gabinete</h2>
                  <p>Cambia el nombre de tu gabinete</p>
                  <FormEditCabinet
                    id={id}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </section>
              </div>
            </div>
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default EditCabinet;
