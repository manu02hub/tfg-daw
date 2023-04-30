import React from "react";
import { Fragment } from "react";

function Modal({
  children,
  show = false,
  closeable = true,
  onClose = () => {},
}) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };

  return (
    <>
      {show && (
        <div  onClick={close}>
          <div id="modal" className="divModal">
            <div className="fondoModal">
              <div className={"modal shadow"}>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
