import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import CardBasic from "../../components/CardBasic";
import Spinner from "../../components/Spinner";
import HeaderSection from "../../components/HeaderSection";
import FormEditUser from "../../components/user/FormEditUser";
import FormNewPassword from "../../components/user/FormNewPassword";
import Modal from "../../components/Modal";
import DeleteAccount from "../../components/user/DeleteAccount";

function EditUser() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    getUser();
  }, [id]);

  const getUser = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/edit-user/" + id,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setUser(datos.user);
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderSection title={"Edit User"} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <CardBasic>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <section className="section-card">
                      <h2>Información del perfil</h2>
                      <p>
                        Actualizar la información del perfil y el correo
                        electrónico de tu cuenta dirección.
                      </p>
                      <FormEditUser user={user} auth={auth} />
                    </section>
                  </div>
                </div>
              </CardBasic>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <CardBasic>
                <div className="row">
                  <div className="col-sm-12 col-md-10 col-lg-8">
                    <section className="section-card">
                      <h2>Actualiza la contraseña</h2>
                      <p>
                        Asegúrese de que su cuenta esté usando una contraseña
                        larga y aleatoria para mantenerse seguro.
                      </p>
                      <FormNewPassword user={user} auth={auth} />
                    </section>
                  </div>
                </div>
              </CardBasic>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <CardBasic>
                <div className="row">
                  <div className="col-sm-12 col-md-10 col-lg-8">
                    <DeleteAccount user={user} auth={auth} />
                  </div>
                </div>
              </CardBasic>
            </div>
          </div>

          {/* {confirmingUserDeletion && (
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
              <p>Este es mi modal</p>
            </Modal>
          )} */}
        </>
      )}
    </>
  );
}

export default EditUser;
