import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

export const schema = yup
  .object()
  .shape({
    name: yup
      .string().trim()
      .min(3, "Campo requerido, al menos 3 caracteres")
      .max(30, "Máximo 30 caracteres"),
    email: yup
      .string().lowercase().trim()
      .min(1,"El campo es requerido")
      .email("Debe tener un formato de correo"),
    password: yup
      .string().trim()
      .min(8, "Debe contener mínimo 8 caracteres")
      .minUppercase(1, "Debe contener una mayuscula")
      .minNumbers(1, "Debe contener mínimo un número"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
    current: yup.string().min(8, "Debe contener mínimo 8 caracteres"),
  })
  .required();
