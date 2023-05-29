import React from "react";
import CardBasic from "../../components/CardBasic";
import { BiCheck } from "react-icons/bi";

function Timeline() {
  return (
    <>
      <div className="row">
        <div className="col-sm-8 col-md-8 col-lg-8">
          <div className="timeline">
            <div className="container right">
              <CardBasic>
                <div className="infoTimeline">
                  <span>30 de Mayo de 2023</span>
                  <div className="therapiesDate">
                    <p>
                      <span className="therapyName"> Tratamiento: </span>{" "}
                      Empaste, <span> Pieza: </span> 18a
                    </p>
                    <p>
                      <span> Enfermero: </span> Sergio Hervás Aragón
                    </p>
                  </div>
                  <div className="therapiesDate">
                    <p>
                      <span className="therapyName"> Tratamiento: </span>{" "}
                      Empaste, <span> Pieza: </span> 18a
                    </p>
                    <p>
                      <span> Enfermero: </span> Sergio Hervás Aragón
                    </p>
                  </div>
                </div>
              </CardBasic>
            </div>
            <div className="container right">
              <CardBasic>
                <div className="infoTimeline">
                  <span>30 de Mayo de 2023</span>
                  <div className="therapiesDate">
                    <p>
                      <span className="therapyName"> Tratamiento: </span>{" "}
                      Empaste, <span> Pieza: </span> 18a
                    </p>
                    <p>
                      <span> Enfermero: </span> Sergio Hervás Aragón
                    </p>
                  </div>
                </div>
              </CardBasic>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Timeline;
