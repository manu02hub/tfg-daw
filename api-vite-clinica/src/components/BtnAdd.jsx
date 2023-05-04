import React from "react";
import { Link } from "react-router-dom";

function BtnAdd({ children, to, add }) {
  return (
    <Link to={to} className="btnAdd">
      {children}
      <span>{add}</span>
    </Link>
  );
}

export default BtnAdd;
