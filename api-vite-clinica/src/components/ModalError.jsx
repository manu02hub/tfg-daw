import React from "react";
import BtnCancel from "./BtnCancel";
import { Fragment } from "react";

function ModalError({ message, show = false, closeable = true, setConfirm }) {
  const close = () => {
    if (closeable) {
      setConfirm(false);
    }
  };

  return (
    <>
      {show && (
        <div onClick={close}>
          <div id="modal" className="divModal">
            <div className="fondoModal">
              <div className={"modal shadow"}>
                <div className="section-modal">
                  <h2>Error</h2>
                  <div className="unlock">
                    <span>{message}</span>
                    <div className="unlockBtns">
                      <button
                        type="button"
                        className="btnCancel btnNoUnlock shadow"
                        onClick={() => close()}
                      >
                        cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalError;
