import React from "react";
import BarLoader from "react-spinners/BarLoader";

function Spinner() {
  return (
    <div className="boxSpinner">
      <BarLoader color="#0277b5" size={15} width={"100%"} />
    </div>
  );
}

export default Spinner;
