import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

export const schema = yup
  .object().shape({
    name: yup
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(30, "Máximo 30 caracteres")
      .required("El campo nombre es requerido"),
    email: yup
      .string()
      .email("Debe tener un formato de correo")
      .required("El campo email es requerido"),
    password: yup
      .string()
      .min(8, "Debe contener mínimo 8 caracteres")
      .minUppercase(1, "Debe contener una mayuscula")
      .minNumbers(1, "Debe contener mínimo un número"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
  })
  .required();
