import React from "react";
import TutorData from "./TutorData";

function ListTutorData({ tutors }) {
  return (
    <>
      <div className="row">
       
          {tutors.map((tutor) => {
            return <TutorData key={tutor} idTutor={tutor} />;
          })}
       
      </div>
    </>
  );
}

export default ListTutorData;
