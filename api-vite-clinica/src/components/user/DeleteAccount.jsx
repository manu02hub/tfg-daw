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
        <h2>Delete Account</h2>
        <p>
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Before deleting your account, please download any
          data or information that you wish to retain.
        </p>
        <div className="separadorBtn">
          <button onClick={() => confirmUserDeletion()} className="btnDelete">
            Delete Account
          </button>
        </div>
      </section>
     <ModalUserDelete confirm={confirmingUserDeletion} setConfirm={setConfirmingUserDeletion} user={user} auth={auth}/>
    </>
  );
}

export default DeleteAccount;
