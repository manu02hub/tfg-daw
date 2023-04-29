import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import CardBasic from "../../components/CardBasic";
import userImage from "../../assets/user.jpg";
import clinicImage from "../../assets/clinic.jpg";

function CardShowUser({ id_user }) {
  const [user, setUser] = useState({});
  const [clinic, setClinic] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(id_user);

  useEffect(() => {
    getUser();
  }, [id_user]);

  const getUser = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/get-user/" + id_user,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setUser(datos.user);
      getClinic(datos.user.id_clinic);
    }
  };

  const getClinic = async (id_clinic) => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "clinic/get-clinic/" + id_clinic,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setClinic(datos.clinic);
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        {!loading && (
          <CardBasic className="showSpace">
            <div className="row">
              <div className="col-lg-5 col-md-12 col-sm-12">
                <div className="boxShowUser">
                  <div className="boxShowImg">
                    <img src={userImage}></img>
                  </div>
                  <div className="cardShowUser">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <p>{user.name_rol}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12">
                <section className="sectionShowClinic">
                  <div className="sectionInfoClinic">
                    <h3>Clinica ToothSensation </h3>
                    <div className="boxInfoclinic">
                      <div className="columnClinic">
                        <span>
                          Direccion
                          {/* font-size: 0.8rem; font-weight: 500; */}
                        </span>
                        <p>{clinic.direction}</p>
                      </div>
                      <div className="columnClinic">
                        <span>
                          Ciudad
                          {/* font-size: 0.8rem; font-weight: 500; */}
                        </span>
                        <p>{clinic.city}</p>
                      </div>
                      <div className="columnClinic">
                        <span>
                          Codigo Postal
                          {/* font-size: 0.8rem; font-weight: 500; */}
                        </span>
                        <p>{clinic.c_postal}</p>
                      </div>
                    </div>
                  </div>

                  <div className="sectionImgClinic">
                    <img src={clinicImage}></img>
                  </div>
                </section>
              </div>
            </div>
          </CardBasic>
        )}
      </div>
    </div>
  );
}

export default CardShowUser;
