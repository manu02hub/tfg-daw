import React from "react";

function InputError({ message, className = "", ...props }) {
  return message ? (
    <span {...props} className={"errorForm " + className}>
      {message}
    </span>
  ) : null;
}

export default InputError;
