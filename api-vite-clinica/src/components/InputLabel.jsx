import React from "react";

function InputLabel({ value, className = "", children, ...props }) {
  return (
    <label {...props} className={`formEdit ` + className}>
      {value ? value : children}
    </label>
  );
}

export default InputLabel;
