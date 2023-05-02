import React from "react";

function BtnsTable({ children, className = "", onClick}) {
  return <button type="button" className={`btnsAction ` + className} onClick={onClick}>{children}</button>;
}

export default BtnsTable;
