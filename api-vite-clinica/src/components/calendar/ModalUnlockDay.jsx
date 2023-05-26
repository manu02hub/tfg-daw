import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import Modal from "../Modal";

function ModalUnlockDay({
  confirmModalUnlock,
  setConfirmModalUnlock,
  event,
  events,
  setEvents,
  blockedDays,
  setBlockedDays,
}) {

  const closeModal = () => {
    setConfirmModalUnlock(false);
  };

  const unlock = async () => {

    let auxBlock;
    let auxEvent;

    const { datos, cargando } = await PeticionAJAX(
      Global.url + "dayBlocked/delete-dayBlocked/" +  event.id,
      "DELETE"
    );

    if (datos.state == "success" && !cargando) {
      auxBlock = blockedDays.filter((day) => day._id !==  event.id);
      console.log(auxBlock);
      console.log(events);
      auxEvent = events.filter((e) => e.id !==  event.id);
      console.log(auxEvent);

      setBlockedDays(auxBlock);
      setEvents(auxEvent);
      closeModal();
    }
  };

  return (
    <>
      {confirmModalUnlock && (
        <Modal show={confirm}>
          <div className="section-modal">
            <h2>Desbloquear Día</h2>
            <div className="unlock">
              <span>¿Quiéres desbloquear el día para poder crear citas?</span>
              <div className="unlockBtns">
                <button
                  type="button"
                  className="btnUnlock shadow"
                  onClick={() => unlock()}
                >
                  desbloquear
                </button>
                <button
                  type="button"
                  className="btnCancel btnNoUnlock shadow"
                  onClick={() => closeModal()}
                >
                  cancelar
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ModalUnlockDay;
