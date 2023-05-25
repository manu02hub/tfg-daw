import React, { useState } from "react";
import ModalUserDelete from "./ModalUserDelete";

function DeleteAccount({user, auth}) {

  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };


  return (
    <>
      <section className="section-card">
        <h2>Eliminar cuenta</h2>
        <p>
        Una vez que se elimine su cuenta, todos sus recursos y datos serán
          Eliminado permanentemente. Antes de eliminar su cuenta, descargue cualquier
          datos o información que desea conservar.
        </p>
        <div className="separadorBtn">
          <button onClick={() => confirmUserDeletion()} className="btnDelete">
            Eliminar cuenta
          </button>
        </div>
      </section>
     <ModalUserDelete confirm={confirmingUserDeletion} setConfirm={setConfirmingUserDeletion} user={user} auth={auth}/>
    </>
  );
}

export default DeleteAccount;
