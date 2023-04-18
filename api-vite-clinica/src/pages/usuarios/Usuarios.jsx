import React from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import CardUser from "../../components/user/CardUser";

function Usuarios() {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="section-information">
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
                <button className="btnAdd">
                  <BsPersonFillAdd></BsPersonFillAdd>
                  <span>Add User</span>
                </button>
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
        </div>
      </div>
    </div>
  );
}

export default Usuarios;
