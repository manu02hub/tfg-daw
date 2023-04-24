import React from "react";

function BtnsTable({ children, className = "" }) {
  return <button className={`btnsAction ` + className}>{children}</button>;
}

export default BtnsTable;
