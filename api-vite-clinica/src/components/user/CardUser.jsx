import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import toast, { Toaster } from "react-hot-toast";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { FaSearch, FaClinicMedical } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiShowAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import userImage from "../../assets/user.jpg";

function CardUser({ userInfo, showCard, setId, users, setUsers }) {
  const [clinic, setClinic] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClinic();
  }, []);

  const show = (id) => {
    showCard(true);
    setId(id);
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

  const deleteUser = async (id) => {
    let usuarios;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/delete-user/" + id,
      "DELETE"
    );

    if (datos.state == "success" && !cargando) {

      usuarios = users.filter((user) => user._id !== id);
      setUsers(usuarios);
      toast.success("Se ha eliminado el usuario correctamente");
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      {!loading && (
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
              <span>Show</span>
            </Link>
            <hr />
            <Link
              to={"/panel/users/user-edit/" + userInfo._id}
              className="cardEdit"
            >
              <FiEdit className="icon"></FiEdit>
              <span>Edit</span>
            </Link>
            <hr />
            <div
              className="cardDelete"
              onClick={() => deleteUser(userInfo._id)}
            >
              <MdDelete className="icon"></MdDelete>
              <span>Delete</span>
            </div>
          </div>
        </div>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default CardUser;
