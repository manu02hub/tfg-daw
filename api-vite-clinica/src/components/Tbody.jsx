import React from "react";

function Tbody({children, className}) {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  );
}

export default Tbody;
