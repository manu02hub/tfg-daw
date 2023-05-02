import React from "react";
import { forwardRef, useEffect, useRef } from 'react';

function InputText(
  { type = "text", className = "", placerholder,  isFocused = false, ...props },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <input
      {...props}
      type={type}
      placeholder={placerholder}
      className={"formEdit " + className}
      ref={input}
    />
  );
}

export default forwardRef(InputText);
