import React from 'react';
import CardBasic from "../../components/CardBasic";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";
import HeaderSection from "../../components/HeaderSection";

function EditTherapie() {
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
                  <form className="formEdit">
                    <InputLabel>Name</InputLabel>
                    <InputText
                      type="text"
                      name="name"
                      defaultValue="Empaste"
                    ></InputText>

                    <div className="separadorForm">
                      <InputLabel>Precio</InputLabel>
                      <InputText
                        type="number"
                        name="precio"
                        defaultValue={50}
                      ></InputText>
                    </div>

                    <div className="separadorForm">
                      <InputLabel>Descuento</InputLabel>
                      <InputText
                        type="number"
                        name="descuento"
                        defaultValue={10}
                      ></InputText>
                    </div>
                    <div className="separadorBtn">
                      <input
                        type="submit"
                        className="btnsColor"
                        value={"Save"}
                      ></input>
                    </div>
                  </form>
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