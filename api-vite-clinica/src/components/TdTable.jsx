import React from "react";

function TdTable({ children, className, select }) {
  return (
    <td className={select ? "tdActive" : ""}>
      <div className={"boxTbody " + className}>{children}</div>
    </td>
  );
}

export default TdTable;
