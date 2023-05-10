import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../helpers/Validate";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import Modal from "../Modal";
import BtnPrimary from "../BtnPrimary";
import BtnCancel from "../BtnCancel";
import SelectTherapy from "../therapie/SelectTherapy";
import SelectUserClinic from "../user/SelectUserClinic";

function ModalTooth({ confirm, setConfirm, clinic, patient, teeth }) {
  const [newTeeth, setTeeth] = useState(teeth);

  useEffect(() => {
    setTeeth(teeth);
  }, [teeth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addTherapy = async (data) => {
    let usuarios = data;
    console.log(data);

    // const { datos, cargando } = await PeticionAJAX(
    //   Global.url + "user/delete-user/" + user._id,
    //   "POST",
    //   usuarios
    // );

    // if (datos.state == "success" && !cargando) {
    //   // usuarios = users.filter((u) => u._id !== user._id);
    //   closeModal();
    //   setUsers(usuarios);
    // } else {
    //   setError(datos.message);
    // }
  };

  const closeModal = () => {
    setConfirm(false);
  };

  return (
    <>
      {confirm && (
        <Modal show={confirm}>
          <div className="section-modal">
            <h2>Añadir Tratamiento</h2>
            <br />

            <form className="formCreate" onSubmit={handleSubmit(addTherapy)}>
              <InputLabel>Pieza</InputLabel>

              {newTeeth && (
                <select {...register("id_teeth")} defaultValue={newTeeth._id}>
                  <option defaultValue={newTeeth._id}>
                    {newTeeth.number}
                    {newTeeth.letter}
                  </option>
                </select>
              )}

              <div className="separadorForm">
                <InputLabel>Terapia</InputLabel>
                <SelectTherapy {...register("id_therapy")} />
              </div>

              <div className="separadorForm">
                <InputLabel>Clinico</InputLabel>
                <SelectUserClinic clinic={clinic} {...register("id_user")} />
              </div>

              <InputText
                type="hidden"
                name="id"
                defaultValue={patient}
                {...register("id_pacient")}
              ></InputText>

              <div className="btnModalAdd">
                <BtnPrimary className="shadow">SAVE</BtnPrimary>
                <BtnCancel type="button" onClick={() => closeModal()}>
                  Cancel
                </BtnCancel>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ModalTooth;
