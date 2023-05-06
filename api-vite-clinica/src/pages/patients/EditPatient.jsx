import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderSection from "../../components/HeaderSection";
import FormEditPatient from "../../components/patient/FormEditPatient";

function EditPatient() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  return (
    <>
      <HeaderSection title={"Edit Patient"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <FormEditPatient id={id} loading={loading} setLoading={setLoading} />
        </div>
      </div>
    </>
  );
}

export default EditPatient;
