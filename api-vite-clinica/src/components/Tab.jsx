import React from "react";

function Tab({ isActive, val,  text, onClick }) {

  return (
    <button
      className={isActive === val ? "active" : "noActive"}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Tab;
