import React from "react";
import { FaSearch, FaClinicMedical } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiShowAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import userImage from "../../assets/user.jpg";
import { Link } from "react-router-dom";

function CardUser({name, rol, clinic , email}) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="cardUser shadow">
        <div className="cardOrder">
          <div className="cardImg">
            <img src={userImage}></img>
          </div>
          <div className="cardData">
            <div className="dataName">
              <span>{name}</span>
            </div>
            <div className="dataRow">
              <div className="dataRol">
                <AiOutlineArrowRight className="icon"></AiOutlineArrowRight>
                <span>{rol}</span>
              </div>
              <div className="dataClinic">
                <FaClinicMedical className="icon"></FaClinicMedical>
                <span>{clinic}</span>
              </div>
              <div className="dataEmail">
                <HiOutlineMailOpen className="icon"></HiOutlineMailOpen>
                <span>{email}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="cardOperations">
          <Link to={"/panel/users/user-show"} className="cardShow">
            <BiShowAlt className="icon"></BiShowAlt>
            <span>Show</span>
          </Link>
          <hr />
          <Link to={"/panel/users/user-edit"} className="cardEdit">
            <FiEdit className="icon"></FiEdit>
            <span>Edit</span>
          </Link>
          <hr />
          <div className="cardDelete">
            <MdDelete className="icon"></MdDelete>
            <span>Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardUser;
