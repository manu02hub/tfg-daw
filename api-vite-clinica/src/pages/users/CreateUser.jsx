import React from "react";
import CardBasic from "../../components/CardBasic";
import HeaderSection from "../../components/HeaderSection";
import FormCreateUser from "../../components/user/FormCreateUser";
import useAuth from "../../hooks/useAuth";

function CreateUser() {
  const { auth } = useAuth();

  return (
    <>
      <HeaderSection title={"Crear Usuario"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <section className="section-card">
                  <h2>Crea una nueva cuenta para trabajadores </h2>
                  <p>
                    Añade la información del perfil.
                  </p>
                  <FormCreateUser auth={auth} />
                </section>
              </div>
            </div>
          </CardBasic>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
