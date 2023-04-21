import React from "react";

function CardBasic({ children, className = '' }) {
  return <div className={`cardComponent shadow ` + className}>{children}</div>;
}

export default CardBasic;
