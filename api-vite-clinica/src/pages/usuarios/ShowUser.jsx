import React from "react";
import CardBasic from "../../components/CardBasic";

function ShowUser() {
  return (
    <>
      <div className="headerSection">
        <div className="headerName">
          <h3>Info User</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-4">
              <CardBasic>
                <div className="boxShowUser">
                  <div className="boxShowImg">
                    <img src="#"></img>
                  </div>
                  <div className="cardComponent">
                    <h3>Manuel Alonso Martín</h3>
                    <p>manuel@gmail.com</p>
                    <p>Admin-Clinica</p>
                  </div>
                </div>
              </CardBasic>
            </div>

            <div className="col-lg-8 col-md-8 col-sm-8">
              <CardBasic>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12"></div>
                </div>
              </CardBasic>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowUser;
