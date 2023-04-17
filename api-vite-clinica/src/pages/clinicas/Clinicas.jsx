import React, { useState } from "react";
import { useFormik } from "formik";
import { object, string, number, date } from "yup";

function Clinicas() {
  const validationSchema = object().shape({
    password: string()
      .min(2, "El nombre es muy corto")
      .max(40)
      .required("Campo obligatorio"),
    correo: string("Email invalido")
      .email("Email Invalido")
      .required("Campo obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      correo: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="section-information">
          <h3>Clinicas</h3>
          {/* <div className="login">
        <div className="containerLogin">
          <div className="imagenLogo">
            <img src={ToothSensation} className="logo" />
          </div> */}
          {/* <h3>¡¡Bienvenido de nuevo!!</h3> */}
          {/* <div className="contenedorForm">
            <form onSubmit={formik.handleSubmit}>
              <input
                type="email"
                placeholder="Correo Electronico"
                name="correo"
                value={formik.values.correo}
                onChange={formik.handleChange}
              ></input>
              <p className="error">
                {formik.errors.correo && formik.touched.correo
                  ? formik.errors.correo
                  : ""}
              </p>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              ></input>
              <p className="error">
                {formik.errors.password && formik.touched.password
                  ? formik.errors.password
                  : ""}
              </p>
              <div className="contenedorLink"> */}
          {/* <Link>Forgot your password?</Link> */}
          {/* </div>
              <input type="submit" value={"Añadir Clinica"}></input>
            </form>
          </div>
        </div>
      </div> */}
        </div>
      </div>
    </div>
  );
}

export default Clinicas;
