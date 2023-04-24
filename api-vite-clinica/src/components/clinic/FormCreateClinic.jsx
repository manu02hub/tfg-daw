import React from "react";
import InputLabel from "../../components/InputLabel";
import InputText from "../../components/InputText";
import InputError from "../../components/InputError";

function FormCreateClinic() {
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
        <InputLabel>Direction</InputLabel>
        <InputText
          type="text"
          name="direction"
          defaultValue="Calle CajaMagica"
        ></InputText>
      </div>

      <div className="separadorForm">
        <InputLabel>City</InputLabel>
        <InputText type="text" name="city" defaultValue="Madrid"></InputText>
      </div>

      <div className="separadorForm">
        <InputLabel>Codigo Postal</InputLabel>
        <InputText type="text" name="c_postal" defaultValue="28041"></InputText>
      </div>

      <div className="separadorBtn btnCreate">
        <input type="submit" className="btnsColor" value={"Add Clinic"}></input>
        <input type="reset" className="btnReset" value={"Reset"}></input>
      </div>
    </form>
  );
}

export default FormCreateClinic;
