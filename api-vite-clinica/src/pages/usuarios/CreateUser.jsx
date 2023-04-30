import React from "react";
import CardBasic from "../../components/CardBasic";
import HeaderSection from "../../components/HeaderSection";
import FormCreateUser from "../../components/user/FormCreateUser";
import useAuth from "../../hooks/useAuth";

function CreateUser() {
  
  const {auth} = useAuth();

  return (
    <>
      <HeaderSection title={"Create User"} />
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <CardBasic>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <section className="section-card">
                  <h2>Create a new account for workers </h2>
                  <p>
                    Update your account's profile information and email address.
                  </p>
                  <FormCreateUser auth={auth}/>
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
