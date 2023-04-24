import React from "react";

function Table({ children }) {
  return (
    <div className="sectionTable">
      <table>{children}</table>
    </div>
  );
}

export default Table;
