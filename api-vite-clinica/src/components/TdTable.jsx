import React from "react";

function TdTable({children}) {
  return (
    <td>
      <div className="boxTbody">{children}</div>
    </td>
  );
}

export default TdTable;
