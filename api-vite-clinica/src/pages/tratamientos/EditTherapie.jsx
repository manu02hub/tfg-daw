import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import CardBasic from "../../components/CardBasic";
import HeaderSection from "../../components/HeaderSection";
import FormEditTherapy from '../../components/therapie/FormEditTherapy';

function EditTherapie() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  return (
    <>
      <HeaderSection title={"Edit Therapie"}/>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-12 col-md-10 col-lg-8">
                <section className="section-card">
                  <h2>Edit Therapie</h2>
                  <p>
                    Change your prices in your clinic
                  </p>
                  <FormEditTherapy id={id} loading={loading} setLoading={setLoading}/>
                </section>
              </div>
            </div>
          </CardBasic>
        </div>
      </div>
    </>
  )
}

export default EditTherapie