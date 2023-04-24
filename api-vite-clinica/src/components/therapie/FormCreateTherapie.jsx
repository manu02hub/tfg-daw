import React from "react";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";

function FormCreateTherapie() {
  return (
    <form className="formCreate">
      <div className="separadorForm">
        <InputLabel>Name</InputLabel>
        <InputText
          type="text"
          name="name"
          defaultValue="Tooth Sensation"
        ></InputText>
      </div>

      <div className="separadorForm">
        <InputLabel>Precio</InputLabel>
        <InputText type="number" name="precio" defaultValue={50}></InputText>
      </div>

      <div className="separadorForm">
        <InputLabel>Descuento</InputLabel>
        <InputText type="number" name="descuento" defaultValue={0}></InputText>
      </div>

      <div className="separadorBtn btnCreate">
        <input
          type="submit"
          className="btnsColor"
          value={"Add Therapie"}
        ></input>
        <input type="reset" className="btnReset" value={"Reset"}></input>
      </div>
    </form>
  );
}

export default FormCreateTherapie;
