import React from "react";
import { FaSearch, FaClinicMedical } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiShowAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdDelete, MdEmail } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import userImage from "../../assets/user.jpg";

function CardUser({name, rol, clinic , email}) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="cardUser">
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
          <div className="cardShow">
            <BiShowAlt></BiShowAlt>
            <span>Show</span>
          </div>
          <hr />
          <div className="cardEdit">
            <FiEdit></FiEdit>
            <span>Edit</span>
          </div>
          <hr />
          <div className="cardDelete">
            <MdDelete></MdDelete>
            <span>Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardUser;
