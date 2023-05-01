import React from 'react';

function BtnDelete({ className = "", children, ...props }) {
    return (
        <button {...props} className={"btnDelete shadow"}>
          {children}
        </button>
      );
}

export default BtnDelete