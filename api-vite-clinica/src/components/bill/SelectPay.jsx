import React, { forwardRef, useRef } from "react";

function SelectPay({className, ...props }, ref) {

  const input = ref ? ref : useRef();

  return (
    <select {...props} ref={input} className={className}>
      <option className="optionGreen" value={true}>Pagado</option>
      <option className="optionRed" value={false}>No pagado</option>
    </select>
  );
}

export default forwardRef(SelectPay);
