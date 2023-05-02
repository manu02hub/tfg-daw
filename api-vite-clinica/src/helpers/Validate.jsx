import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

export const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .trim()
      .min(3, "Campo requerido, al menos 3 caracteres")
      .max(30, "Máximo 30 caracteres"),
    email: yup
      .string()
      .lowercase()
      .trim()
      .min(1, "El campo es requerido")
      .email("Debe tener un formato de correo"),
    password: yup
      .string()
      .trim()
      .min(8, "Debe contener mínimo 8 caracteres")
      .minUppercase(1, "Debe contener una mayuscula")
      .minNumbers(1, "Debe contener mínimo un número"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
    current: yup.string().min(8, "Debe contener mínimo 8 caracteres"),
    direction: yup
      .string()
      .trim()
      .min(10, "Campo requerido, debe contener mínimo 10 caracteres")
      .max(30, "Máximo 30 caracteres"),
    city: yup
      .string()
      .trim()
      .min(5, "Campo requerido, debe contener mínimo 5 caracteres")
      .max(30, "Máximo 30 caracteres"),
    c_postal: yup
      .string()
      .trim()
      .min(5, "Máximo 5 carácteres")
      .max(5, "Máximo 5 carácteres"),
    price: yup
      .number()
      .typeError("Campo Requerido")
      .min(0, "El precio debe ser positivo"),
    discount: yup
      .number()
      .typeError("Campo Requerido")
      .min(0, "El descuento debe estar entre 0 y 100")
      .max(100, "El descuento debe estar entre 0 y 100"),
  })
  .required();
