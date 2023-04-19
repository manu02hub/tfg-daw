import React from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import CardUser from "../../components/user/CardUser";
import { Link } from "react-router-dom";

function IndexUser() {
  return (
    <>
      <div className="headerSection">
        <div className="headerName">
          <h3>Usuarios</h3>
        </div>
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
      </div>
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
