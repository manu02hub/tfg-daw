import React from "react";

function BtnCancel({ className = "", children, onClick, ...props }) {
  return (
    <button {...props} className={"btnCancel shadow"} onClick={onClick}>
      {children}
    </button>
  );
}

export default BtnCancel;
