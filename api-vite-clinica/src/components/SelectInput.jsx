import React, { useRef, forwardRef } from "react";

function SelectInput({ name, children, ...props }, ref) {
  const input = ref ? ref : useRef();
  return <select name={name} {...props} ref={input}>{children}</select>;
}

export default forwardRef(SelectInput);
