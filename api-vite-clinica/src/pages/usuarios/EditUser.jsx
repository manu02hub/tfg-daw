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

function EditUser() {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { auth } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

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

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
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
                      <h2>Profile information</h2>
                      <p>
                        Update your account's profile information and email
                        address.
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
                      <h2>Update password</h2>
                      <p>
                        Ensure your account is using a long, random password to
                        stay secure.
                      </p>
                      <FormNewPassword user={user}/>
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
                      <h2>Delete Account</h2>
                      <p>
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Before deleting your
                        account, please download any data or information that
                        you wish to retain.
                      </p>
                      <div className="separadorBtn">
                        <button
                          onClick={() => confirmUserDeletion()}
                          className="btnDelete"
                        >
                          Delete Account
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </CardBasic>
            </div>
          </div>

          {confirmingUserDeletion && (
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
              <p>Este es mi modal</p>
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default EditUser;
