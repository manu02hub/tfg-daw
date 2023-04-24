import React from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import CardUser from "../../components/user/CardUser";
import { Link } from "react-router-dom";
import CardShowUser from "../../components/user/CardShowUser";
import HeaderSection from "../../components/HeaderSection";

function IndexUser() {
  return (
    <>
      <HeaderSection title={"Usuarios"}>
        <div className="headerSearch">
          <form>
            <input
              type="search"
              placeholder="Search... "
              className="inputSearch"
            ></input>
            <Link to={"/panel/users/user-create"} className="btnAdd">
              <BsPersonFillAdd></BsPersonFillAdd>
              <span>Add User</span>
            </Link>
          </form>
        </div>
      </HeaderSection>
      <CardShowUser></CardShowUser>
      <div className="row">
        <CardUser
          name="Manuel Alonso Martín"
          rol={"Admin"}
          clinic={"Clinic Tooth Sesation"}
          email={"manuel@gmail.com"}
        />
        <CardUser
          name="Manuel Alonso Martín"
          rol={"Admin"}
          clinic={"Clinic Tooth Sesation"}
          email={"manuel@gmail.com"}
        />
        <CardUser
          name="Manuel Alonso Martín"
          rol={"Admin"}
          clinic={"Clinic Tooth Sesation"}
          email={"manuel@gmail.com"}
        />
      </div>
    </>
  );
}

export default IndexUser;
