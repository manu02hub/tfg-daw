import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

function InputText(
  { type = "text", className = "", isFocused = false, ...props }
) {
  // const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <input
      {...props}
      type={type}
      className={"formEdit " + className}
      // ref={input}
    />
  );
}

export default InputText;
