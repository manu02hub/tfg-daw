import React from "react";

function BtnPrimary({ className = "", disabled, children, ...props }) {
  return (
    <button {...props} className={"btnsColor"} disabled={disabled}>
      {children}
    </button>
  );
}

export default BtnPrimary;
