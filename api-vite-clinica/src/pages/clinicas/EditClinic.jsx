import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CardBasic from "../../components/CardBasic";
import HeaderSection from "../../components/HeaderSection";
import Spinner from "../../components/Spinner";
import FormEditClinic from "../../components/clinic/FormEditClinic";

function EditClinic() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  return (
    <>
      {loading && <Spinner />}
      <HeaderSection title={"Edit clinic"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <section className="section-card">
                  <h2>Edit your clinic </h2>
                  <p>You can change the data of clinics</p>
                   <FormEditClinic id={id} loading={loading} setLoading={setLoading} />
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
