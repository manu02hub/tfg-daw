import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import ModalUserDelete from "./ModalUserDelete";
import { FaSearch, FaClinicMedical } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiShowAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import userImage from "../../assets/user.jpg";
import useAuth from "../../hooks/useAuth";

function CardUser({ userInfo, showCard, setId, users, setUsers }) {
  const [clinic, setClinic] = useState({});
  const [loading, setLoading] = useState(true);
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const {auth} = useAuth();

  useEffect(() => {
    getClinic();
  }, []);

  const show = (id) => {
    showCard(true);
    setId(id);
  };

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const getClinic = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "clinic/get-clinic/" + userInfo.id_clinic,
      "GET"
    );

    if (datos.state == "success" && !cargando) {
      setClinic(datos.clinic);
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      {!loading && (
        <>
          <div className="cardUser shadow">
            <div className="cardOrder">
              <div className="cardImg">
                <img src={userImage}></img>
              </div>
              <div className="cardData">
                <div className="dataName">
                  <span>{userInfo.name}</span>
                </div>
                <div className="dataRow">
                  <div className="dataRol">
                    <AiOutlineArrowRight className="icon"></AiOutlineArrowRight>
                    <span>{userInfo.id_rol.name}</span>
                  </div>
                  <div className="dataClinic">
                    <FaClinicMedical className="icon"></FaClinicMedical>
                    <span>{clinic.name}</span>
                  </div>
                  <div className="dataEmail">
                    <HiOutlineMailOpen className="icon"></HiOutlineMailOpen>
                    <span>{userInfo.email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cardOperations">
              <Link className="cardShow" onClick={() => show(userInfo._id)}>
                <BiShowAlt className="icon"></BiShowAlt>
                <span>Mostrar</span>
              </Link>
              <hr />
              <Link
                to={"/panel/users/user-edit/" + userInfo._id}
                className="cardEdit"
              >
                <FiEdit className="icon"></FiEdit>
                <span>Editar</span>
              </Link>
              <hr />
              <div className="cardDelete" onClick={() => confirmUserDeletion()}>
                <MdDelete className="icon"></MdDelete>
                <span>Eliminar</span>
              </div>
            </div>
          </div>
          <ModalUserDelete
            confirm={confirmingUserDeletion}
            setConfirm={setConfirmingUserDeletion}
            user={userInfo}
            auth={auth}
            users={users}
            setUsers={setUsers}
          />
        </>
      )}
    </div>
  );
}

export default CardUser;
