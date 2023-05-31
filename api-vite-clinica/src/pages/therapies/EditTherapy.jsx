import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import CardBasic from "../../components/CardBasic";
import HeaderSection from "../../components/HeaderSection";
import FormEditTherapy from '../../components/therapy/FormEditTherapy';
import useAuth from '../../hooks/useAuth';

function EditTherapy() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const {auth} = useAuth();
  return (
    <>
      <HeaderSection title={"Editar Tratamiento"}/>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-12 col-md-10 col-lg-8">
                <section className="section-card">
                  <h2>Edita el Tratamiento</h2>
                  <p>
                    Cambia los precios en tu clínica
                  </p>
                  <FormEditTherapy id={id} loading={loading} setLoading={setLoading} auth={auth}/>
                </section>
              </div>
            </div>
          </CardBasic>
        </div>
      </div>
    </>
  )
}

export default EditTherapy