import React from "react";

function TdTable({ children, className }) {
  return (
    <td>
      <div className={"boxTbody " + className}>{children}</div>
    </td>
  );
}

export default TdTable;
