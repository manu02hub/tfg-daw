import React from "react";

function InputError({ message, className = '', ...props }) {
  return (
    <span {...props} className={"errorForm" + className}>
      {message}
    </span>
  );
}

export default InputError;
