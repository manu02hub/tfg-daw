import React from 'react'

function BtnReset({ className = "", children , ...props }) {
  return (
    <button type="reset" {...props} className={"btnReset"} >
      {children}
    </button>
  )
}

export default BtnReset